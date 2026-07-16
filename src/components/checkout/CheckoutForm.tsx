'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCart, Product } from '@/context/CartContext';
import { trackInitiateCheckout, trackPurchase } from '@/lib/pixel';
import { productTitle } from '@/lib/i18n';
import {
  normalizeMoroccanPhone,
  validateCheckoutFields,
  sanitizeCheckoutFields,
  type CheckoutFieldErrors,
} from '@/lib/checkout-validation';
import { createOrder } from '@/lib/create-order';
import {
  sanitizeAddress,
  sanitizeCustomerName,
  sanitizePhoneInput,
} from '@/lib/sanitize';
import { MoroccanCitySelect } from '@/components/checkout/MoroccanCitySelect';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { cn } from '@/lib/utils';
import { redirectToThankYou } from '@/lib/thank-you-redirect';
import {
  type BundleOffer,
  buildBundleOrderItems,
  bundleOfferLabelKey,
  bundleQuantity,
  computeBundleTotal,
} from '@/lib/bundle-pricing';

interface CheckoutFormProps {
  onOrderSuccess: (
    orderId: string,
    totalPrice: number,
    customerName: string,
    phoneNumber: string
  ) => void;
  singleProduct?: Product;
  bundleOffer?: BundleOffer;
  embedded?: boolean;
  inline?: boolean;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onOrderSuccess,
  singleProduct,
  bundleOffer = 'standard',
  embedded = false,
  inline = false,
}) => {
  const { t, language } = useLanguage();
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const isCartMode = !singleProduct;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<CheckoutFieldErrors>({});

  const selectedQuantity = singleProduct ? bundleQuantity(bundleOffer) : 0;

  const totalPrice = useMemo(() => {
    if (singleProduct) {
      return computeBundleTotal(singleProduct.price, bundleOffer);
    }
    return cartTotal;
  }, [singleProduct, bundleOffer, cartTotal]);

  const orderItems = useMemo(() => {
    if (singleProduct) {
      return buildBundleOrderItems(singleProduct, bundleOffer);
    }
    return cartItems;
  }, [singleProduct, bundleOffer, cartItems]);

  useEffect(() => {
    if (isCartMode && cartItems.length === 0) {
      setErrors((prev) => ({ ...prev, cart: t.cartEmpty }));
    } else {
      setErrors((prev) => {
        const { cart, ...rest } = prev;
        return rest;
      });
    }
  }, [isCartMode, cartItems.length, t.cartEmpty]);

  const handleFieldFocus = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      const productName = singleProduct
        ? singleProduct.title_fr
        : `${cartItems.length} ${t.itemsLabel}`;
      trackInitiateCheckout(productName, selectedQuantity || 1, totalPrice);
    }
  };

  const runValidation = () => {
    const validationErrors = validateCheckoutFields({
      name,
      phone,
      city,
      address,
      isCartMode,
      cartEmpty: cartItems.length === 0,
      messages: {
        validationName: t.validationName,
        validationPhone: t.validationPhone,
        validationPhoneFormat: t.validationPhoneFormat,
        validationCity: t.validationCity,
        validationAddress: t.validationAddress,
        cartEmpty: t.cartEmpty,
      },
    });
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});

    const sanitized = sanitizeCheckoutFields(
      name,
      phone,
      city,
      address,
      sanitizeCustomerName,
      sanitizePhoneInput,
      sanitizeAddress
    );

    setName(sanitized.name);
    setPhone(sanitized.phone);
    setCity(sanitized.city);
    setAddress(sanitized.address);

    const validationErrors = validateCheckoutFields({
      name: sanitized.name,
      phone: sanitized.phone,
      city: sanitized.city,
      address: sanitized.address,
      isCartMode,
      cartEmpty: cartItems.length === 0,
      messages: {
        validationName: t.validationName,
        validationPhone: t.validationPhone,
        validationPhoneFormat: t.validationPhoneFormat,
        validationCity: t.validationCity,
        validationAddress: t.validationAddress,
        cartEmpty: t.cartEmpty,
      },
    });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const cleanPhone = sanitized.cleanPhone;

    try {
      const { orderId, totalPrice: confirmedTotal } = await createOrder({
        customerName: sanitized.name,
        phoneNumber: cleanPhone,
        city: sanitized.city,
        address: sanitized.address,
        totalPrice,
        items: orderItems,
      });

      await trackPurchase(orderId, confirmedTotal, 'MAD', {
        name: sanitized.name,
        phone: cleanPhone,
        city: sanitized.city,
      });

      if (isCartMode) {
        clearCart();
      }

      redirectToThankYou(router, {
        orderId,
        totalPrice: confirmedTotal,
        customerName: sanitized.name,
        phoneNumber: cleanPhone,
        city: sanitized.city,
        address: sanitized.address,
        items: orderItems,
      });

      onOrderSuccess(orderId, confirmedTotal, sanitized.name, cleanPhone);
    } catch (err: unknown) {
      console.error('Database insertion error:', err);
      const detail = err instanceof Error ? err.message : '';
      setErrors({
        submit:
          process.env.NODE_ENV === 'development' && detail
            ? `${t.submitError} (${detail})`
            : t.submitError,
      });
    } finally {
      setLoading(false);
    }
  };

  const sectionTitle = isCartMode ? t.checkoutCartTitle : t.checkoutTitle;
  const sectionSub = isCartMode ? t.checkoutCartSub : t.checkoutSub;

  const inputClass = (hasError: boolean) =>
    cn(
      'w-full h-11 border border-border bg-card px-3 py-2.5 text-sm text-foreground shadow-sm',
      'placeholder:text-muted-foreground focus:outline-none focus:border-muted-foreground transition-colors',
      hasError ? 'border-red-500/80' : 'border-border'
    );

  const labelClass =
    'text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground block mb-2 text-start';

  const errorClass = 'text-xs text-red-400/90 mt-1.5 text-start';

  const formFields = (
    <>
      {errors.cart && (
        <p className={errorClass} data-error="true">
          {errors.cart}
        </p>
      )}

      {singleProduct && embedded && (
        <div className="voltix-surface p-4 shadow-sm text-start">
          <p className="text-sm font-medium text-foreground">
            {t[bundleOfferLabelKey(bundleOffer)]}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {productTitle(singleProduct, language)} · {selectedQuantity}×
          </p>
          <p className="mt-2 text-sm font-semibold tabular-nums text-foreground">
            {totalPrice} {t.currencyMad}
          </p>
        </div>
      )}

      <div data-error={!!errors.name}>
        <label htmlFor="customer-name" className={labelClass}>
          {t.fullName}
        </label>
        <input
          id="customer-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(sanitizeCustomerName(e.target.value))}
          onFocus={handleFieldFocus}
          placeholder={t.fullNamePlaceholder}
          className={inputClass(!!errors.name)}
        />
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>

      <div data-error={!!errors.phone}>
        <label htmlFor="customer-phone" className={labelClass}>
          {t.phoneNumber}
        </label>
        <input
          id="customer-phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(sanitizePhoneInput(e.target.value))}
          onFocus={handleFieldFocus}
          placeholder={t.phoneNumberPlaceholder}
          dir="ltr"
          className={cn(inputClass(!!errors.phone), 'text-start')}
        />
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      </div>

      <div data-error={!!errors.city}>
        <label htmlFor="customer-city" className={labelClass}>
          {t.city}
        </label>
        <MoroccanCitySelect
          value={city}
          onValueChange={setCity}
          onOpen={handleFieldFocus}
          hasError={!!errors.city}
        />
        {errors.city && <p className={errorClass}>{errors.city}</p>}
      </div>

      <div data-error={!!errors.address}>
        <label htmlFor="customer-address" className={labelClass}>
          {t.address}
        </label>
        <textarea
          id="customer-address"
          rows={3}
          autoComplete="street-address"
          value={address}
          onChange={(e) => setAddress(sanitizeAddress(e.target.value))}
          onFocus={handleFieldFocus}
          placeholder={t.addressPlaceholder}
          className={cn(inputClass(!!errors.address), 'h-auto min-h-[88px] resize-none py-3')}
        />
        {errors.address && <p className={errorClass}>{errors.address}</p>}
      </div>

      {embedded && (
        <div className="flex justify-between items-center border-t border-border pt-5 text-sm">
          <span className="text-muted-foreground">{t.totalLabel}</span>
          <span className="font-medium text-foreground tabular-nums">
            {totalPrice} {t.currencyMad}
          </span>
        </div>
      )}

      {errors.submit && <p className={errorClass}>{errors.submit}</p>}

      <button
        type="submit"
        disabled={loading || (isCartMode && cartItems.length === 0)}
        className="w-full inline-flex items-center justify-center gap-2 voltix-cta py-3.5 text-sm font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        <span>{loading ? t.processing : t.placeOrder}</span>
      </button>

      <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
        {t.codBadge} · {t.secureInfoLabel}
      </p>
    </>
  );

  if (embedded) {
    const containerClass = inline ? 'w-full' : 'mx-auto max-w-lg px-4 sm:px-6';
    const sectionClass = inline
      ? 'pt-8 border-t border-border/90'
      : 'py-12';

    return (
      <section className={sectionClass}>
        <div className={containerClass}>
          <div className={inline ? 'mb-6' : 'mb-8 text-start'}>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">{sectionTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{sectionSub}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {formFields}
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          <div className="lg:col-span-7 xl:col-span-7 order-2 lg:order-1">
            <div className="mb-8 text-start">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                {sectionTitle}
              </h1>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">{sectionSub}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
              {formFields}
            </form>
          </div>

          <div className="lg:col-span-5 xl:col-span-5 order-1 lg:order-2 lg:sticky lg:top-24 voltix-sticky-gpu">
            <OrderSummary
              items={orderItems}
              totalPrice={totalPrice}
              collapsible
              className="lg:hidden"
            />
            <OrderSummary
              items={orderItems}
              totalPrice={totalPrice}
              className="hidden lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
