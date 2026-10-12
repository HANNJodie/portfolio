# Guide du projet — Portfolio Jodie HANN

Ce document est la référence pour toute personne (humaine ou IA) qui travaille sur ce dépôt.
Il décrit **comment le site est construit** et **les règles à respecter** pour que chaque
ajout ressemble au reste : UI, UX, CSS, animations, contenu, i18n, images, SEO, workflow.

> Règle d'or : **avant d'écrire quoi que ce soit, chercher si ça existe déjà** (composant,
> classe, variante CSS, mixin, token, keyframe). Le site est cohérent parce que tout réutilise
> les mêmes briques. On n'invente une nouvelle brique que si aucune existante ne convient.

---

## 1. Stack et commandes

| Élément | Choix |
|---|---|
| Framework | **Next.js 16** (App Router), React 19, TypeScript strict |
| Styles | **SCSS** (`sass`), méthodologie **BEM**, aucun framework CSS (pas de Tailwind) |
| i18n | **next-intl** — `fr` (par défaut, sans préfixe) et `en` (préfixe `/en`) |
| Animations | **GSAP + ScrollTrigger** (`@gsap/react`) pour le scroll, **framer-motion** pour les entrées / UI interactive |
| Lightbox | **react-photo-view** (clic sur une image = plein écran) |
| Analytics | `@vercel/analytics` (page d'accueil) |
| Hébergement | Vercel — domaine `https://jodiehann.com` (`NEXT_PUBLIC_SITE_URL`) |
| Polices | **Clash Display** (titres, locale `public/fonts`) + **Inter** (texte, Google via `next/font`) |

```bash
npm run dev     # serveur de dev sur http://localhost:3000
npm run build   # build de production (à lancer avant de pousser un gros changement)
npm run lint    # ESLint (config next core-web-vitals + typescript)
npx tsc --noEmit  # vérification des types
```

Alias d'import : `@/*` → `src/*`. Toujours importer via `@/…`, jamais en relatif remontant (`../../`).

**Ne pas ajouter de dépendance** sans vraie nécessité : tout ce dont le site a besoin est déjà
installé (animations, lightbox, i18n). Une icône = un SVG inline dans `Icons.tsx`, pas une lib.

---

## 2. Arborescence

```
src/
  app/
    globals.scss                 ← point d'entrée unique des styles (liste des @use)
    sitemap.ts / robots.ts       ← SEO
    [locale]/
      layout.tsx                 ← <html>, polices, metadata globales, NextIntlProvider
      page.tsx                   ← accueil (Hero + ProjectGrid)
      a-propos/page.tsx          ← page À propos
      not-found.tsx              ← 404
      projets/<slug>/page.tsx    ← UNE page par projet, écrite à la main
  components/
    layout/   Header, Footer, (PageTransition — non utilisé)
    home/     Hero (bento d'accueil), ProjectGrid, ProjectCard
    about/    AboutContent, Recommendation
    project/  toutes les briques des pages projet (voir §6)
    ui/       ScrollReveal, Icons, LangSwitcher, SectionTitle, (Button, GradientText — peu/pas utilisés)
  data/projects.ts               ← liste ordonnée des projets (source de vérité de l'ordre)
  i18n/
    routing.ts                   ← locales + Link / useRouter localisés
    request.ts
    messages/fr.json, en.json    ← textes partagés (UI), PAS le contenu des projets
  styles/
    _variables.scss              ← design tokens (couleurs, espaces, rayons, ombres…)
    _mixins.scss                 ← responsive, container, glass, gradient-text…
    _animations.scss             ← tous les @keyframes
    _typography.scss, _reset.scss, _fonts.scss
    components/_*.scss           ← un fichier par zone (header, hero, project-page…)
  types/project.ts               ← type Project
public/
  images/<NOM DU PROJET EN MAJUSCULES>/…   ← médias d'un projet
  images/ME/…                    ← photos de Jodie
  fonts/                         ← Clash Display
```

---

## 3. Design system (tokens)

Tous les tokens sont dans `src/styles/_variables.scss`. **Ne jamais écrire une couleur, un
espacement, un rayon ou une ombre en dur** si un token existe. Chaque fichier SCSS commence par :

```scss
@use "../variables" as *;
@use "../mixins" as *;
```

### 3.1 Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `$color-bg` | `#FAFAFA` | fond de page |
| `$color-bg-alt` | `#F5F3FF` | fond légèrement violet (blocs téléchargement, placeholders) |
| `$color-bg-white` / `$color-surface` | `#FFFFFF` | cartes |
| `$color-text` | `#1A1A2E` | texte courant |
| `$color-text-heading` | `#0D0D0D` | titres, valeurs importantes |
| `$color-text-muted` | `#6B7280` | texte secondaire |
| `$color-text-light` | `#9CA3AF` | légendes, labels discrets, flèches |
| `$color-border` | `rgba(0,0,0,.06)` | bordures par défaut |
| `$color-border-hover` | violet 20 % | bordures au survol |

**Accents (palette « aurora »)** : `$color-violet #7C3AED` (accent principal), `$color-pink #EC4899`,
`$color-amber #F59E0B`, `$color-cyan #06B6D4`, `$color-green #22c55e` (uniquement « disponible »).

**Dégradés** : `$gradient-aurora` (violet → rose → ambre → cyan, le dégradé signature),
`$gradient-aurora-reverse`, `$gradient-subtle`, `$gradient-warm`, `$gradient-cool`.

Règles :
- Le **violet** est la couleur d'interaction : labels de section, puces, liens, hover, focus.
- Le **dégradé aurora** est réservé aux éléments « signature » : nom dans le hero, bouton CTA
  final, icône des link cards, soulignement du menu, guillemet de la recommandation, 404.
  Il est **toujours animé** (`background-size: 200% 200%` + `animation: gradient-shift 4–5s ease infinite`).
- Transparences : `rgba($color-violet, 0.1)` etc., pas de nouvelles couleurs hexadécimales.
- Seule couleur de marque externe tolérée : bleu LinkedIn `#0A66C2` (badge recommandation).

### 3.2 Couleurs de statut de projet

Le statut (`ProjectStatus`) pilote une couleur partout (pastille de l'info strip, badge de carte) :

| Statut | Couleur | Libellé FR / EN |
|---|---|---|
| `released` | cyan | Terminé / Finished |
| `in-development` | violet | En développement / In development |
| `hiatus` | ambre | En pause / On hiatus |
| `upcoming` | rose | À venir / Upcoming |

Le texte affiché dans l'info strip peut être surchargé via `statusLabel` (ex. « Documentation »,
« En pause (Prototype) ») sans changer la couleur.

### 3.3 Espacements

`$space-xs .25rem` · `$space-sm .5rem` · `$space-md 1rem` · `$space-lg 1.5rem` · `$space-xl 2rem` ·
`$space-2xl 3rem` · `$space-3xl 4rem` · `$space-4xl 6rem` · `$space-5xl 8rem`.

Repères utilisés dans les pages projet :
- entre deux sections : `$space-2xl` (padding-top de `.project-section`) ;
- label de section → contenu : `$space-lg` ;
- paragraphe → paragraphe : `$space-md` ;
- liste à puces : `$space-md` au-dessus **et** en dessous (une liste ne doit jamais être collée
  au paragraphe qui suit) ; entre deux puces : `$space-sm` ;
- bloc d'images après du texte : `$space-2xl` ;
- gap des grilles d'images : `$space-md`.

> **Règle UX importante (retour de Jodie)** : rien ne doit être « collé ». Chaque bloc
> visuellement distinct (texte, carte, recommandation, liens, navigation) doit avoir de l'air
> au-dessus et en dessous — en pratique au moins `$space-2xl`/`$space-3xl` (3–4rem) entre deux
> gros blocs. Quand on termine une page par un bloc sans marge propre, vérifier l'espace avant
> la barre de navigation précédent/suivant.

### 3.4 Typographie

- `$font-display` = Clash Display (`var(--font-clash)`) → titres, labels, boutons, valeurs, nav.
- `$font-body` = Inter (`var(--font-inter)`) → tout le texte courant.
- Tailles : `$font-size-xs .75rem` → `$font-size-6xl 4.5rem`, plus `$font-size-hero clamp(3rem, 8vw, 7rem)`.
- `h1` = taille hero, `line-height: 1`, `letter-spacing: -0.02em`. `h2` = `clamp(1.75rem, 4vw, 2.5rem)`.
- `p` : `line-height 1.75`, `1rem` sur mobile, `1.125rem` à partir de la tablette.
- **Style « label / eyebrow »** (motif récurrent) : Clash Display, `0.75rem` (ou 11px),
  `font-weight: 700`, `text-transform: uppercase`, `letter-spacing: 0.2em`, couleur violette
  (labels de section) ou `$color-text-light` (labels secondaires).
- Les titres de projets sont **toujours en MAJUSCULES** (`title: "MY MORNING ROUTINE"`).
- Le texte des sections de projet est **justifié** (`text-align: justify`).
- Sélection de texte : fond violet 20 %.

### 3.5 Rayons, ombres, z-index

- Rayons : `$radius-sm .375rem`, `md .75rem`, `lg 1rem` (images), `xl 1.5rem` (cartes, vidéos,
  carrousel), `2xl 2rem`, `full` (pills/boutons). Bento accueil / À propos / recommandation :
  `20px` mobile, `24px` desktop.
- Ombres : `$shadow-sm` → `$shadow-xl` + `$shadow-glow`. Images : `$shadow-lg`. Vidéo / carrousel :
  `$shadow-xl`. Link card : `$shadow-md` → `$shadow-lg` au survol.
- z-index : `$z-base 1`, `$z-header 100`, `$z-modal 200`, `$z-loader 300`, `$z-cursor 400`.

### 3.6 Transitions

- `$transition-fast 150ms`, `$transition-base 300ms`, `$transition-slow 500ms` (toutes en
  `cubic-bezier(0.4, 0, 0.2, 1)`), `$transition-spring 600ms` (rebond).
- Couleurs / bordures au hover → `fast`. Transform / ombre de carte → `base`. Zoom d'image dans
  une carte → `slow`.

---

## 4. CSS : règles d'écriture

1. **SCSS + BEM** : `.bloc`, `.bloc__element`, `.bloc--modificateur`, écrit avec l'imbrication
   `&__element` / `&--modif`. État : classe `is-active` / `is-visible` ou modificateur `--open`.
2. **Un fichier par zone** dans `src/styles/components/`, importé dans `src/app/globals.scss`.
   Pas de CSS modules, pas de styled-components. Ajouter un nouveau fichier = l'ajouter dans
   `globals.scss`.
3. **Mobile first** : styles de base pour mobile, puis `@include respond-to(tablet|desktop|wide)`
   (`min-width` 768 / 1024 / 1440 ; `mobile` = 480). `@include mobile-only` pour du `max-width: 767px`.
   Ne jamais écrire de `@media` à la main.
4. **Mixins à réutiliser** : `container`, `flex-center`, `flex-between`, `flex-column`,
   `gradient-text`, `glass`, `hover-lift`, `section-padding`, `truncate($lines)`, `focus-ring`,
   `button-base`. Dans `_project-page.scss` : `project-col` (colonne de 920px centrée).
5. **Variantes plutôt que styles inline** : pour un nouveau rendu d'un composant existant,
   ajouter un modificateur (`.project-images--xxx`) avec un commentaire d'une ligne qui dit à
   quoi il sert, puis le passer via `className`. Les styles inline (`style={{…}}`) sont tolérés
   uniquement pour un **ajustement ponctuel d'espacement** (`paddingTop: 0`, `margin: "4rem 0"`).
6. Commentaires de section dans les SCSS au format `// ─── Titre ───────`. Commentaires en
   anglais dans le code (convention existante), contenu affiché en français/anglais.
7. Modifier un style partagé (ex. `.project-section__list`) **impacte toutes les pages projet** :
   c'est voulu quand c'est une correction de cohérence, mais il faut vérifier les autres pages.
8. Ne pas toucher au `_reset.scss` : `ul/ol` sans puces, `a` sans soulignement, `img` en `block`.
   Les puces violettes sont dessinées en `::before` (cercle 6px).

---

## 5. Animations et mouvement

### 5.1 Principes

- Mouvement **doux, court, vers le haut** : on apparaît en montant (opacité 0 → 1, `y` 20–40px → 0).
- Easing : GSAP `power3.out` ; framer-motion `[0.22, 1, 0.36, 1]` (constante `EASE`) ;
  transitions CSS via les tokens.
- Durées : 0.5–0.8 s pour les entrées, 150–300 ms pour les hovers.
- On joue l'animation **une seule fois** (`toggleActions: "play none none none"`,
  `viewport={{ once: true }}`), jamais en boucle au scroll.
