'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { contactSummary, readContactForm, validateContact, type ContactErrors, type ContactField } from '@/lib/contact';
import { propertyTypes, renovationTypes } from '@/data/content';
import { site, whatsappUrl } from '@/data/site';
import { WhatsApp } from '@/components/ui/Icons';

type Status = { kind: 'idle' } | { kind: 'error'; message: string } | { kind: 'sent'; waUrl: string };

const inputBase =
  'peer w-full border-0 border-b border-[var(--line-strong)] bg-transparent px-0 pt-2 pb-3 text-lg text-bone placeholder:text-bone/30 transition-colors focus:border-bone focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-oxido-claro';

// Seta do <select>: classe .select-arrow em globals.css (independe do caminho base).
const selectArrow = 'select-arrow appearance-none pr-8';

function Field({
  name,
  label,
  error,
  children,
  className = '',
  hint,
}: {
  name: ContactField;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  hint?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={`f-${name}`} className="label flex justify-between gap-4 text-muted-dark">
        <span>{label}</span>
        {hint && <span className="normal-case tracking-normal opacity-70">{hint}</span>}
      </label>
      {children}
      <p id={`f-${name}-erro`} className="mt-2 min-h-[1.25rem] text-sm text-oxido-claro" aria-live="polite">
        {error}
      </p>
    </div>
  );
}

/**
 * Ao enviar, o formulário é validado e o WhatsApp da empresa abre com a
 * mensagem já escrita. O cliente só precisa tocar em enviar no WhatsApp.
 * Nenhum dado passa por servidores do site.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [errors, setErrors] = useState<ContactErrors>({});
  const sentPanel = useRef<HTMLDivElement>(null);
  const e = errors;

  useEffect(() => {
    if (status.kind === 'sent') sentPanel.current?.focus();
  }, [status]);

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    // Honeypot: robôs preenchem o campo escondido.
    if (String(new FormData(form).get('empresa_site') ?? '').trim()) return;

    const values = readContactForm(form);
    const found = validateContact(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      setStatus({ kind: 'error', message: 'Revise os campos destacados.' });
      document.getElementById(`f-${first}`)?.focus();
      return;
    }

    const waUrl = whatsappUrl(contactSummary(values));
    // Abre no mesmo clique (sem bloqueio de pop-up). Se o navegador bloquear,
    // segue na mesma aba — no celular isso abre o aplicativo do WhatsApp.
    const win = window.open(waUrl, '_blank');
    if (win) win.opener = null;
    else window.location.href = waUrl;
    setStatus({ kind: 'sent', waUrl });
  }

  const aria = (name: ContactField) => ({
    id: `f-${name}`,
    name,
    'aria-invalid': Boolean(e[name]),
    'aria-describedby': `f-${name}-erro`,
  });

  const sent = status.kind === 'sent' && (
    <div
      ref={sentPanel}
      tabIndex={-1}
      role="status"
      className="border border-[var(--line-strong)] p-8 outline-none md:p-12"
    >
      <p className="display display-sm">Sua mensagem está pronta no WhatsApp.</p>
      <p className="mt-4 max-w-[46ch] text-muted-dark">
        Toque em enviar no WhatsApp para falar com o {site.responsible}. O atendimento é de segunda a sexta, das 9h às
        18h, e aos sábados, das 9h às 13h.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href={status.waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="label inline-flex items-center justify-between gap-4 bg-bone px-5 py-4 text-ink transition-colors hover:bg-oxido-claro"
        >
          Abrir o WhatsApp de novo
          <WhatsApp />
        </a>
        <button
          type="button"
          onClick={() => setStatus({ kind: 'idle' })}
          className="label border border-[var(--line-strong)] px-5 py-4 transition-colors hover:bg-bone hover:text-ink"
        >
          Editar mensagem
        </button>
      </div>
    </div>
  );

  return (
    <>
      {sent}
      <form
        onSubmit={onSubmit}
        noValidate
        hidden={Boolean(sent)}
        className="relative grid gap-x-8 gap-y-6 sm:grid-cols-2"
      >
        <Field name="nome" label="Nome" error={e.nome} className="sm:col-span-2">
          <input {...aria('nome')} type="text" autoComplete="name" required className={inputBase} />
        </Field>

        <Field name="whatsapp" label="WhatsApp" error={e.whatsapp}>
          <input
            {...aria('whatsapp')}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(00) 00000-0000"
            required

            className={inputBase}
          />
        </Field>

        <Field name="email" label="E-mail" error={e.email} hint="opcional">
          <input {...aria('email')} type="email" autoComplete="email" className={inputBase} />
        </Field>

        <Field name="imovel" label="Tipo de imóvel" error={e.imovel}>
          <select {...aria('imovel')} required defaultValue="" className={`${inputBase} ${selectArrow}`}>
            <option value="" disabled className="bg-ink">
              Selecione
            </option>
            {propertyTypes.map((o) => (
              <option key={o} className="bg-ink">
                {o}
              </option>
            ))}
          </select>
        </Field>

        <Field name="cidade" label="Cidade" error={e.cidade}>
          <input {...aria('cidade')} type="text" autoComplete="address-level2" required className={inputBase} />
        </Field>

        <Field name="reforma" label="Tipo de reforma" error={e.reforma} className="sm:col-span-2">
          <select {...aria('reforma')} required defaultValue="" className={`${inputBase} ${selectArrow}`}>
            <option value="" disabled className="bg-ink">
              Selecione
            </option>
            {renovationTypes.map((o) => (
              <option key={o} className="bg-ink">
                {o}
              </option>
            ))}
          </select>
        </Field>

        <Field name="mensagem" label="Mensagem" error={e.mensagem} hint="opcional" className="sm:col-span-2">
          <textarea
            {...aria('mensagem')}
            rows={4}
            placeholder="Conte um pouco sobre o imóvel, o que deseja mudar e quando pretende começar."

            className={`${inputBase} resize-y`}
          />
        </Field>

        {/* Honeypot — invisível para pessoas */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-px w-px overflow-hidden opacity-0"
        >
          <label>
            Não preencha
            <input type="text" name="empresa_site" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="flex flex-col gap-4 pt-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-dark" aria-live="polite">
            {status.kind === 'error'
              ? status.message
              : 'Ao enviar, o WhatsApp abre com a sua mensagem pronta. Nada fica salvo neste site.'}
          </p>
          <button
            type="submit"
            className="label inline-flex shrink-0 items-center justify-between gap-4 bg-bone px-6 py-4 text-ink transition-colors hover:bg-oxido-claro"
          >
            Enviar pelo WhatsApp
            <WhatsApp className="size-4" />
          </button>
        </div>
      </form>
    </>
  );
}
