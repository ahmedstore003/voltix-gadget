'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Truck } from 'lucide-react';
import { LOCAL_PRODUCTS } from '@/lib/products-data';
import { Product } from '@/context/CartContext';
import { trackPurchase } from '@/lib/pixel';
import {
  normalizeMoroccanPhone,
  validateCheckoutFields,
  sanitizeCheckoutFields,
} from '@/lib/checkout-validation';
import { createOrder } from '@/lib/create-order';
import { sanitizeAddress, sanitizeCustomerName, sanitizePhoneInput } from '@/lib/sanitize';
import {
  type BundleOffer,
  buildBundleOrderItems,
  computeBundleTotalFromProduct,
} from '@/lib/bundle-pricing';
import { redirectToThankYou } from '@/lib/thank-you-redirect';
import { cn } from '@/lib/utils';

const BELT_SLUG = 'ceinture-elastic-sport-lp';
const CITY = 'الدار البيضاء';
const CURRENCY = 'د.م';

const OFFERS: { offer: BundleOffer; qty: string; price: number }[] = [
  { offer: 'standard', qty: '1 قطعة', price: 149 },
  { offer: 'duo', qty: 'جوج قطع', price: 279 },
  { offer: 'trio', qty: 'تلاطة قطع', price: 399 },
];

const MESSAGES = {
  validationName: 'اكتب اسمك الكامل من فضلك.',
  validationPhone: 'اكتب رقم الطليفون ديالك.',
  validationPhoneFormat: 'رقم الطليفون ماشي صحيح — جرب بالصيغة 06XXXXXXXX.',
  validationCity: 'اختر المدينة.',
  validationAddress: 'اكتب العنوان الكامل ديالك.',
  cartEmpty: '',
};

const product: Product = LOCAL_PRODUCTS.find((p) => p.slug === BELT_SLUG) as Product;

export const LpCheckoutForm: React.FC = () => {
  const router = useRouter();
  const [offer, setOffer] = useState<BundleOffer>('standard');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; submit?: string }>({});

  const totalPrice = computeBundleTotalFromProduct(product, offer);
  const orderItems = buildBundleOrderItems(product, offer);

  const inputClass = (hasError: boolean) =>
    cn(
      'w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-gray-900 placeholder:text-gray-400 outline-none transition',
      hasError
        ? 'border-red-400 ring-2 ring-red-300/50'
        : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
    );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});

    const sanitized = sanitizeCheckoutFields(
      name,
      phone,
      CITY,
      CITY,
      sanitizeCustomerName,
      sanitizePhoneInput,
      sanitizeAddress
    );

    const validationErrors = validateCheckoutFields({
      name: sanitized.name,
      phone: sanitized.phone,
      city: sanitized.city,
      address: sanitized.address,
      isCartMode: false,
      cartEmpty: false,
      messages: MESSAGES,
    });

    setName(sanitized.name);
    setPhone(sanitized.phone);

    if (Object.keys(validationErrors).length > 0) {
      setErrors({ name: validationErrors.name, phone: validationErrors.phone });
      setLoading(false);
      return;
    }

    try {
      const { orderId, totalPrice: confirmedTotal } = await createOrder({
        customerName: sanitized.name,
        phoneNumber: sanitized.cleanPhone,
        city: CITY,
        address: CITY,
        totalPrice,
        items: orderItems,
      });

      await trackPurchase(orderId, confirmedTotal, 'MAD', {
        name: sanitized.name,
        phone: sanitized.cleanPhone,
        city: CITY,
      });

      redirectToThankYou(router, {
        orderId,
        totalPrice: confirmedTotal,
        customerName: sanitized.name,
        phoneNumber: sanitized.cleanPhone,
        city: CITY,
        address: CITY,
        items: orderItems,
      });
    } catch (err: unknown) {
      console.error('Landing order error:', err);
      const detail = err instanceof Error ? err.message : '';
      setErrors({
        submit:
          process.env.NODE_ENV === 'development' && detail
            ? `خدمة التوصيل متعطلات دابا (${detail})`
            : 'ووقع خطأ ما، عاود جرب فجزء من ثانية.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
    >
      <div role="radiogroup" aria-label="اختر الكمية" className="flex flex-col gap-3">
        {OFFERS.map((item) => {
          const active = offer === item.offer;
          return (
            <label
              key={item.offer}
              className={cn(
                'flex cursor-pointer items-center justify-between rounded-xl border-2 px-4 py-3 transition-colors',
                active ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'
              )}
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="quantity"
                  value={item.offer}
                  checked={active}
                  onChange={() => setOffer(item.offer)}
                  className="sr-only"
                />
                <span
                  className={cn(
                    'grid h-5 w-5 place-items-center rounded-full border-2 transition',
                    active ? 'border-blue-600' : 'border-gray-300'
                  )}
                  aria-hidden="true"
                >
                  {active && <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
                </span>
                <span className="text-[15px] font-bold text-gray-900">{item.qty}</span>
              </span>
              <span className="text-[15px] font-extrabold text-blue-600" dir="rtl">
                {item.price} {CURRENCY}
              </span>
            </label>
          );
        })}
      </div>
      <p className="mt-3 text-[11px] text-gray-500">
        الثمن النهائي:{' '}
        <strong className="text-gray-900">
          {totalPrice} {CURRENCY}
        </strong>{' '}
        {offer !== 'standard' && <span className="text-blue-600">(خصم على الكمية 🔥)</span>}
      </p>

      <div className="mt-5 flex flex-col gap-4">
        <div>
          <label htmlFor="lp-name" className="mb-1.5 block text-sm font-bold text-gray-900">
            الاسم الكامل
          </label>
          <input
            id="lp-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثال: محمد العلوي"
            autoComplete="name"
            aria-invalid={!!errors.name}
            className={inputClass(!!errors.name)}
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="lp-phone" className="mb-1.5 block text-sm font-bold text-gray-900">
            رقم الطليفون
          </label>
          <input
            id="lp-phone"
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(sanitizePhoneInput(e.target.value))}
            placeholder="06XXXXXXXX"
            autoComplete="tel"
            dir="ltr"
            aria-invalid={!!errors.phone}
            className={cn(inputClass(!!errors.phone), 'text-start')}
          />
          {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="lp-city" className="mb-1.5 block text-sm font-bold text-gray-900">
            المدينة
          </label>
          <div className="relative">
            <input
              id="lp-city"
              type="text"
              value={CITY}
              readOnly
              tabIndex={-1}
              className={cn(inputClass(false), 'cursor-not-allowed bg-gray-100 pe-10 text-gray-600')}
            />
            <Truck
              className="absolute inline-end-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-600"
              strokeWidth={2}
            />
          </div>
          <p className="mt-1.5 text-[11px] text-gray-500">
            التوصيل دابا متاح فقط فمدينة الدار البيضاء.
          </p>
        </div>

        {errors.submit && <p className="text-xs font-semibold text-red-500">{errors.submit}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-base font-extrabold text-white shadow-lg shadow-blue-600/25 transition enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
          <span>{loading ? 'جاري معالجة الطلب...' : 'اطلب دابا — الدفع عند الاستلام'}</span>
        </button>
      </div>
    </form>
  );
};