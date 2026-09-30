import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { ArrowRight } from './Icons';

type Variant = 'solid' | 'outline' | 'text';
type Tone = 'light' | 'dark';

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  external?: boolean;
  icon?: ReactNode;
  className?: string;
} & Omit<ComponentProps<'a'>, 'href'>;

const base =
  'group/btn inline-flex items-center justify-between gap-4 label !text-[0.72rem] transition-[background-color,color,border-color] duration-300 ease-[var(--ease-arch)]';

const variants: Record<Variant, Record<Tone, string>> = {
  solid: {
    light: 'bg-ink text-cal px-5 py-4 hover:bg-oxido',
    dark: 'bg-bone text-ink px-5 py-4 hover:bg-oxido-claro',
  },
  outline: {
    light: 'border border-[var(--line-strong)] px-5 py-[0.95rem] hover:border-ink hover:bg-ink hover:text-cal',
    dark: 'border border-[var(--line-strong)] px-5 py-[0.95rem] hover:border-bone hover:bg-bone hover:text-ink',
  },
  text: {
    light: 'py-2 border-b border-current hover:text-oxido',
    dark: 'py-2 border-b border-current hover:text-oxido-claro',
  },
};

/** Botões discretos, de proporção arquitetônica — nada de pílulas gigantes. */
export function ButtonLink({ href, children, variant = 'solid', tone = 'light', external, icon, className = '', ...rest }: Props) {
  const cls = `${base} ${variants[variant][tone]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      <span className="transition-transform duration-500 ease-[var(--ease-arch)] group-hover/btn:translate-x-1">
        {icon ?? <ArrowRight className="size-4" />}
      </span>
    </>
  );

  if (external || href.startsWith('http') || href.startsWith('#')) {
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
