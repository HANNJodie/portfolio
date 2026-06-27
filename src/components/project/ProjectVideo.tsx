interface ProjectVideoProps {
  videoId: string;
  title?: string;
}

// 16:9 YouTube embed in a rounded, shadowed frame.
export default function ProjectVideo({ videoId, title = "Gameplay" }: ProjectVideoProps) {
  return (
    <div className="project-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
