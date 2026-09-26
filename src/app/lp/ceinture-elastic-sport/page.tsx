import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Check,
  X,
  ShieldCheck,
  Truck,
  Star,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { LOCAL_PRODUCTS } from '@/lib/products-data';
import { notFound } from 'next/navigation';
import { LpFaqAccordion } from '@/components/landing/LpFaqAccordion';
import { LpCheckoutForm } from '@/components/landing/LpCheckoutForm';
import { LpStickyCta } from '@/components/landing/LpStickyCta';
import { LpCtaButton } from '@/components/landing/LpCtaButton';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.atlastrends.ma';
const BELT_SLUG = 'ceinture-elastic-sport-lp';
const MEDIA = '/lp-media/ceinture';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'سمطة رجالية رياضية مطاطية بلا ثقوب | 149 د.م — الدفع عند الاستلام',
  description:
    'سمطة رجالية بقماش مطاطي مرن، نظام كليبس بدون ثقوب، تناسب كل المقاسات من 30 حتى 42. 3 ألوان، توصيل سريع للدار البيضاء والدفع عند الاستلام.',
  alternates: { canonical: `${SITE_URL}/lp/ceinture-elastic-sport` },
  openGraph: {
    title: 'سمطة رجالية رياضية مطاطية بلا ثقوب | 149 د.م',
    description:
      'سمطة رجالية بقماش مطاطي مرن، نظام كليبس بدون ثقوب، تناسب كل المقاسات من 30 حتى 42. توصيل سريع للدار البيضاء والدفع عند الاستلام.',
    images: [{ url: `${MEDIA}/hero.webp`, width: 1024, height: 1536 }],
    locale: 'ar_MA',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'سمطة رجالية رياضية مطاطية',
  description:
    'سمطة رجالية بقماش مطاط Stretch مرن مع كليبس بدون ثقوب، مقاس واحد يناسب الجميع. متوفرة بـ 3 ألوان.',
  brand: { '@type': 'Brand', name: 'AtlasTrends' },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'MAD',
    price: '149',
    availability: 'https://schema.org/InStock',
  },
};

const COLORWAYS = [
  {
    src: `${MEDIA}/hero.webp`,
    label: 'رمادي + خطوط زرقاء',
    tag: 'الأكثر مبيعاً',
    tagClass: 'bg-blue-600 text-white',
    badge: '★ 4.9',
  },
  {
    src: `${MEDIA}/khaki.webp`,
    label: 'كاكي + أبيض',
    tag: 'جديد',
    tagClass: 'bg-emerald-600 text-white',
    badge: 'جديد',
  },
  {
    src: `${MEDIA}/black.webp`,
    label: 'أسود + أزرق',
    tag: 'كلاسيك',
    tagClass: 'bg-gray-900 text-white',
    badge: '←',
  },
];

const BENEFITS = [
  { icon: Sparkles, title: 'كليبس بلا ثقوب', sub: 'تدور، كليك، وخلاص' },
  { icon: ShieldCheck, title: 'قماش مطاط Stretch', sub: 'كيتعدّل على ضهرك' },
  { icon: Truck, title: 'توصيل سريع كازا', sub: '24-48 ساعة' },
  { icon: Star, title: 'جودة مضمونة', sub: 'تشوفها قبل ما تخلص' },
];

const PAIN = ['الثقوب كتتقادا', 'كتعصر ولا كتسيب', 'شكل ممل'];
const SOLUTION = ['بلا ثقوب', 'مطاط مرن كيخدم وحدو', 'كاجوال وسبور'];

