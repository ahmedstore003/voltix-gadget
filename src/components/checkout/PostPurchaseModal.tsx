'use client';

import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useLanguage } from '@/context/LanguageContext';
import { Product } from '@/context/CartContext';
import { supabase } from '@/lib/supabase';
import { trackPurchase } from '@/lib/pixel';
import { productTitle, productDescription } from '@/lib/i18n';
import { X } from 'lucide-react';

export interface PostPurchaseModalProps {
  isOpen: boolean;
  onClose: (newTotal?: number) => void;
  orderId: string;
  basePrice: number;
  customerName: string;
  phoneNumber: string;
  upsellProduct: Product;
}

export const PostPurchaseModal: React.FC<PostPurchaseModalProps> = ({
  isOpen,
  onClose,
  orderId,
  basePrice,
  customerName,
  phoneNumber,
  upsellProduct,
}) => {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [upsellAdded, setUpsellAdded] = useState(false);
  const [error, setError] = useState('');
  const [newTotal, setNewTotal] = useState(basePrice);

  useEffect(() => {
    setNewTotal(basePrice);
  }, [basePrice]);

  const title = productTitle(upsellProduct, language);
  const description = productDescription(upsellProduct, language);
  const price = upsellProduct.price;

  const handleAddUpsell = async () => {
    setLoading(true);
    setError('');

    try {
      const updatedTotal = basePrice + price;

      const { error: orderError } = await supabase
        .from('orders')
        .update({ upsell_added: true, total_price: updatedTotal })
        .eq('id', orderId);

      if (orderError) throw orderError;

      const { error: itemError } = await supabase.from('order_items').insert([
        {
          order_id: orderId,
          product_id: upsellProduct.id,
          quantity: 1,
          price,
        },
      ]);

      if (itemError) throw itemError;

      setNewTotal(updatedTotal);
      setUpsellAdded(true);
      await trackPurchase(orderId, updatedTotal, 'MAD', {
        name: customerName,
        phone: phoneNumber,
      });
    } catch {
      setError(t.submitError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose(upsellAdded ? newTotal : basePrice)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-background border border-card-border p-6 sm:p-8 focus:outline-none">
          <button
            type="button"
            onClick={() => onClose(upsellAdded ? newTotal : basePrice)}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground rtl:right-auto rtl:left-4"
            aria-label="Close"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>

          {!upsellAdded ? (
            <>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">
                {t.upsellTitle}
              </p>
              <Dialog.Title className="text-lg font-semibold text-foreground pr-8">
                {title}
              </Dialog.Title>
              <Dialog.Description className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {description}
              </Dialog.Description>
              <p className="mt-4 text-sm font-medium text-foreground">
                {t.upsellAddFor} {price} {t.currencyMad}
              </p>

              {error && <p className="mt-4 text-xs text-red-500">{error}</p>}

              <div className="mt-6 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleAddUpsell}
                  disabled={loading}
                  className="w-full bg-foreground text-background py-3 text-sm font-medium hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? t.processing : t.upsellAddBtn}
                </button>
                <button
                  type="button"
                  onClick={() => onClose(basePrice)}
                  disabled={loading}
                  className="w-full py-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  {t.upsellDeclineBtn}
                </button>
              </div>
            </>
          ) : (
            <>
              <Dialog.Title className="text-lg font-semibold text-foreground">
                {t.orderConfirmedTitle}
              </Dialog.Title>
              <p className="mt-2 text-sm text-muted-foreground">{t.upsellSuccess}</p>
              <p className="mt-6 text-sm">
                {t.newTotalLabel}{' '}
                <span className="font-medium text-foreground">
                  {newTotal} {t.currencyMad}
                </span>
              </p>
              <button
                type="button"
                onClick={() => onClose(newTotal)}
                className="mt-6 w-full border border-card-border py-3 text-sm font-medium hover:bg-muted transition-colors"
              >
                {t.continueBtn}
              </button>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
