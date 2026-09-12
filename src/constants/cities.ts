export const MOROCCAN_CITIES = [
  { fr: 'Casablanca', ar: 'الدار البيضاء' },
] as const;

export type MoroccanCity = (typeof MOROCCAN_CITIES)[number];

export function getCityLabel(city: MoroccanCity, language: 'fr' | 'ar'): string {
  return language === 'fr' ? city.fr : city.ar;
}
