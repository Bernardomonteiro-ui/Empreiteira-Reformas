'use client';

import { useEffect, useRef } from 'react';

/**
 * Cursor-anel discreto, apenas em dispositivos com mouse e sem
 * `prefers-reduced-motion`. O cursor nativo continua visível (acessível);
 * o anel apenas acompanha e reage a links e imagens de projeto.
 *
 * - `data-cursor="view"` + `data-cursor-label="Ver"` → anel expande com rótulo
 * - links e botões → anel contrai
 */
export function CustomCursor() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = root.current;
    if (!fine || reduce || !el) return;

    el.hidden = false;
    let x = -100;
    let y = -100;
    let cx = x;
    let cy = y;
    let raf = 0;

    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.dataset.hidden = 'false';
      if (!raf) raf = requestAnimationFrame(loop);

      const target = e.target as Element | null;
      const view = target?.closest<HTMLElement>('[data-cursor="view"]');
      if (view) {
        el.dataset.state = 'view';
        if (label.current) label.current.textContent = view.dataset.cursorLabel ?? 'Ver';
      } else if (target?.closest('a, button, summary, [role="button"], label, select')) {
        el.dataset.state = 'link';
      } else {
        el.dataset.state = '';
      }
    };

    const onLeave = () => {
      el.dataset.hidden = 'true';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} className="cursor" aria-hidden="true" hidden data-hidden="true">
      <span className="cursor__ring" />
      <span ref={label} className="cursor__label label">
        Ver
      </span>
    </div>
  );
}
