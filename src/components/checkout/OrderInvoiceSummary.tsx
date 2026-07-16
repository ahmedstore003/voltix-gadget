'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { OrderRecord } from '@/lib/orders';
import { MOROCCAN_CITIES, getCityLabel } from '@/constants/cities';

interface OrderInvoiceSummaryProps {
  order: OrderRecord;
}

export const OrderInvoiceSummary: React.FC<OrderInvoiceSummaryProps> = ({ order }) => {
  const { t, language } = useLanguage();

  const cityRecord = MOROCCAN_CITIES.find((entry) => entry.fr === order.city);
  const cityLabel = cityRecord ? getCityLabel(cityRecord, language) : order.city;

  const rows = [
    { label: t.fullName, value: order.customer_name },
    { label: t.phoneNumber, value: order.phone_number, ltr: true },
    { label: t.city, value: cityLabel },
    { label: t.totalLabel, value: `${order.total_price} ${t.currencyMad}`, highlight: true },
  ];

  return (
    <div className="voltix-surface p-5 sm:p-6 text-start">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-5">
        {t.orderInvoiceTitle}
      </p>

      <dl className="space-y-3.5 text-sm">
        {rows.map((row) => (
          <div
            key={row.label}
            className={`flex justify-between gap-4 ${
              row.highlight ? 'pt-3.5 border-t border-border' : ''
            }`}
          >
            <dt className="text-muted-foreground shrink-0">{row.label}</dt>
            <dd
              className={`text-end tabular-nums ${
                row.highlight ? 'text-lg font-semibold text-foreground' : 'text-foreground'
              } ${row.ltr ? 'dir-ltr' : ''}`}
              dir={row.ltr ? 'ltr' : undefined}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 text-[11px] text-muted-foreground text-start">
        {t.orderReferenceLabel}{' '}
        <span className="font-mono text-foreground/70">{order.id.substring(0, 8).toUpperCase()}</span>
      </p>
    </div>
  );
};
