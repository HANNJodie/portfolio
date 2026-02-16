import { Link } from "@/i18n/routing";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-clash)",
        gap: "1.5rem",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(4rem, 10vw, 8rem)",
          fontWeight: 800,
          background: "linear-gradient(135deg, #7C3AED, #EC4899, #F59E0B, #06B6D4)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "200% 200%",
          animation: "gradient-shift 4s ease infinite",
          lineHeight: 1,
        }}
      >
        404
      </h1>
      <p style={{ color: "#6B7280", fontSize: "1.25rem" }}>
        Cette page n&apos;existe pas.
      </p>
      <Link
        href="/"
        className="btn btn--primary btn--large"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