- Les éléments animés à l'entrée sont rendus avec `style={{ opacity: 0 }}` pour éviter le flash
  avant l'hydratation.

### 5.2 Qui fait quoi

| Besoin | Outil | Où |
|---|---|---|
| Apparition au scroll d'un bloc | `<ScrollReveal>` (GSAP, start `top 85%`, y 40, 0.8 s) | sections, images, carrousels, cartes |
| Hero de projet | GSAP timeline : tagline → titre → date → indicateur « Défiler » + parallax de l'image (`y: 80`, scrub) | `ProjectHero` |
| Entrées du bento (accueil / À propos) | framer-motion `variants` `hidden`/`visible`, `BASE_DELAY = 0.35`, cartes du bas décalées de `0.12 s` | `Hero`, `AboutContent` |
| Menus (dropdown, menu mobile) | framer-motion `AnimatePresence` + spring (`stiffness 300–400`, `damping 20–25`) | `Header` |
| Titre de section accueil | GSAP stagger 0.15 s | `SectionTitle` |
| Recommandation | framer-motion `whileInView`, `once`, `amount: 0.25` | `Recommendation` |
| Boucles décoratives | `@keyframes` CSS de `_animations.scss` | voir ci-dessous |

Ne **pas** mélanger GSAP et framer-motion sur le même élément.
Tout composant qui anime est un Client Component (`"use client"`).

