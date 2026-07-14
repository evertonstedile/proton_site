"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  CONSENT_KEY,
  CONSENT_EVENT,
  getCookieConsent,
  type ConsentValue,
} from "@/lib/consent";

/**
 * Aviso de cookies opt-in (ANPD): "Aceitar" e "Recusar" com peso equivalente,
 * nada não-essencial dispara antes da escolha. Renderiza null no SSR e até
 * decidir se há escolha salva — sem flash para quem já respondeu.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getCookieConsent() === null) setVisible(true);
  }, []);

  function decide(value: ConsentValue) {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* localStorage indisponível (modo privado): segue só na sessão */
    }
    // permite que scripts de medição/marketing (Pixel/GA) reajam à escolha
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex max-w-container flex-col gap-4 rounded-2xl border border-line bg-bg-elevated/95 p-5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
        <p className="font-sans text-small text-fg-muted">
          Usamos cookies e tecnologias de medição para entender o uso do site e
          melhorar sua experiência. Os essenciais são sempre ativos; os de
          análise e marketing só com o seu consentimento. Saiba mais na{" "}
          <Link
            href="/privacidade"
            className="text-accent underline-offset-4 transition-colors duration-short hover:text-accent"
          >
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={() => decide("rejected")}
          >
            Recusar
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => decide("accepted")}
          >
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
}
