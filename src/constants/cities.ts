export const MOROCCAN_CITIES = [
  { fr: 'Casablanca', ar: 'الدار البيضاء' },
  { fr: 'Rabat', ar: 'الرباط' },
  { fr: 'Marrakech', ar: 'مراكش' },
  { fr: 'Tangier', ar: 'طنجة' },
  { fr: 'Fes', ar: 'فاس' },
  { fr: 'Agadir', ar: 'أكادير' },
  { fr: 'Meknes', ar: 'مكناس' },
  { fr: 'Oujda', ar: 'وجدة' },
  { fr: 'Kenitra', ar: 'القنيطرة' },
  { fr: 'Tetouan', ar: 'تطوان' },
  { fr: 'Salé', ar: 'سلا' },
  { fr: 'Temara', ar: 'تمارة' },
  { fr: 'Safi', ar: 'آسفي' },
  { fr: 'Mohammedia', ar: 'المحمدية' },
  { fr: 'El Jadida', ar: 'الجديدة' },
  { fr: 'Nador', ar: 'الناظور' },
  { fr: 'Settat', ar: 'سطات' },
  { fr: 'Beni Mellal', ar: 'بني ملال' },
  { fr: 'Khouribga', ar: 'خريبكة' },
  { fr: 'Taza', ar: 'تازة' },
] as const;

export type MoroccanCity = (typeof MOROCCAN_CITIES)[number];

export function getCityLabel(city: MoroccanCity, language: 'fr' | 'ar'): string {
  return language === 'fr' ? city.fr : city.ar;
}