### 5.3 Keyframes disponibles (`_animations.scss`)

`gradient-shift` (dégradés animés) · `float` (indicateur « Défiler ») · `wave` · `pulse-glow`
(pastille « à venir ») · `spin-slow` · `fade-in` · `slide-up` · `slide-in-right` · `scale-in` ·
`blob-morph` (blobs de fond flous, 12–14 s) · `bubble-float` · `bubble-morph` · `hint-bounce` /
`hint-bounce-left` (flèches d'indication de scroll horizontal) · `status-ping` (onde autour de la
pastille de statut).

Ajouter un nouveau keyframe **uniquement** dans ce fichier.

### 5.4 Micro-interactions de référence

- Carte cliquable : `translateY(-3px/-4px)` + ombre plus forte + bordure violette légère.
- Image cliquable : `scale(1.01)` (grille), `scale(1.05)` de l'image dans une carte projet.
- Bouton gradient : `translateY(-2px) scale(1.02)`, `:active` `scale(0.98)`.
- Lien / pill : couleur + bordure passent au violet.
- Flèche d'un bouton : `translateX(4px)` au survol.

---

## 6. Pages projet

### 6.1 Principe

Chaque projet a **sa propre page écrite à la main** dans `src/app/[locale]/projets/<slug>/page.tsx`.
Il n'y a pas de template générique : on **compose** les briques de `src/components/project/`.
Le **contenu textuel** de la page vit dans un objet `COPY = { fr: {…}, en: {…} }` en haut du fichier
(pas dans les JSON i18n). `src/data/projects.ts` ne sert qu'aux cartes, au menu, à l'ordre et à la
navigation précédent/suivant.

