/**
 * Validação e montagem da mensagem do formulário de contato.
 * Roda no navegador — o site pode ser publicado como arquivos estáticos
 * (GitHub Pages) sem depender de servidor.
 */

export type ContactField = 'nome' | 'whatsapp' | 'email' | 'imovel' | 'cidade' | 'reforma' | 'mensagem';
export type ContactValues = Record<ContactField, string> & { prefersWhatsapp: boolean };
export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function readContactForm(form: HTMLFormElement): ContactValues {
  const data = new FormData(form);
  const get = (k: string) => String(data.get(k) ?? '').trim();
  return {
    nome: get('nome'),
    whatsapp: get('whatsapp'),
    email: get('email'),
    imovel: get('imovel'),
    cidade: get('cidade'),
    reforma: get('reforma'),
    mensagem: get('mensagem').slice(0, 4000),
    prefersWhatsapp: data.get('prefere_whatsapp') === 'on',
  };
}

export function validateContact(v: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (v.nome.length < 2) errors.nome = 'Informe seu nome.';
  if (v.whatsapp.replace(/\D/g, '').length < 10) errors.whatsapp = 'Informe um WhatsApp com DDD.';
  if (!v.prefersWhatsapp && !v.email) errors.email = 'Informe seu e-mail (ou marque a opção de WhatsApp).';
  else if (v.email && !EMAIL.test(v.email)) errors.email = 'Confira o e-mail informado.';
  if (!v.imovel) errors.imovel = 'Selecione o tipo de imóvel.';
  if (v.cidade.length < 2) errors.cidade = 'Informe a cidade do imóvel.';
  if (!v.reforma) errors.reforma = 'Selecione o tipo de reforma.';
  return errors;
}

export function contactSummary(v: ContactValues): string {
  return [
    `Olá! Sou ${v.nome} e vim pelo site.`,
    `Imóvel: ${v.imovel} em ${v.cidade}.`,
    `Reforma: ${v.reforma}.`,
    v.mensagem && `Sobre o projeto: ${v.mensagem}`,
  ]
    .filter(Boolean)
    .join('\n');
}

/**
 * Destino dos contatos. Configure NEXT_PUBLIC_FORM_ENDPOINT com um serviço
 * de formulários (Formspree, Getform, Basin…) ou uma API própria que aceite
 * POST em JSON. Sem endpoint, o contato segue pelo WhatsApp.
 */
export const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? '';

export async function sendContact(v: ContactValues): Promise<boolean> {
  if (!FORM_ENDPOINT) return false;
  const res = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(v),
  });
  if (!res.ok) throw new Error(`Falha ao enviar (${res.status})`);
  return true;
}
