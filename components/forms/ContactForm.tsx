"use client";

import { useId, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { whatsappUrl } from "@/lib/site";

type Errors = Partial<Record<"nome" | "email" | "mensagem", string>>;
type Status = "idle" | "sending" | "ok" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim();
const WA_MSG = "Olá! Vim pelo site da Proton e gostaria de um orçamento.";

/**
 * Form de orçamento — envia por e-mail via Web3Forms (sem backend) quando há
 * chave configurada; senão, fica em modo demonstração e direciona ao WhatsApp.
 * Honeypot anti-spam. Site desacoplado do Proton OS (não grava no banco deles).
 */
export function ContactForm() {
  const tipoId = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
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

    setStatus("sending");

    // Sem chave Web3Forms ainda → modo demonstração (não envia).
    if (!WEB3FORMS_KEY) {
      window.setTimeout(() => setStatus("ok"), 600);
      return;
    }

    fd.append("access_key", WEB3FORMS_KEY);
    fd.append("subject", "Novo pedido de orçamento — site Proton");
    fd.append("from_name", "Site Proton Engenharia");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      setStatus(data.success ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-line-gold bg-bg-raised p-8">
        <p className="font-display text-h2 text-text-primary">
          Recebido. Em breve retornamos.
        </p>
        <p className="mt-3 font-sans text-body text-text-muted">
          {WEB3FORMS_KEY
            ? "Seu pedido foi enviado. Se preferir, fale agora no WhatsApp."
            : "(Demonstração — configure a chave de e-mail. Você já pode falar no WhatsApp.)"}
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button
            href={whatsappUrl(WA_MSG)}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            Falar no WhatsApp
          </Button>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="font-sans text-small uppercase tracking-[0.12em] text-gold-light underline-offset-4 hover:underline"
          >
            Enviar outra mensagem
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* honeypot anti-spam (Web3Forms) — escondido de humanos */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <Input label="Nome" name="nome" placeholder="Seu nome" autoComplete="name" error={errors.nome} />
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
        <label htmlFor={tipoId} className="font-sans text-small font-medium text-text-muted">
          Tipo de projeto
        </label>
        <select
          id={tipoId}
          name="tipo"
          defaultValue="Construção residencial"
          className="w-full rounded-lg border border-line bg-bg-raised px-4 py-3 font-sans text-body text-text-body transition-colors duration-short ease-cinematic focus:border-gold-base focus:outline-none"
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

      {status === "error" ? (
        <p className="font-sans text-small text-[#E5736B]">
          Não foi possível enviar agora. Tente novamente ou fale no WhatsApp.
        </p>
      ) : null}

      <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" variant="primary" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Enviando…" : "Enviar pedido"}
        </Button>
        <Button
          href={whatsappUrl(WA_MSG)}
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="lg"
        >
          Falar no WhatsApp
        </Button>
      </div>
    </form>
  );
}
