/**
 * Bandou editorial „Provizoriu" — afișat pe paginile al căror
 * conținut nu a fost încă revizuit de obștea mănăstirii.
 *
 * Props:
 *   tip — "text" | "biografie" | "marturie"
 */
export default function DraftBanner({ tip = "text" }) {
  const mesaje = {
    text: "Acest text este o versiune provizorie, generată pe baza postărilor de pe pagina oficială de Facebook a mănăstirii. Așteaptă revizuirea și binecuvântarea obștii înainte de publicare oficială.",
    biografie: "Această biografie este o versiune provizorie, alcătuită din surse publice și postări oficiale ale mănăstirii. Așteaptă revizuirea obștii.",
    marturie: "Această mărturie este redată pe baza postărilor publice ale mănăstirii. Detaliile vor fi verificate și completate cu acordul obștii.",
  };

  return (
    <div className="my-8 p-5 border-l-4 border-[#A8842C] bg-[#F5F1E8] text-[#5C4A35] rounded-r-[4px]">
      <p className="text-sm leading-relaxed max-w-none">
        <strong className="text-[#6B1D2A]">Notă editorială:</strong>{" "}
        {mesaje[tip] || mesaje.text}
      </p>
    </div>
  );
}

/**
 * Badge mic „Provizoriu" pentru liste de carduri.
 */
export function DraftBadge() {
  return (
    <span className="text-xs uppercase tracking-wider text-[#A8842C] border border-[#A8842C] px-2 py-0.5 rounded-[2px]">
      Provizoriu
    </span>
  );
}
