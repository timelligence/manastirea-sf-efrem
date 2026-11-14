"use client";

import { useState } from "react";
import Cross from "@/components/ui/Cross";

export const DONATION_IBAN = "RO90CECECT1430RON0953968";
export const DONATION_BANK = "Cont Deschis la CEC Bank Constanța";

export default function DonationCard() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(DONATION_IBAN);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback silențios dacă clipboard API nu este disponibil
    }
  }

  return (
    <div className="p-6 md:p-8 bg-secondary border border-border rounded-[4px]">
      <div className="flex items-center gap-2 mb-3">
        <Cross size={14} className="text-gold shrink-0" />
        <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive">
          Sprijină Mănăstirea
        </p>
      </div>

      <p className="text-text-secondary text-[0.9375rem] leading-relaxed mb-6 max-w-none">
        Dacă doriți să sprijiniți viața și lucrarea mănăstirii prin donații
        bănești, puteți folosi contul de mai jos. Orice ajutor este primit cu
        mulțumire și cu rugăciunea obștii.
      </p>

      <div className="p-5 bg-primary border border-border rounded-[4px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.08em] text-olive mb-1.5">
            {DONATION_BANK}
          </p>
          <p className="font-heading text-[1.1875rem] md:text-[1.375rem] text-text font-600 tracking-wide break-all select-all">
            {DONATION_IBAN}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-grena text-[#F5F1E8] text-[0.8125rem] font-body font-500 rounded-[4px] hover:bg-[#7a2532] transition-colors duration-200 shrink-0 cursor-pointer"
          aria-label="Copiază contul IBAN"
        >
          {copied ? "✓ IBAN copiat" : "Copiază IBAN"}
        </button>
      </div>

      <p className="mt-4 text-text-muted text-[0.8125rem] italic max-w-none">
        Dumnezeu să plătească și să binecuvânteze pe cei ce ajută!
      </p>
    </div>
  );
}
