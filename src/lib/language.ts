import type { Language } from '@/constants/translations';

export const LANG_COOKIE = 'voltix-lang';
export const LANG_STORAGE_KEY = 'voltix-lang';

export function parseLanguage(value: string | undefined | null): Language {
  return value === 'ar' ? 'ar' : 'fr';
}

export function setLanguageCookie(lang: Language): void {
  document.cookie = `${LANG_COOKIE}=${lang};path=/;max-age=31536000;SameSite=Lax`;
}
