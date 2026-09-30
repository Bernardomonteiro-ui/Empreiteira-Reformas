'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { mainNav, ctaPrimary } from '@/data/navigation';
import { servicePages } from '@/data/services';
import { site, whatsappUrl } from '@/data/site';
import { Wordmark } from './Wordmark';
import { ArrowUpRight, WhatsApp } from '@/components/ui/Icons';

/**
 * Cabeçalho:
 * - no topo, transparente sobre a abertura escura (todas as páginas abrem com uma);
 * - ao rolar, ganha fundo "papel" e se esconde ao descer / reaparece ao subir;
 * - barra de progresso de leitura em CSS puro (scroll-driven), sem JS.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > last + 2);
      if (Math.abs(y - last) > 2) last = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fecha o menu ao trocar de página.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const solid = scrolled && !open;

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color] duration-500 ease-[var(--ease-arch)]',
          solid ? 'bg-cal/92 text-ink backdrop-blur-md' : 'bg-gradient-to-b from-ink/45 to-transparent text-bone',
          hidden && !open ? '-translate-y-full' : 'translate-y-0',
        ].join(' ')}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.name} — página inicial`} className="shrink-0">
            <Wordmark />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-10 lg:flex">
            <ul className="flex items-center gap-8">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="label relative py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-[var(--ease-arch)] hover:after:scale-x-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={ctaPrimary.href}
              className={[
                'label border px-4 py-3 transition-colors duration-300',
                solid
                  ? 'border-ink bg-ink text-cal hover:border-oxido hover:bg-oxido'
                  : 'border-bone/60 hover:border-bone hover:bg-bone hover:text-ink',
              ].join(' ')}
            >
              {ctaPrimary.label}
            </a>
          </nav>

          <button
            type="button"
            className="label -mr-2 flex items-center gap-3 p-2 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{open ? 'Fechar' : 'Menu'}</span>
            <span aria-hidden="true" className="relative block h-2.5 w-6">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? 'top-1/2 rotate-45' : 'top-0'}`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? 'top-1/2 -rotate-45' : 'bottom-0'}`}
              />
            </span>
          </button>
        </div>

        {/* Progresso de leitura */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
          <div className={`scroll-progress h-full w-full origin-left scale-x-0 ${solid ? 'bg-oxido' : 'bg-transparent'}`} />
        </div>
      </header>

      {/* Menu mobile — <dialog> nativo: foco preso, Esc para fechar */}
      <dialog
        ref={dialog}
        id="menu-mobile"
        aria-label="Menu"
        onClose={() => setOpen(false)}
        className="theme-dark m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto p-0 backdrop:bg-transparent lg:hidden"
      >
        <div className="container-x flex min-h-full flex-col pb-10">
          {/* O <dialog> fica na camada superior, por isso tem o próprio botão de fechar. */}
          <div className="flex h-[var(--header-h)] items-center justify-between">
            <Link href="/" onClick={() => setOpen(false)} aria-label={`${site.name} — página inicial`}>
              <Wordmark />
            </Link>
            <button type="button" className="label -mr-2 flex items-center gap-3 p-2" onClick={() => setOpen(false)}>
              Fechar
              <span aria-hidden="true" className="relative block h-2.5 w-6">
                <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
                <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
              </span>
            </button>
          </div>
          <nav aria-label="Menu mobile" className="mt-8">
            <ul className="border-t border-[var(--line)]">
              {[{ label: 'Início', href: '/' }, ...mainNav].map((item, i) => (
                <li key={item.href} className="border-b border-[var(--line)]">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display display-md flex items-baseline justify-between py-4"
                  >
                    {item.label}
                    <span className="label text-muted-dark">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="label mt-10 text-muted-dark">Serviços</p>
            <ul className="mt-4 grid grid-cols-1 gap-3">
              {servicePages.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} onClick={() => setOpen(false)} className="text-lg">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto grid gap-3 pt-12">
            <a
              href={ctaPrimary.href}
              onClick={() => setOpen(false)}
              className="label flex items-center justify-between bg-bone px-5 py-4 text-ink"
            >
              {ctaPrimary.label}
              <ArrowUpRight />
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="label flex items-center justify-between border border-[var(--line-strong)] px-5 py-4"
            >
              Falar pelo WhatsApp
              <WhatsApp />
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
