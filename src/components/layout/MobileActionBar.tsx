'use client';

import { useEffect, useState } from 'react';
import { ctaPrimary } from '@/data/navigation';
import { whatsappUrl } from '@/data/site';
import { WhatsApp } from '@/components/ui/Icons';

/**
 * Barra de conversão fixa no mobile: aparece depois da abertura e some
 * quando o formulário de contato já está na tela.
 */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let pastHero = false;
    let atContact = false;
    const sync = () => setVisible(pastHero && !atContact);

    const onScroll = () => {
      const next = window.scrollY > window.innerHeight * 0.7;
      if (next !== pastHero) {
        pastHero = next;
        sync();
      }
    };

    const contact = document.getElementById('contato');
    const io = contact
      ? new IntersectionObserver(([e]) => {
          atContact = e.isIntersecting;
          sync();
        })
      : null;
    if (contact && io) io.observe(contact);

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <div
      className={[
        'fixed inset-x-0 bottom-0 z-40 flex gap-px bg-ink/10 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-500 ease-[var(--ease-arch)] lg:hidden',
        visible ? 'translate-y-0' : 'pointer-events-none translate-y-full',
      ].join(' ')}
      aria-hidden={!visible}
    >
      <a
        href={ctaPrimary.href}
        tabIndex={visible ? 0 : -1}
        className="label flex flex-1 items-center justify-center bg-ink px-4 py-4 text-cal"
      >
        {ctaPrimary.label}
      </a>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? 0 : -1}
        aria-label="Conversar pelo WhatsApp"
        className="flex w-14 items-center justify-center bg-oxido text-cal"
      >
        <WhatsApp />
      </a>
    </div>
  );
}
