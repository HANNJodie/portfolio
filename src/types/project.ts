export type ProjectStatus = "released" | "in-development" | "hiatus" | "upcoming";

export interface ProjectSocialLink {
  platform: string;
  url: string;
}

export interface ProjectDownloadable {
  label: string;
  url: string;
  type?: string;
}

export interface LocalizedString {
  fr: string;
  en: string;
}

export interface Project {
  slug: string;
  title: string;
  date: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  role?: LocalizedString;
  story?: LocalizedString;
  goal?: LocalizedString;
  gameplay?: LocalizedString;
  team?: LocalizedString;
  images: string[];
  heroImage: string;
  ctaLabel?: LocalizedString;
  ctaUrl?: string;
  socialLinks?: ProjectSocialLink[];
  downloadables?: ProjectDownloadable[];
  status: ProjectStatus;
  featured?: boolean;
}
