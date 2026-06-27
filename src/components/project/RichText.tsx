// Renders plain text where lines beginning with "- " become bullet list items
// and separate lines become distinct paragraphs. Shareable across project pages.

type Block = { type: "p" | "ul"; items: string[] };

export default function RichText({ text }: { text: string }) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const blocks: Block[] = [];
  for (const line of lines) {
    if (line.startsWith("- ")) {
      const last = blocks[blocks.length - 1];
      if (last && last.type === "ul") last.items.push(line.slice(2));
      else blocks.push({ type: "ul", items: [line.slice(2)] });
    } else {
      blocks.push({ type: "p", items: [line] });
    }
  }

  // Content is author-controlled (page constants), so inline HTML such as
  // <b>, <i>, <a> is rendered as-is.
  return (
    <>
      {blocks.map((block, i) =>
        block.type === "ul" ? (
          <ul key={i} className="project-section__list">
            {block.items.map((item, j) => (
              <li key={j} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        ) : (
          <p key={i} dangerouslySetInnerHTML={{ __html: block.items[0] }} />
        )
      )}
    </>
  );
}
