import { site } from '@/data/site';

/**
 * Selo visual para conteúdo provisório. Some quando
 * NEXT_PUBLIC_HIDE_PLACEHOLDERS=true (após preencher os dados reais).
 */
export function PlaceholderMarker({ show = true, label = 'Placeholder' }: { show?: boolean; label?: string }) {
  if (!show || !site.showPlaceholderMarkers) return null;
  return (
    <span className="ph-marker" title="Conteúdo provisório — substituir por dados reais da empresa">
      {label}
    </span>
  );
}
