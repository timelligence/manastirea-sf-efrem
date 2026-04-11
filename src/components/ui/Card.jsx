/**
 * Card de bază — suprafață caldă cu border subțire.
 *
 * Props:
 *   children   — conținut card
 *   className  — clase adiționale
 *   as         — element HTML (default "div")
 */
export default function Card({ children, className = "", as: Tag = "div" }) {
  return (
    <Tag
      className={`
        bg-secondary border border-border rounded-[4px]
        p-6 md:p-8
        transition-[border-color] duration-200 ease-out
        hover:border-border-hover
        ${className}
      `}
    >
      {children}
    </Tag>
  );
}
