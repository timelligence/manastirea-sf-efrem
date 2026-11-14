"use client";

import { useState, useRef } from "react";
import Cross from "@/components/ui/Cross";

const DONATION_IBAN = "RO90CECECT1430RON0953968";
const DONATION_BANK = "Cont Deschis la CEC Bank Constanța";

export default function DonationCard() {
  const [copied, setCopied] = useState(false);
  const ibanInputRef = useRef(null);
  const timerRef = useRef(null);

  function handleCopy(e) {
    if (e) {
      e.preventDefault();
    }

    // 1. Selectăm și copiem sincron direct din input-ul vizibil (nu poate selecta niciodată alt text din pagină)
    if (ibanInputRef.current) {
      ibanInputRef.current.focus();
      ibanInputRef.current.select();
      ibanInputRef.current.setSelectionRange(0, DONATION_IBAN.length);
      try {
        document.execCommand("copy");
      } catch {
        // Ignorăm eroarea dacă browserul folosește exclusiv Clipboard API
      }
    }

    // 2. Scriem și prin Clipboard API modern dacă este disponibil
    if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(DONATION_IBAN).catch(() => {});
    }

    // 3. Activăm sincron animația și starea de confirmare
    setCopied(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  return (
    <div className="p-6 md:p-8 bg-secondary border border-border rounded-[4px]">
      <div className="flex items-center gap-2 mb-3">
        <Cross size={14} className="text-gold shrink-0" />
        <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.12em] text-olive select-none">
          Sprijină Mănăstirea
        </p>
      </div>

      <p className="text-text-secondary text-[0.9375rem] leading-relaxed mb-6 max-w-none select-none">
        Dacă doriți să sprijiniți viața și lucrarea mănăstirii prin donații
        bănești, puteți folosi contul de mai jos. Orice ajutor este primit cu
        mulțumire și cu rugăciunea obștii.
      </p>

      <div className="p-5 bg-primary border border-border rounded-[4px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.08em] text-olive mb-1.5 select-none">
            {DONATION_BANK}
          </p>
          <input
            ref={ibanInputRef}
            type="text"
            readOnly
            value={DONATION_IBAN}
            onClick={handleCopy}
            aria-label="Cod IBAN pentru donații"
            className="w-full bg-transparent border-0 p-0 m-0 font-heading text-[1.1875rem] md:text-[1.375rem] text-text font-600 tracking-wide focus:outline-none cursor-pointer"
          />
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-live="polite"
          aria-label="Copiază contul IBAN"
          style={{
            backgroundColor: copied ? "#4A5D3A" : "#6B1D2A",
            color: "#F5F1E8",
            transform: copied ? "scale(1.04)" : "scale(1)",
            transition: "all 0.25s ease",
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[4px] text-[0.8125rem] font-body font-500 shrink-0 cursor-pointer select-none shadow-sm"
        >
          {copied ? (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>IBAN copiat!</span>
            </>
          ) : (
            <>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
                aria-hidden="true"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              <span>Copiază IBAN</span>
            </>
          )}
        </button>
      </div>

      {copied && (
        <div
          style={{ color: "#4A5D3A" }}
          className="mt-3 text-[0.8125rem] font-body font-500 flex items-center gap-1.5 select-none"
        >
          <span>✓</span>
          <span>
            S-a copiat în clipboard: <strong>{DONATION_IBAN}</strong>
          </span>
        </div>
      )}

      <p className="mt-4 text-text-muted text-[0.8125rem] italic max-w-none select-none">
        Dumnezeu să plătească și să binecuvânteze pe cei ce ajută!
      </p>
    </div>
  );
}
