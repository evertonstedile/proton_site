"use client";

import { useId, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type Errors = Partial<Record<"nome" | "email" | "mensagem", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Form de orçamento — UI + validação completas.
 * ⚠️ ESCRITA STUBBED (B5): NÃO grava no Supabase. Simula sucesso localmente até
 * liberação humana. Ligar ao pipeline de leads do Proton OS na Fase 6.
 */
export function ContactForm() {
  const tipoId = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nome = String(fd.get("nome") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const mensagem = String(fd.get("mensagem") ?? "").trim();

    const next: Errors = {};
    if (!nome) next.nome = "Informe seu nome.";
    if (!email) next.email = "Informe seu e-mail.";
    else if (!EMAIL_RE.test(email)) next.email = "E-mail inválido.";
    if (!mensagem) next.mensagem = "Conte um pouco sobre o projeto.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // STUB: simula envio sem nenhuma escrita em rede/Supabase (B5).
    setStatus("sending");
    window.setTimeout(() => setStatus("ok"), 700);
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-line-gold bg-bg-raised p-8">
        <p className="font-display text-h2 text-text-primary">
          Recebido. Em breve retornamos.
        </p>
        <p className="mt-3 font-sans text-body text-text-muted">
          (Demonstração — o envio ainda não está conectado ao pipeline de leads.)
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 font-sans text-small uppercase tracking-[0.12em] text-gold-light underline-offset-4 hover:underline"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Input
        label="Nome"
        name="nome"
        placeholder="Seu nome"
        autoComplete="name"
        error={errors.nome}
      />
      <Input
        label="E-mail"
        name="email"
        type="email"
        placeholder="voce@email.com"
        autoComplete="email"
        error={errors.email}
      />
      <Input
        label="Telefone / WhatsApp"
        name="telefone"
        type="tel"
        placeholder="(00) 00000-0000"
        autoComplete="tel"
        hint="Opcional."
      />

      <div className="flex flex-col gap-2">
        <label
          htmlFor={tipoId}
          className="font-sans text-small font-medium text-text-muted"
        >
          Tipo de projeto
        </label>
        <select
          id={tipoId}
          name="tipo"
          defaultValue="Construção"
          className={cn(
            "w-full rounded-lg border border-line bg-bg-raised px-4 py-3 font-sans text-body text-text-body",
            "transition-colors duration-short ease-cinematic focus:border-gold-base focus:outline-none",
          )}
        >
          <option>Construção residencial</option>
          <option>Reforma de alto padrão</option>
          <option>Gerenciamento de obra</option>
          <option>Consultoria / projetos</option>
        </select>
      </div>

      <Input
        label="Mensagem"
        name="mensagem"
        multiline
        placeholder="Conte sobre o seu projeto, prazo e local…"
        error={errors.mensagem}
      />

      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" variant="primary" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Enviando…" : "Enviar pedido"}
        </Button>
        <p className="font-sans text-small text-text-muted/70">
          * Envio em modo de demonstração — escrita de leads desligada (B5).
        </p>
      </div>
    </form>
  );
}
