/**
 * Validates public pixel IDs from NEXT_PUBLIC_* env vars.
 * Blocks empty, whitespace, quoted placeholders, and FAUX_* test values.
 */
const DEFAULT_META_PIXEL_ID = '1643486293398369';

export function normalizePixelId(raw: string | undefined): string {
  if (!raw) return '';
  return raw.trim().replace(/^['"]+|['"]+$/g, '');
}

export function isRealPixelId(raw: string | undefined): boolean {
  const id = normalizePixelId(raw);
  return id.length > 0 && !id.startsWith('FAUX_');
}

export function getMetaPixelId(): string | null {
  const configuredId = normalizePixelId(process.env.NEXT_PUBLIC_META_PIXEL_ID);
  const id = configuredId && !configuredId.startsWith('FAUX_') ? configuredId : DEFAULT_META_PIXEL_ID;
  return isRealPixelId(id) ? id : null;
}

export function getTikTokPixelId(): string | null {
  const id = normalizePixelId(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID);
  return isRealPixelId(id) ? id : null;
}

export function hasAnyRealPixel(): boolean {
  return Boolean(getMetaPixelId() || getTikTokPixelId());
}
