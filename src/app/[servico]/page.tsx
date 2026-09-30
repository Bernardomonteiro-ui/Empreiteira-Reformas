import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CSSProperties } from 'react';

import { servicePages } from '@/data/services';
import { processSteps } from '@/data/content';
import { getProjectsByService } from '@/data/projects';
import { site } from '@/data/site';
import { ctaPrimary } from '@/data/navigation';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';
import { PageHero } from '@/components/ui/PageHero';
import { JsonLd } from '@/components/ui/JsonLd';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { RevealLines } from '@/components/ui/RevealLines';
import { ProjectTile } from '@/components/projects/ProjectTile';
import { ArrowRight, Plus } from '@/components/ui/Icons';
import { ContactSection } from '@/components/contact/ContactSection';

/**
 * Landing pages de serviço (SEO): /reforma-completa, /reforma-de-apartamentos,
 * /reforma-residencial, /reforma-comercial, /gerenciamento-de-obras.
 * Qualquer outro caminho na raiz retorna 404 (dynamicParams = false).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((s) => ({ servico: s.slug }));
}

function find(slug: string) {
  return servicePages.find((s) => s.slug === slug);
}

export async function generateMetadata(props: PageProps<'/[servico]'>): Promise<Metadata> {
  const { servico } = await props.params;
  const service = find(servico);
  if (!service) return {};
  return pageMetadata({
    title: service.page.metaTitle,
    description: service.page.metaDescription,
    path: `/${service.slug}`,
    image: { src: service.image.src.src, width: service.image.src.width, height: service.image.src.height, alt: service.image.alt },
  });
}

export default async function ServicePage(props: PageProps<'/[servico]'>) {
  const { servico } = await props.params;
  const service = find(servico);
  if (!service) notFound();
  const { page } = service;

  const related = getProjectsByService(service.slug).slice(0, 2);
  const others = servicePages.filter((s) => s.slug !== service.slug);
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: service.name, path: `/${service.slug}` },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema(service), faqSchema(page.faq)]} />

      <PageHero eyebrow={`Serviço · ${site.city}`} title={page.h1} lead={page.lead} photo={service.image} crumbs={crumbs}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={ctaPrimary.href} tone="dark">
            {ctaPrimary.label}
          </ButtonLink>
          <ButtonLink href="#escopo" tone="dark" variant="outline">
            O que está incluído
          </ButtonLink>
        </div>
      </PageHero>

      {/* Visão geral */}
      <section aria-labelledby="visao-title" className="py-20 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="label text-muted">01 — Visão geral</p>
            <h2 id="visao-title" className="display display-md mt-6" data-reveal>
              {service.name} <span className="serif-i text-oxido">começa no planejamento.</span>
            </h2>
          </div>
          <div className="prose-editorial lead text-muted md:col-span-6 md:col-start-7" data-reveal>
            {page.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Escopo */}
      <section id="escopo" aria-labelledby="escopo-title" className="theme-dark py-20 md:py-32">
        <div className="container-x">
          <p className="label text-muted-dark">02 — Escopo</p>
          <RevealLines id="escopo-title" className="display display-lg mt-6 max-w-[18ch]" lines={[page.scopeTitle]} />
          <ol className="mt-16 grid border-t border-[var(--line)] md:mt-24 md:grid-cols-2 md:gap-x-16">
            {page.scope.map((item, i) => (
              <li
                key={item.title}
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-[var(--line)] py-8"
                data-reveal
                style={{ '--d': (i % 2) * 90 } as CSSProperties}
              >
                <span className="label pt-2 text-oxido-claro tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="display display-sm">{item.title}</h3>
                  <p className="mt-3 text-muted-dark">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Para quem é */}
      <section aria-labelledby="para-quem-title" className="py-20 md:py-32">
        <div className="container-x grid gap-8 md:grid-cols-12">
          <h2 id="para-quem-title" className="label text-muted md:col-span-3">
            03 — Para quem é
          </h2>
          <p className="font-serif text-[clamp(1.9rem,3.8vw,3.75rem)] leading-[1.08] tracking-[-0.01em] text-balance md:col-span-9" data-reveal>
            {page.audience}
          </p>
        </div>
      </section>

      {/* Método resumido */}
      <section aria-labelledby="metodo-title" className="border-t border-[var(--line)] py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="metodo-title" className="display display-md">
              Como conduzimos a obra
            </h2>
            <ButtonLink href="/#processo" variant="text">
              Ver o processo completo
            </ButtonLink>
          </div>
          <ol className="mt-12 grid grid-cols-2 border-t border-l border-[var(--line)] sm:grid-cols-3 lg:grid-cols-6">
            {processSteps.map((s, i) => (
              <li
                key={s.n}
                className="border-r border-b border-[var(--line)] p-5 md:p-6"
                data-reveal
                style={{ '--d': i * 60 } as CSSProperties}
              >
                <span className="label text-oxido">{s.n}</span>
                <h3 className="display mt-8 text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.lead}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Projetos relacionados */}
      {related.length > 0 && (
        <section aria-labelledby="relacionados-title" className="py-20 md:py-32">
          <div className="container-x">
            <h2 id="relacionados-title" className="display display-md">
              Projetos de {service.name.toLowerCase()}
            </h2>
            <div className="mt-12 grid gap-16 md:grid-cols-12 md:gap-8">
              {related.map((p, i) => (
                <ProjectTile
                  key={p.slug}
                  project={p}
                  index={i}
                  className={i === 0 ? 'md:col-span-7' : 'md:col-span-4 md:col-start-9 md:mt-32'}
                  aspect={i === 0 ? 'aspect-[4/3]' : 'aspect-[4/5]'}
                  sizes={i === 0 ? '(min-width: 768px) 58vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Perguntas frequentes */}
      <section aria-labelledby="faq-title" className="border-t border-[var(--line)] py-20 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <h2 id="faq-title" className="display display-md">
              Perguntas frequentes
            </h2>
          </div>
          <div className="border-t border-[var(--line)] md:col-span-7 md:col-start-6">
            {page.faq.map((f) => (
              <details key={f.q} className="group border-b border-[var(--line)]">
                <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-lg md:text-xl">
                  <h3>{f.q}</h3>
                  <Plus className="mt-1 size-5 shrink-0 transition-transform duration-500 group-open:rotate-45" />
                </summary>
                <p className="max-w-[60ch] pb-8 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Outros serviços */}
      <nav aria-label="Outros serviços" className="border-t border-[var(--line)]">
        <ul className="container-x">
          {others.map((s) => (
            <li key={s.slug} className="border-b border-[var(--line)] last:border-b-0">
              <Link href={`/${s.slug}`} className="group flex items-center justify-between gap-6 py-6">
                <span className="display display-sm transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:text-oxido">
                  {s.name}
                </span>
                <ArrowRight className="size-5 shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <ContactSection sheet="07" />
    </>
  );
}
