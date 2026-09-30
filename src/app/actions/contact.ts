'use server';

import { whatsappUrl } from '@/data/site';

export type ContactField = 'nome' | 'whatsapp' | 'email' | 'imovel' | 'cidade' | 'reforma' | 'mensagem';

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
  prefersWhatsapp?: boolean;
  whatsappUrl?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Recebe o formulário de contato. Funciona sem JavaScript (progressive
 * enhancement) e com JS via useActionState.
 *
 * TODO(integração): enviar o lead para o destino escolhido pela empresa —
 * e-mail transacional (Resend, SES), CRM (RD Station, HubSpot, Pipedrive)
 * ou planilha. Basta substituir o bloco marcado abaixo.
 */
export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: robôs preenchem campos escondidos.
  if (String(formData.get('empresa_site') ?? '').trim()) {
    return { status: 'success', message: 'Recebemos sua mensagem.' };
  }

  const values = {
    nome: String(formData.get('nome') ?? '').trim(),
    whatsapp: String(formData.get('whatsapp') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    imovel: String(formData.get('imovel') ?? '').trim(),
    cidade: String(formData.get('cidade') ?? '').trim(),
    reforma: String(formData.get('reforma') ?? '').trim(),
    mensagem: String(formData.get('mensagem') ?? '').trim().slice(0, 4000),
  };
  const prefersWhatsapp = formData.get('prefere_whatsapp') === 'on';

  const errors: ContactState['errors'] = {};
  if (values.nome.length < 2) errors.nome = 'Informe seu nome.';
  if (values.whatsapp.replace(/\D/g, '').length < 10) errors.whatsapp = 'Informe um WhatsApp com DDD.';
  if (!prefersWhatsapp && !values.email) errors.email = 'Informe seu e-mail (ou marque a opção de WhatsApp).';
  else if (values.email && !EMAIL.test(values.email)) errors.email = 'Confira o e-mail informado.';
  if (!values.imovel) errors.imovel = 'Selecione o tipo de imóvel.';
  if (values.cidade.length < 2) errors.cidade = 'Informe a cidade do imóvel.';
  if (!values.reforma) errors.reforma = 'Selecione o tipo de reforma.';

  if (Object.keys(errors).length) {
    return { status: 'error', message: 'Revise os campos destacados.', errors, values, prefersWhatsapp };
  }

  // ---- Integração -------------------------------------------------------
  // await sendLead({ ...values, prefersWhatsapp });
  console.info('[contato] novo lead', { ...values, prefersWhatsapp });
  // -----------------------------------------------------------------------

  const summary = [
    `Olá! Sou ${values.nome} e vim pelo site.`,
    `Imóvel: ${values.imovel} em ${values.cidade}.`,
    `Reforma: ${values.reforma}.`,
    values.mensagem && `Sobre o projeto: ${values.mensagem}`,
  ]
    .filter(Boolean)
    .join('\n');

  return {
    status: 'success',
    message: prefersWhatsapp
      ? 'Recebemos seus dados. Para agilizar, continue a conversa pelo WhatsApp.'
      : 'Recebemos sua mensagem. Um especialista vai entrar em contato para entender o seu projeto.',
    prefersWhatsapp,
    whatsappUrl: whatsappUrl(summary),
  };
}