export default function LpBeltPage() {
  const product = LOCAL_PRODUCTS.find((entry) => entry.slug === BELT_SLUG);
  if (!product) notFound();

  return (
    <main dir="rtl" lang="ar" className="min-h-full bg-gray-50 text-gray-900 pb-24 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* ── 1. HERO — visuel dominant + info sur l'image ── */}
      <section className="relative bg-white">
        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4] lg:aspect-[16/9]">
          <Image
            src={`${MEDIA}/hero.webp`}
            alt="سمطة رجالية رياضية مطاطية بلا ثقوب رمادية"
            fill
            priority
            quality={85}
            sizes="(min-width: 1024px) 100vw, 100vw"
            className="object-cover"
            draggable={false}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 lg:bg-gradient-to-t lg:from-black/85"
          />

          <span className="absolute top-4 inline-start-4 z-10 flex items-center gap-2 rounded-full bg-orange-500 px-4 py-1.5 text-sm font-extrabold text-white shadow-lg">
            <Sparkles className="h-4 w-4" strokeWidth={2.5} /> -40%
          </span>
          <span className="absolute top-4 inline-end-4 z-10 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold text-gray-900 shadow">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> 4.9
          </span>

          <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-8 sm:px-10">
            <div className="mx-auto max-w-3xl text-white">
              <p className="text-sm font-bold text-blue-200">🔵 جي..بها وتنسى ثقوب السمطات 😅</p>
              <h1 className="mt-1 text-2xl font-extrabold leading-snug sm:text-4xl">
                سمطة مطاطية بلا ثقوب
              </h1>
              <p className="mt-2 text-sm text-white/85 sm:text-base">
                واخدة الراحة ديالك كل النهار — من مقاس 30 حتى 42.
              </p>

              <div className="mt-4 flex items-end gap-3">
                <span className="text-4xl font-extrabold tabular-nums sm:text-5xl" dir="rtl">
                  149 <span className="text-2xl sm:text-3xl">د.م</span>
                </span>
                <span className="pb-1.5 text-xl text-white/60 line-through tabular-nums sm:text-2xl" dir="rtl">
                  249 د.م
                </span>
              </div>

              <div className="mt-5 max-w-sm">
                <LpCtaButton className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-extrabold text-white shadow-xl shadow-blue-600/40 hover:bg-blue-700">
                  اطلب دابا 👈
                </LpCtaButton>
                <p className="mt-3 text-center text-sm text-white/80">
                  💵 الدفع عند الاستلام · 🚚 توصيل سريع للدار البيضاء
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. COLORWAYS — cartes images défilables (image-first) ── */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="px-5 sm:px-10">
            <h2 className="text-xl font-extrabold sm:text-2xl">اختر اللون اللي باغي 👀</h2>
            <p className="mt-1 text-sm text-gray-500">3 ألوان — الثمن واحد.</p>
          </div>

          <div className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-10 sm:justify-center [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {COLORWAYS.map((colorway, index) => (
              <article
                key={colorway.src}
                className="group relative w-[72vw] shrink-0 snap-start overflow-hidden rounded-3xl bg-white shadow-md sm:w-[300px]"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={colorway.src}
                    alt={`سمطة ${colorway.label}`}
                    fill
                    priority={index === 0}
                    quality={83}
                    sizes="(min-width: 640px) 300px, 72vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                  <span
                    className={`absolute top-3 inline-start-3 z-10 flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-extrabold shadow ${colorway.tagClass}`}
                  >
                    {colorway.badge}
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <p className="text-sm font-bold">{colorway.label}</p>
                  <LpCtaButton className="flex items-center gap-1 rounded-full bg-blue-600 px-3.5 py-1.5 text-xs font-extrabold text-white hover:bg-blue-700">
                    اختره <ChevronRight className="h-3.5 w-3.5" strokeWidth={3} />
                  </LpCtaButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. BÉNÉFICES EN OVERSIZE — 4 cartes icônes ── */}
      <section className="bg-white py-10 lg:py-14">
        <div className="mx-auto max-w-6xl px-5 sm:px-10">
          <h2 className="text-xl font-extrabold sm:text-2xl">علاش خاصك ها السمطة 💪</h2>
          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-4 text-center shadow-sm"
              >
                <span className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-blue-50 text-blue-600">
                  <benefit.icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <p className="mt-3 text-sm font-extrabold">{benefit.title}</p>
                <p className="mt-0.5 text-xs text-gray-500">{benefit.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. AVANT / APRÈS — comparaison visuelle compacte ── */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-6xl px-5 sm:px-10">
          <h2 className="text-xl font-extrabold sm:text-2xl">قارن بنفسك 👀</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-red-100 bg-red-50/70 p-5">
              <h3 className="flex items-center gap-2 text-base font-extrabold text-red-700">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-red-600 text-white">
                  <X className="h-4 w-4" strokeWidth={3} />
                </span>
                السمطة العادية
              </h3>
              <ul className="mt-4 space-y-2.5">
                {PAIN.map((line) => (
                  <li key={line} className="flex items-center gap-2.5 text-sm font-semibold text-red-900">
                    <X className="h-4 w-4 shrink-0 text-red-600" strokeWidth={3} /> {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-5">
              <h3 className="flex items-center gap-2 text-base font-extrabold text-emerald-700">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-600 text-white">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                هادي السمطة المطاطية
              </h3>
              <ul className="mt-4 space-y-2.5">
                {SOLUTION.map((line) => (
                  <li key={line} className="flex items-center gap-2.5 text-sm font-semibold text-emerald-900">
                    <Check className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3.5} /> {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. RÉASSURANCE — barre icônes ── */}
      <section className="bg-white py-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 text-sm font-bold text-gray-700">
          <span className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-blue-600" strokeWidth={2.2} /> توصيل كازا
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-600" strokeWidth={2.2} /> ضمان الرجوع
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" strokeWidth={2.2} /> جودة متأكدة
          </span>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <section className="bg-gray-50 py-10 lg:py-14">
        <div className="mx-auto max-w-3xl px-5 sm:px-10">
          <h2 className="text-center text-xl font-extrabold sm:text-2xl">أسئلة كتتكرر 🤔</h2>
          <LpFaqAccordion />
        </div>
      </section>

      {/* ── 7. CHECKOUT ── */}
      <section id="lp-order" className="scroll-mt-4 bg-gray-50 pb-12">
        <div className="mx-auto max-w-3xl px-5 sm:px-10">
          <h2 className="text-center text-xl font-extrabold sm:text-2xl">
            اطلب دابا وثبّت القيمة ديالك 🚀
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-gray-500">
            اكتب غير الاسم والطليفون. الدفع عند الاستلام.
          </p>
          <div className="mt-7">
            <LpCheckoutForm />
          </div>
        </div>
      </section>

      <LpStickyCta price={product.price} />
    </main>
  );
}