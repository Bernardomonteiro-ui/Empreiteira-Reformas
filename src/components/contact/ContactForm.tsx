'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  contactSummary,
  FORM_ENDPOINT,
  readContactForm,
  sendContact,
  validateContact,
  type ContactErrors,
  type ContactField,
} from '@/lib/contact';
import { propertyTypes, renovationTypes } from '@/data/content';
import { whatsappUrl } from '@/data/site';
import { ArrowRight, WhatsApp } from '@/components/ui/Icons';

type Status =
  | { kind: 'idle' }
  | { kind: 'error'; message: string }
  | { kind: 'success'; message: string; waUrl: string; prefersWhatsapp: boolean };

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
 * Formulário 100% no navegador: valida, envia para NEXT_PUBLIC_FORM_ENDPOINT
 * (se configurado) e oferece a continuação pelo WhatsApp com a mensagem pronta.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [pending, setPending] = useState(false);
  const [prefersWhatsapp, setPrefersWhatsapp] = useState(false);
  const success = useRef<HTMLDivElement>(null);
  const e = errors;

  useEffect(() => {
    if (status.kind === 'success') success.current?.focus();
  }, [status]);

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
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

    setPending(true);
    const waUrl = whatsappUrl(contactSummary(values));
    try {
      const sent = await sendContact(values);
      setStatus({
        kind: 'success',
        waUrl,
        prefersWhatsapp: values.prefersWhatsapp || !sent,
        message:
          sent && !values.prefersWhatsapp
            ? 'Recebemos sua mensagem. Um especialista vai entrar em contato para entender o seu projeto.'
            : 'Tudo pronto. Envie sua mensagem pelo WhatsApp para falar com um especialista.',
      });
    } catch {
      setStatus({ kind: 'error', message: 'Não foi possível enviar agora. Tente de novo ou fale pelo WhatsApp.' });
    } finally {
      setPending(false);
    }
  }

  if (status.kind === 'success') {
    return (
      <div ref={success} tabIndex={-1} className="border border-[var(--line-strong)] p-8 outline-none md:p-12" role="status">
        <p className="label text-oxido-claro">{status.prefersWhatsapp ? 'Mensagem pronta' : 'Mensagem recebida'}</p>
        <p className="display display-sm mt-6">{status.message}</p>
        <a
          href={status.waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`label mt-10 inline-flex items-center gap-4 px-5 py-4 transition-colors ${
            status.prefersWhatsapp ? 'bg-bone text-ink hover:bg-oxido-claro' : 'border border-[var(--line-strong)] hover:bg-bone hover:text-ink'
          }`}
        >
          {status.prefersWhatsapp ? 'Enviar pelo WhatsApp' : 'Continuar no WhatsApp'}
          <WhatsApp />
        </a>
      </div>
    );
  }

  const aria = (name: ContactField) => ({
    id: `f-${name}`,
    name,
    'aria-invalid': Boolean(e[name]),
    'aria-describedby': `f-${name}-erro`,
  });

  return (
    <form
      action={FORM_ENDPOINT || undefined}
      method="post"
      onSubmit={onSubmit}
      noValidate className="relative grid gap-x-8 gap-y-6 sm:grid-cols-2">
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

      <Field name="email" label="E-mail" error={e.email} hint={prefersWhatsapp ? 'opcional' : undefined}>
        <input {...aria('email')} type="email" autoComplete="email" required={!prefersWhatsapp} className={inputBase} />
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
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-px w-px overflow-hidden opacity-0">
        <label>
          Não preencha
          <input type="text" name="empresa_site" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="group flex cursor-pointer items-center gap-4 sm:col-span-2">
        <input
          type="checkbox"
          name="prefere_whatsapp"
          checked={prefersWhatsapp}
          onChange={(ev) => setPrefersWhatsapp(ev.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className="grid size-5 shrink-0 place-items-center border border-[var(--line-strong)] transition-colors peer-checked:border-oxido-claro peer-checked:bg-oxido-claro peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-oxido-claro"
        >
          <svg viewBox="0 0 12 12" className={`size-3 text-ink ${prefersWhatsapp ? 'opacity-100' : 'opacity-0'}`} fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m2 6 3 3 5-6" />
          </svg>
        </span>
        <span className="flex items-center gap-2">
          <WhatsApp className="size-4 text-oxido-claro" /> Prefiro falar pelo WhatsApp
        </span>
      </label>

      <div className="flex flex-col gap-4 pt-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-dark" aria-live="polite">
          {status.kind === 'error' ? status.message : 'Seus dados são usados apenas para responder ao seu contato.'}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group/btn label inline-flex shrink-0 items-center justify-between gap-6 bg-bone px-6 py-4 text-ink transition-colors hover:bg-oxido-claro disabled:opacity-60"
        >
          {pending ? 'Enviando…' : 'Enviar'}
          <ArrowRight className="size-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
