type IconProps = { className?: string };

export function ArrowRight({ className = 'size-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={className} aria-hidden="true">
      <path d="M3 12h17M14 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight({ className = 'size-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={className} aria-hidden="true">
      <path d="M6 18 18 6M8 6h10v10" />
    </svg>
  );
}

export function Plus({ className = 'size-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={className} aria-hidden="true">
      <path d="M12 3v18M3 12h18" />
    </svg>
  );
}

export function WhatsApp({ className = 'size-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35ZM12.04 21.8h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.72.97.99-3.62-.23-.37a9.780 9.780 0 0 1-1.5-5.22c0-5.41 4.41-9.82 9.83-9.82 2.62 0 5.09 1.02 6.94 2.88a9.76 9.76 0 0 1 2.87 6.95c0 5.42-4.4 9.82-9.81 9.82Zm8.36-18.170A11.750 11.750 0 0 0 12.04.17C5.5.17.18 5.49.18 12.03c0 2.09.55 4.13 1.59 5.93L.08 24l6.18-1.62a11.830 11.830 0 0 0 5.78 1.47h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.15-3.47-8.39Z" />
    </svg>
  );
}
