/**
 * Formulário de contato: validação e montagem da mensagem de WhatsApp.
 * Tudo roda no navegador; nenhum dado é enviado a servidores do site.
 * O cliente envia a mensagem pelo próprio WhatsApp.
 */

export type ContactField = 'nome' | 'whatsapp' | 'email' | 'imovel' | 'cidade' | 'reforma' | 'mensagem';
export type ContactValues = Record<ContactField, string>;
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
    mensagem: get('mensagem').slice(0, 1500),
  };
}

export function validateContact(v: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (v.nome.length < 2) errors.nome = 'Informe seu nome.';
  if (v.whatsapp.replace(/\D/g, '').length < 10) errors.whatsapp = 'Informe um WhatsApp com DDD.';
  if (v.email && !EMAIL.test(v.email)) errors.email = 'Confira o e-mail informado.';
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
    `Contato: ${v.whatsapp}${v.email ? ` · ${v.email}` : ''}`,
  ]
    .filter(Boolean)
    .join('\n');
}
