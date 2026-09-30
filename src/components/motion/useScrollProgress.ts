'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Escreve o progresso de rolagem de um elemento (0 → 1) na custom property
 * `--p`. Só roda enquanto o elemento está perto da viewport, em rAF, e não
 * provoca re-render do React. O CSS decide o que animar (transform/opacity).
 *
 * - start: 0 quando o topo do elemento toca a base da viewport
 * - end:   1 quando a base do elemento toca o topo da viewport
 * Com `sticky: true`, o intervalo é o tempo em que o elemento fica "preso"
 * (do topo encostar no topo da viewport até a base encostar na base).
 * Com `center: true`, o progresso acompanha a linha central da viewport
 * percorrendo o elemento (ideal para linhas de timeline).
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  { sticky = false, center = false, disabled = false } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1');
      return;
    }

    let raf = 0;
    let active = false;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = center ? rect.height : sticky ? rect.height - vh : rect.height + vh;
      const passed = center ? vh / 2 - rect.top : sticky ? -rect.top : vh - rect.top;
      const p = total > 0 ? Math.min(1, Math.max(0, passed / total)) : 1;
      el.style.setProperty('--p', p.toFixed(4));
    };

    const onScroll = () => {
      if (active && !raf) raf = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) update();
    });

    io.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, sticky, center, disabled]);
}
