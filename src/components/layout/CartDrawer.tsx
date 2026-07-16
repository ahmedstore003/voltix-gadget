'use client';

import React from 'react';
import Image from 'next/image';
import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { productTitle } from '@/lib/i18n';
import { isRealImageUrl } from '@/lib/images';
import { X, Minus, Plus } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } =
    useCart();
  const { t, language } = useLanguage();
  const router = useRouter();
  const isRtl = language === 'ar';

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <Dialog.Root open={isCartOpen} onOpenChange={setIsCartOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <Dialog.Content
          className={`fixed top-0 bottom-0 z-50 w-full max-w-md bg-card border-card-border flex flex-col focus:outline-none shadow-[0_0_48px_rgba(0,0,0,0.08)] ${
            isRtl
              ? 'left-0 border-r drawer-panel-rtl'
              : 'right-0 border-l drawer-panel-ltr'
          }`}
        >
          <div className="flex items-center justify-between border-b border-card-border px-5 py-4">
            <Dialog.Title className="text-sm font-semibold text-foreground">
              {t.cartTitle}
            </Dialog.Title>
            <Dialog.Close className="text-muted-foreground hover:text-foreground" aria-label="Close">
              <X className="h-4 w-4" strokeWidth={1.5} />
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-sm text-foreground mb-2">{t.cartEmpty}</p>
                <p className="text-xs text-muted-foreground">{t.cartEmptyDesc}</p>
                <Dialog.Close className="mt-6 text-xs font-medium border border-card-border px-4 py-2 hover:bg-muted transition-colors">
                  {t.continueShopping}
                </Dialog.Close>
              </div>
            ) : (
              cartItems.map((item) => {
                const title = productTitle(item.product, language);
                const imageUrl = item.product.image_urls[0];
                return (
                  <div
                    key={item.product.id}
                    className="flex gap-4 border-b border-card-border pb-4 last:border-0"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-muted border border-card-border">
                      {imageUrl && isRealImageUrl(imageUrl) ? (
                        <Image
                          src={imageUrl}
                          alt={title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.product.price} {t.currencyMad}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="h-7 w-7 border border-card-border flex items-center justify-center hover:bg-muted"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                        <span className="text-xs w-6 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="h-7 w-7 border border-card-border flex items-center justify-center hover:bg-muted"
                          aria-label="Increase"
                        >
                          <Plus className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="ml-auto text-xs text-muted-foreground hover:text-foreground"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-card-border px-5 py-5 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t.cartSubtotal}</span>
                <span className="font-medium text-foreground">
                  {cartTotal} {t.currencyMad}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full voltix-cta py-3 text-sm font-medium transition-opacity"
              >
                {t.cartCheckout}
              </button>
              <p className="text-[10px] text-center text-muted-foreground">
                {t.freeShippingLabel} · {t.codBadge}
              </p>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