### 6.2 Squelette type (à copier depuis une page existante : `cycles`, `luciole`, `sephira-03`, `my-morning-routine`)

```tsx
import { getLocale } from "next-intl/server";
// …imports des briques utilisées uniquement
import { getAdjacentProjects, getProjectBySlug } from "@/data/projects";

const SLUG = "mon-projet";
const HERO_IMAGE = "/images/MON PROJET/cover.webp";
const DEMO = "https://…";               // liens = constantes en MAJUSCULES
const GAMEPLAY_IMAGES = [{ src: "/images/MON PROJET/…", alt: "…" }];  // médias = constantes

const COPY = {
  fr: {
    tagline: "…", date: "Janvier – Mars 2023", status: "Terminé",
    devPeriod: "3 mois", teamLabel: "4 GD", roleLabel: "Game Lead",
    genres: ["…"],
    labels: { concept: "Concept", work: "Mon travail", gameplay: "Gameplay", story: "Histoire", team: "L'équipe" },
    cta: "Jouer", topCta: "Jouer au jeu", openLink: "Ouvrir le lien",
    concept: "…", work: "…", /* … */
  },
  en: { /* mêmes clés, traduites */ },
};

export default async function MonProjetPage() {
  const locale = (await getLocale()) as "fr" | "en";
  const c = COPY[locale];
  const { prev, next } = getAdjacentProjects(SLUG);
  const project = getProjectBySlug(SLUG);

  return (
    <ProjectShell>
      <ProjectHero title="MON PROJET" tagline={c.tagline} date={c.date} heroImage={HERO_IMAGE} />
      <ProjectInfoStrip status="released" statusLabel={c.status} devPeriod={c.devPeriod}
        teamLabel={c.teamLabel} roleLabel={c.roleLabel} engine="Unity" genres={c.genres} />

      <div className="project-sections">
        <ProjectSection label={c.labels.concept}>…</ProjectSection>
        {/* … autres sections … */}
      </div>

      <ProjectCTA ctaLabel={c.cta} ctaUrl={DEMO} socialLinks={project?.socialLinks} />
      <ProjectNav prev={prev} next={next} />
    </ProjectShell>
  );
}
```

