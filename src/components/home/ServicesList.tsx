'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useId, useState } from 'react';
import type { Service } from '@/data/services';
import { ArrowRight, Plus } from '@/components/ui/Icons';

type Item = Pick<Service, 'slug' | 'name' | 'short' | 'image'> & { hasPage: boolean };

/**
 * Desktop: passar o mouse (ou focar pelo teclado) em um serviço revela a
 * descrição e troca a imagem do painel fixo ao lado.
 * Mobile: o mesmo item vira um acordeão, com a imagem dentro.
 */
export function ServicesList({ items }: { items: Item[] }) {
  const [active, setActive] = useState<number | null>(0);
  const [shown, setShown] = useState(0); // imagem exibida no painel (desktop)
  const uid = useId();

  const activate = (i: number) => {
    setActive(i);
    setShown(i);
  };

  return (
    <div className="grid gap-12 md:grid-cols-12 md:gap-8">
      <ul className="border-t border-[var(--line)] md:col-span-7">
        {items.map((s, i) => {
          const open = active === i;
          const panelId = `${uid}-${i}`;
          return (
            <li key={s.slug} className="border-b border-[var(--line)]">
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => (open && window.matchMedia('(max-width: 767px)').matches ? setActive(null) : activate(i))}
                  onMouseEnter={() => window.matchMedia('(hover: hover)').matches && activate(i)}
                  onFocus={() => activate(i)}
                  className="group flex w-full items-baseline gap-4 py-5 text-left md:gap-8 md:py-6"
                >
                  <span className="label w-6 shrink-0 text-muted-dark tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <span
                    className={`display display-md flex-1 transition-[color,transform] duration-500 ease-[var(--ease-arch)] ${
                      open ? 'text-bone md:translate-x-3' : 'text-bone/45 group-hover:text-bone/80'
                    }`}
                  >
                    {s.name}
                  </span>
                  <Plus
                    className={`size-5 shrink-0 self-center transition-transform duration-500 ease-[var(--ease-arch)] ${open ? 'rotate-45 text-oxido-claro' : ''}`}
                  />
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-label={s.name}
                inert={!open}
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-arch)] ${
                  open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pb-7 pl-10 md:pl-14">
                    <div className="relative mb-5 aspect-[16/10] overflow-hidden bg-ink-2 md:hidden">
                      <Image src={s.image.src} alt={s.image.alt} fill sizes="100vw" className="object-cover" />
                    </div>
                    <p className="max-w-[46ch] text-muted-dark">{s.short}</p>
                    {s.hasPage && (
                      <Link
                        href={`/${s.slug}`}
                        className="label mt-5 inline-flex items-center gap-3 border-b border-current py-1 text-bone hover:text-oxido-claro"
                      >
                        Conheça — {s.name}
                        <ArrowRight />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Painel de imagem (desktop) */}
      <div aria-hidden="true" className="hidden md:col-span-4 md:col-start-9 md:block">
        <div className="sticky top-[calc(var(--header-h)+2rem)]">
          <div className="relative aspect-[4/5] overflow-hidden bg-ink-2">
            {items.map((s, i) => (
              <Image
                key={s.slug}
                src={s.image.src}
                alt=""
                fill
                sizes="(min-width: 768px) 33vw, 1px"
                className="object-cover transition-[opacity,transform] duration-[900ms] ease-[var(--ease-arch)]"
                style={{ opacity: shown === i ? 1 : 0, transform: shown === i ? 'scale(1)' : 'scale(1.08)' }}
              />
            ))}
          </div>
          <p className="label mt-4 flex justify-between text-muted-dark">
            <span>Fig. 06.{String(shown + 1).padStart(2, '0')}</span>
            <span>{items[shown]?.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
