import { useTranslations } from "next-intl";
import { LinkedInIcon, MailIcon } from "@/components/ui/Icons";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__thanks">{t("thanks")}</p>

        <div className="footer__socials">
          <a
            href="https://www.linkedin.com/in/jodie-hann-aba373220/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a
            href="mailto:jodieml.hann@gmail.com"
            className="footer__social-link"
            aria-label="Email"
          >
            <MailIcon />
          </a>
        </div>

        <div className="footer__contact-info">
          <a href="mailto:jodieml.hann@gmail.com">jodieml.hann@gmail.com</a>
          <span>06 59 83 30 37</span>
        </div>

        <div className="footer__bottom">
          <p className="footer__credit">
            &copy; {new Date().getFullYear()} Jodie Hann. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
