"use client";

import { useState, useRef } from "react";
import Cross from "@/components/ui/Cross";

export const DONATION_IBAN = "RO90CECECT1430RON0953968";
export const DONATION_BANK = "Cont Deschis la CEC Bank Constanța";

function copyTextToClipboard(text) {
  // Fallback clasic și sigur cu textarea temporar (funcționează și pe HTTP și pe orice browser mobil)
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.top = "-9999px";
  textArea.style.left = "-9999px";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);

  const selection = document.getSelection();
  if (selection) {
    selection.removeAllRanges();
  }

  textArea.focus();
  textArea.select();
  textArea.setSelectionRange(0, text.length);

  let success = false;
  try {
    success = document.execCommand("copy");
  } catch {
    success = false;
  }

  document.body.removeChild(textArea);
  if (selection) {
    selection.removeAllRanges();
  }
  return success;
}

export default function DonationCard() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  async function handleCopy() {
    const cleanIban = DONATION_IBAN.trim();
    let copiedOk = false;

    if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(cleanIban);
        copiedOk = true;
      } catch {
        copiedOk = false;
      }
    }

    if (!copiedOk && typeof document !== "undefined") {
      copiedOk = copyTextToClipboard(cleanIban);
    }

    // Declanșăm întotdeauna feedback-ul vizual la apăsare
    setCopied(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setCopied(false);
    }, 2800);
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
          <p className="text-[0.8125rem] font-body font-500 uppercase tracking-[0.08em] text-olive mb-1.5 select-none">
            {DONATION_BANK}
          </p>
          <button
            type="button"
            onClick={handleCopy}
            title="Apasă pentru a copia doar codul IBAN"
            className="text-left font-heading text-[1.1875rem] md:text-[1.375rem] text-text font-600 tracking-wide break-all hover:text-grena transition-colors duration-200 cursor-pointer"
          >
            {DONATION_IBAN}
          </button>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-live="polite"
          aria-label="Copiază contul IBAN"
          className={`
            inline-flex items-center justify-center gap-2
            px-5 py-2.5 rounded-[4px]
            text-[0.8125rem] font-body font-500
            transition-all duration-300 ease-out
            active:scale-95 shrink-0 cursor-pointer
            ${
              copied
                ? "bg-olive text-[#F5F1E8] shadow-sm scale-[1.03]"
                : "bg-grena text-[#F5F1E8] hover:bg-[#7a2532]"
            }
          `}
        >
          {copied ? (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
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
        <p className="mt-3 text-[0.8125rem] font-body font-500 text-olive flex items-center gap-1.5 transition-opacity duration-200">
          <span>✓</span>
          <span>
            Codul IBAN <strong>{DONATION_IBAN}</strong> a fost copiat în clipboard.
          </span>
        </p>
      )}

      <p className="mt-4 text-text-muted text-[0.8125rem] italic max-w-none">
        Dumnezeu să plătească și să binecuvânteze pe cei ce ajută!
      </p>
    </div>
  );
}
