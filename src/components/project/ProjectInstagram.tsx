import { InstagramIcon, OpenInNewIcon } from "@/components/ui/Icons";
import ProjectCarousel from "@/components/project/ProjectCarousel";

interface ProjectInstagramProps {
  url: string;
  account: string;
  meta: string;
  title: string;
  // Caption excerpt; inline HTML allowed (<i>, <b>).
  text: string;
  credit: string;
  linkLabel: string;
  images: { src: string; alt?: string }[];
}

// An Instagram post rebuilt in the site's style: our own carousel on the left,
// account + caption excerpt + link on the right. No third-party script.
export default function ProjectInstagram({
  url,
  account,
  meta,
  title,
  text,
  credit,
  linkLabel,
  images,
}: ProjectInstagramProps) {
  return (
    <article className="project-post">
      <div className="project-post__media">
        <ProjectCarousel className="project-carousel--post" images={images} />
      </div>

      <div className="project-post__body">
        <header className="project-post__head">
          <span className="project-post__avatar" aria-hidden>
            <InstagramIcon />
          </span>
          <span className="project-post__who">
            <span className="project-post__account">{account}</span>
            <span className="project-post__meta">{meta}</span>
          </span>
        </header>

        <p className="project-post__title">{title}</p>
        <p className="project-post__text" dangerouslySetInnerHTML={{ __html: text }} />
        <p className="project-post__credit">{credit}</p>

        <a href={url} target="_blank" rel="noopener noreferrer" className="project-post__link">
          <span>{linkLabel}</span>
          <OpenInNewIcon />
        </a>
      </div>
    </article>
  );
}
