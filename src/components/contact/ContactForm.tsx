'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { submitContact, type ContactField, type ContactState } from '@/app/actions/contact';
import { propertyTypes, renovationTypes } from '@/data/content';
import { ArrowRight, WhatsApp } from '@/components/ui/Icons';

const initial: ContactState = { status: 'idle' };

const inputBase =
  'peer w-full border-0 border-b border-[var(--line-strong)] bg-transparent px-0 pt-2 pb-3 text-lg text-bone placeholder:text-bone/30 transition-colors focus:border-bone focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-oxido-claro';

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

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  const [prefersWhatsapp, setPrefersWhatsapp] = useState(false);
  const success = useRef<HTMLDivElement>(null);
  const e = state.errors ?? {};
  const v = state.values ?? {};

  useEffect(() => {
    if (state.status === 'success') success.current?.focus();
    if (state.status === 'error') {
      const first = Object.keys(state.errors ?? {})[0];
      if (first) document.getElementById(`f-${first}`)?.focus();
    }
  }, [state]);

  if (state.status === 'success') {
    return (
      <div ref={success} tabIndex={-1} className="border border-[var(--line-strong)] p-8 outline-none md:p-12" role="status">
        <p className="label text-oxido-claro">Mensagem recebida</p>
        <p className="display display-sm mt-6">{state.message}</p>
        {state.whatsappUrl && (
          <a
            href={state.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`label mt-10 inline-flex items-center gap-4 px-5 py-4 transition-colors ${
              state.prefersWhatsapp ? 'bg-bone text-ink hover:bg-oxido-claro' : 'border border-[var(--line-strong)] hover:bg-bone hover:text-ink'
            }`}
          >
            Continuar no WhatsApp
            <WhatsApp />
          </a>
        )}
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
    <form action={action} noValidate className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
      <Field name="nome" label="Nome" error={e.nome} className="sm:col-span-2">
        <input {...aria('nome')} type="text" autoComplete="name" required defaultValue={v.nome} className={inputBase} />
      </Field>

      <Field name="whatsapp" label="WhatsApp" error={e.whatsapp}>
        <input
          {...aria('whatsapp')}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="(00) 00000-0000"
          required
          defaultValue={v.whatsapp}
          className={inputBase}
        />
      </Field>

      <Field name="email" label="E-mail" error={e.email} hint={prefersWhatsapp ? 'opcional' : undefined}>
        <input {...aria('email')} type="email" autoComplete="email" required={!prefersWhatsapp} defaultValue={v.email} className={inputBase} />
      </Field>

      <Field name="imovel" label="Tipo de imóvel" error={e.imovel}>
        <select {...aria('imovel')} required defaultValue={v.imovel ?? ''} className={`${inputBase} appearance-none bg-[url('/select-arrow.svg')] bg-[length:0.75rem] bg-[right_0.25rem_center] bg-no-repeat pr-8`}>
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
        <input {...aria('cidade')} type="text" autoComplete="address-level2" required defaultValue={v.cidade} className={inputBase} />
      </Field>

      <Field name="reforma" label="Tipo de reforma" error={e.reforma} className="sm:col-span-2">
        <select {...aria('reforma')} required defaultValue={v.reforma ?? ''} className={`${inputBase} appearance-none bg-[url('/select-arrow.svg')] bg-[length:0.75rem] bg-[right_0.25rem_center] bg-no-repeat pr-8`}>
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
          defaultValue={v.mensagem}
          className={`${inputBase} resize-y`}
        />
      </Field>

      {/* Honeypot — invisível para pessoas */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
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
          {state.status === 'error' ? state.message : 'Seus dados são usados apenas para responder ao seu contato.'}
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
