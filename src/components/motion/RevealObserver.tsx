'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Um único IntersectionObserver para todo o site. Elementos com
 * `data-reveal` recebem `.is-in` ao entrar na viewport (uma vez só).
 * O estado inicial "escondido" só existe quando `html.js` está presente,
 * então o conteúdo continua visível se o JavaScript falhar.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pending = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)');

    if (reduce || !('IntersectionObserver' in window)) {
      pending.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );

    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
