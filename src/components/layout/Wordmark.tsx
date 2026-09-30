import { site } from '@/data/site';

/**
 * Marca provisória (tipográfica). Substitua pelo logotipo oficial em SVG
 * mantendo a altura de ~1.5rem para não alterar o cabeçalho.
 */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="grid size-7 place-items-center border border-current">
        <span className="block h-3 w-px bg-current" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="display text-[1.35rem] tracking-[0.04em]">{site.name}</span>
        <span className="label mt-1 !text-[0.56rem] opacity-70">{site.descriptor}</span>
      </span>
    </span>
  );
}
