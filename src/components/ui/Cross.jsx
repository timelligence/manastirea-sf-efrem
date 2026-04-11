/**
 * Cruce latină simplă — SVG, linie subțire.
 * Crucea creștin-ortodoxă standard pentru BOR.
 * Folosit ca separator între secțiunile majore ale paginii.
 *
 * Props:
 *   size     — înălțimea în px (default 32)
 *   className — clase CSS adiționale
 */
export default function Cross({ size = 32, className = "" }) {
  const width = size * 0.6;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 40"
      width={width}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label="Cruce ortodoxă"
    >
      {/* Bară verticală */}
      <line x1="12" y1="2" x2="12" y2="38" />
      {/* Bară orizontală — braț unic la ~1/3 din vârf */}
      <line x1="4" y1="13" x2="20" y2="13" />
    </svg>
  );
}

/**
 * Separator decorativ cu cruce centrală — 
 * linie fină cu cruce orthodoxă mică la mijloc.
 * Înlocuiește <hr> pe tot site-ul.
 */
export function CrossSeparator({ className = "" }) {
  return (
    <div
      className={`flex items-center gap-4 my-10 ${className}`}
      role="separator"
      aria-hidden="true"
    >
      <div className="flex-1 h-px bg-border" />
      <Cross size={20} className="text-gold shrink-0" />
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