### 6.3 Ordre et contenu des sections (convention)

1. **Hero** — image plein écran (60vh mobile / 90vh desktop), surtitre (tagline en capitales),
   titre en majuscules, date. `objectPosition` pour recadrer si besoin (`"left"`, `"center 20%"`).
2. **Info strip** — Statut · Durée de développement · Équipe · Rôle principal · Moteur · Genres.
   Toutes les colonnes sauf le statut sont optionnelles : ne pas passer une prop = colonne masquée
   (ex. pas de moteur pour un projet de documentation). Sur mobile la bande défile horizontalement
   avec des flèches d'indication.
3. **Concept** — texte à gauche + `ProjectLinkCard` à droite (jouer / devblog / document).
4. **Mon travail** — ce que Jodie a fait, souvent en listes à puces ; éventuellement
   `ProjectDownloadCTA` (GDD) ou extraits en images.
5. **Gameplay** — texte + vidéo / images.
6. **Histoire** — texte + images / carrousel de personnages.
7. **L'équipe** / sections spécifiques (Musique, Le mentorat…).
8. **ProjectCTA** — gros bouton gradient (« Jouer », « Démo », « Prototype ») + « Liens du projet ».
   S'il n'y a pas de jeu jouable, garder au moins les liens du projet : la page ne doit pas finir
   directement sur la navigation (sinon c'est « collé »).
9. **ProjectNav** — précédent / suivant (automatique selon l'ordre de `projects.ts`).

Libellés de sections FR / EN habituels : Concept / Concept · Mon travail / My work ·
Gameplay / Gameplay · Histoire / Story · L'équipe / The team · Musique / Music ·
Le mentorat / The mentorship · Extraits de présentation / Presentation excerpts.

Une page sans contenu encore prêt garde au minimum Hero + Nav et un `{/* TODO: contenu … */}`
(cf. `quest-for-life`).

### 6.4 Catalogue des briques (`src/components/project/`)

| Composant | Rôle | Notes |
|---|---|---|
| `ProjectShell` | Header + `<main className="project-page">` + Footer | toujours la racine |
| `ProjectHero` | bannière parallax animée | props `title, tagline, date, heroImage, objectPosition?` |
| `ProjectInfoStrip` | bande de métadonnées | `status` pilote la couleur, `statusLabel` le texte |
| `ProjectSection` | section avec label violet + `ScrollReveal` | contenu libre |
| `RichText` | texte → paragraphes + listes | voir §6.5 |
| `ProjectLinkCard` | petite carte lien (icône gradient + flèche) | à côté du texte dans `.project-section__concept` ; icône par défaut = lien externe, `GamepadIcon` pour un jeu |
| `ProjectDownloadCTA` | grande carte sombre « Télécharger le GDD » | même langage que la carte CV de l'À propos |
| `ProjectImages` | grille d'images avec lightbox | voir §7.2 pour les variantes |
| `ProjectMasonry` | mosaïque « Pinterest » sans recadrage | exige `width`/`height` réels de chaque image |
| `ProjectCarousel` | carrousel 1 image à la fois, flèches + points | `project-carousel--portrait` = 9:16 à côté d'un texte |
| `ProjectVideo` | YouTube 16:9 | prop `videoId` ; légende avec `<p className="project-caption">` |
| `ProjectCTA` | bouton final + téléchargements + liens | se masque tout seul s'il n'a rien à afficher |
| `ProjectNav` | précédent / suivant | `getAdjacentProjects(SLUG)` |
| `ProjectGallery` | ancienne galerie | **non utilisée**, préférer `ProjectImages` |

Mises en page utilitaires (classes) :
- `.project-section__concept` — grille texte + carte (1 colonne mobile, `1fr auto` tablette+).
- `.project-section__lead` — conteneur de texte (taille, interligne 1.7, justifié).
- `.project-split` — texte + image à côté (`1fr 250px`), `.project-split--portrait` (`1fr 170px`).
- `.project-subheading` — petit intertitre centré gris en capitales (« Extraits du GDD »).
- `.project-caption` — légende italique centrée sous un média.
- `.project-note` — phrase d'accroche centrée.

Composant partagé hors dossier projet : `Recommendation` (`src/components/about/`) — la carte
LinkedIn de Nicolaï Maldavsky, textes dans `about.recommendation` des JSON. Réutilisable telle
quelle dans une page projet (cf. `my-morning-routine`), en lui donnant de la marge
(`<div style={{ margin: "4rem 0" }}>`).

### 6.5 Règles du texte (`RichText`)

- Une ligne (`\n`) = un paragraphe. Une ligne qui commence par `- ` = une puce ; les puces
  consécutives forment une liste.
- Le HTML inline est autorisé : `<b>Nom PRÉNOM</b>` pour les noms de personnes, `<i>`, `<a>`.
- Pas de lignes vides nécessaires : l'espacement est géré par le CSS.
- Guillemets français `« … »` en FR, `“…”` en EN. Apostrophe droite `'` acceptée dans les chaînes.
- Tirets de plage de dates : demi-cadratin `–` avec espaces (`Novembre 2025 – Mai 2026`).

### 6.6 Contenu et ton

- Jodie fournit le texte en français, souvent avec des fautes de frappe : **corriger
  l'orthographe et la grammaire** sans changer le sens ni le ton, et **écrire la version anglaise**
  (naturelle, pas du mot à mot). Signaler les corrections notables.
- Première personne, au féminin (« j'ai été suivie », « je suis fière »).
- Les noms propres de l'équipe en `NOM` majuscule : `Jodie HANN`, `Enzo POLI`.
- Rôles : Game Designer, Level Designer, Narrative Designer, System Designer, Cheffe de projet /
  Game Lead.

---

## 7. Images et médias

### 7.1 Fichiers

- Un dossier par projet : `public/images/<NOM DU PROJET>/` (majuscules, espaces autorisés —
  ex. `MY MORNING ROUTINE`, `QUEST FOR LIFE`).
- **Les noms de fichiers sont sensibles à la casse en production** (Vercel = Linux) : `Diapositive2.JPG`
  ≠ `Diapositive2.jpg`. Le chemin dans le code doit être **exactement** le nom du fichier.
  En local sous Windows une faute de casse ne se voit pas — vérifier.
- Formats : `.webp` de préférence pour les photos/couvertures ; `.png`/`.jpg` acceptés ; `.gif`
  pour les animations. Compresser les gros PNG (plusieurs Mo) avant de les ajouter si possible.
- Couverture d'un projet : utilisée **à la fois** par `heroImage` dans `projects.ts` (cartes
  d'accueil, bento) **et** par `HERO_IMAGE` de la page. Garder les deux identiques.
- Les PDF / documents peuvent être servis depuis `public/` (ex. one pager) ou via une URL externe.
- Images distantes autorisées : `jodiehann.wordpress.com` et `placehold.co` (`next.config.ts`).
  Tout autre domaine doit y être ajouté.
- Toutes les images de `public/` sont servies avec `X-Robots-Tag: noindex` (voulu).

### 7.2 Affichage (`ProjectImages`)

- Toujours via `next/image` avec `fill` + `object-fit: cover` dans un cadre à ratio fixe, et
  `unoptimized` dans les composants projet (choix existant). Toujours un `alt`.
- Grille par défaut : `repeat(auto-fit, minmax(240px, 1fr))`, ratio 16:10 ; une image seule
  prend toute la largeur en 21:9.
- Variantes (combinables) :
  - `project-images--wide` → ratio 16:9 (captures, diapositives, une paire d'images).
  - `project-images--two-cols` → grille fixée à 2 colonnes (ex. 4 images en 2×2).
  - `project-images--portrait` → 3:4, 2 colonnes mobile / 4 tablette (extraits de GDD).
  - `project-images--aside` → une image portrait collée à côté d'un texte (avec `.project-split`).
  - `.concept-images` + `ProjectMasonry` → 2×2 sans recadrage (Luciole).
- Prop `credit` pour une ligne de crédit sous les images (lien violet).
- Prop `style={{ paddingTop: 0 }}` quand les images suivent directement le label de section.
- **Ne pas recadrer des images qui contiennent du texte** (diapositives, extraits de documents) :
  garder leur ratio natif (16:9 pour des slides) pour que rien ne soit coupé.
- Cliquer une image ouvre la lightbox (`PhotoProvider`/`PhotoView`) ; les images d'un même bloc
  sont navigables entre elles.

---

## 8. Données projets (`src/data/projects.ts`)

- **L'ordre du tableau = l'ordre partout** : grille de l'accueil, menu déroulant « Mes projets »,
  menu mobile, navigation précédent/suivant, et les 4 cartes du bento d'accueil
  (`projects.slice(0, 4)`, la 1ʳᵉ marquée « À la une »). Le 1ᵉʳ projet est aussi la grande carte
  pleine largeur de la grille. Ajouter un projet « en numéro 1 » = l'insérer en tête du tableau.
- Champs obligatoires : `slug`, `title`, `date {fr,en}`, `tagline {fr,en}`, `description {fr,en}`
  (extrait de la carte, tronqué à 3 lignes), `images` (souvent `[]`), `heroImage`, `status`.
- Le `slug` = nom du dossier de la page = segment d'URL (`/projets/<slug>`), en kebab-case.
- `upcomingProjects` (en bas du fichier) = badges « à venir » au-dessus de la grille. Retirer
  l'entrée quand le projet obtient sa vraie page.
- Les autres champs (`role`, `story`, `goal`, `team`, `ctaUrl`, `socialLinks`, `downloadables`…)
  sont historiques ; la page projet utilise surtout son propre `COPY`. `socialLinks` est en
  revanche lu par certaines pages pour `ProjectCTA`.

---

## 9. Internationalisation

- Locales : `fr` (défaut, URL sans préfixe : `/projets/cycles`) et `en` (`/en/projets/cycles`).
- **Tout texte visible doit exister en FR et en EN.**
- Textes d'interface partagés → `src/i18n/messages/fr.json` et `en.json` (mêmes clés dans les
  deux). Composants client : `useTranslations("namespace")`. Pages serveur : `getLocale()`.
- Contenu propre à une page projet → objet `COPY` dans la page (voir §6).
- Liens internes : **toujours** `Link` / `useRouter` / `usePathname` de `@/i18n/routing`
  (jamais `next/link` directement), pour conserver la langue.
- Liens externes : `<a href target="_blank" rel="noopener noreferrer">`.

---

## 10. SEO

- Metadata globales dans `src/app/[locale]/layout.tsx` (titre `%s | Jodie Hann`, Open Graph,
  `og-image.jpg`). L'accueil déclare `alternates` (canonical + hreflang).
- **Nouvelle page = l'ajouter à la liste `paths` de `src/app/sitemap.ts`** (chemin FR sans
  préfixe ; la version EN est générée automatiquement).
- `robots.ts` autorise tout le site.

---

## 11. Accessibilité et UX

- Boutons sans texte : `aria-label` (burger, flèches de carrousel, réseaux sociaux).
- Éléments décoratifs : `aria-hidden` (guillemet géant, halos, flèches d'indication).
- Focus visible : mixin `focus-ring` (contour violet 2px).
- Navigation par lien réel (`<a>`/`Link`) pour tout ce qui change de page.
- Le menu mobile bloque le scroll du `body` quand il est ouvert.
- Tout doit fonctionner de **375px** (mobile) à **1440px+** : tester les deux. Rien ne doit créer
  de scroll horizontal de page (les bandes défilantes internes utilisent `overflow-x: auto` +
  masques en dégradé + flèches d'indication).
- Le header est fixe (≈80px) : le contenu des pages commence avec `padding-top: 80px`.

---

## 12. Checklist — ajouter un nouveau projet

1. Créer `public/images/<NOM DU PROJET>/` et y mettre la couverture + les médias (noms exacts).
2. Ajouter l'entrée dans `src/data/projects.ts` à la bonne position (l'ordre compte).
3. Retirer l'éventuel badge correspondant de `upcomingProjects`.
4. Créer `src/app/[locale]/projets/<slug>/page.tsx` en copiant la page existante la plus proche.
5. Remplir `COPY.fr` (texte corrigé) et `COPY.en` (traduction).
6. Choisir les briques et variantes d'images existantes ; n'ajouter une variante CSS que si besoin.
7. Terminer par `ProjectCTA` (au moins les liens du projet) puis `ProjectNav`.
8. Ajouter `/projets/<slug>` dans `src/app/sitemap.ts`.
9. Vérifier : `npx tsc --noEmit`, page en FR **et** EN, mobile **et** desktop, console sans 404,
   espacements (rien de collé), accueil (bento + grille), menu « Mes projets ».

---

## 13. Pièges connus

- **Casse des fichiers** (voir §7.1) : marche en local Windows, 404 en production.
- `ProjectHero` cible `.project-page__hero img` : ne pas mettre d'autre `<img>` dans le hero.
- Les blocs animés démarrent à `opacity: 0` : si GSAP ne s'exécute pas (erreur JS), ils restent
  invisibles. Une section « vide » à l'écran = regarder la console.
- `Hero` (accueil) suppose **au moins 4 projets** dans `projects.ts`.
- `about__section` (utilisé par `Recommendation`) a un `max-width: 1400px` et `z-index: 1`.
- Composants / styles présents mais inutilisés : `PageTransition`, `ProjectGallery`,
  `GradientText`, `.loader`. Ne pas s'en servir comme modèle sans vérifier.
- Les pages projet n'ont pas de `generateMetadata` propre (titre global du site).

---

## 14. Workflow Git

- Branche principale : `main`. Messages de commit en **Conventional Commits**, en anglais,
  minuscules : `feat: add content to cycle project`, `fix: update project date …`,
  `refactor: …`.
- Ne pas commiter / pousser sans demande explicite de la personne qui travaille sur le projet.
- Avant de livrer : vérifier visuellement dans le navigateur (dev server `npm run dev`), pas
  seulement la compilation.
