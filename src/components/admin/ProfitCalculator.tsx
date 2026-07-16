'use client';

import React, { useMemo, useState } from 'react';
import { Calculator } from 'lucide-react';
import {
  calculateCodProfit,
  formatMad,
  formatPercent,
  type ProfitCalculatorInput,
} from '@/lib/admin/profit-calculator';

const DEFAULT_INPUT: ProfitCalculatorInput = {
  cogs: 80,
  sellingPrice: 200,
  cpa: 35,
  shippingFee: 25,
  rtoCost: 30,
  confirmationRate: 65,
  deliveryRate: 72,
};

interface MetricProps {
  label: string;
  value: string;
  highlight?: boolean;
}

const Metric: React.FC<MetricProps> = ({ label, value, highlight = false }) => (
  <div className="rounded-xl border border-border bg-muted/40 px-4 py-3">
    <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
    <p
      className={`mt-2 text-lg font-semibold tabular-nums ${
        highlight ? 'text-emerald-700 dark:text-emerald-300' : 'text-foreground'
      }`}
    >
      {value}
    </p>
  </div>
);

interface NumberFieldProps {
  label: string;
  value: number;
  suffix?: string;
  onChange: (value: number) => void;
}

const NumberField: React.FC<NumberFieldProps> = ({ label, value, suffix, onChange }) => (
  <label className="block">
    <span className="mb-2 block text-xs font-medium text-muted-foreground">{label}</span>
    <div className="relative">
      <input
        type="number"
        min={0}
        step="any"
        value={Number.isFinite(value) ? value : 0}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-11 w-full border border-border bg-card px-3 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-muted-foreground"
      />
      {suffix && (
        <span className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
          {suffix}
        </span>
      )}
    </div>
  </label>
);

export const ProfitCalculator: React.FC = () => {
  const [input, setInput] = useState<ProfitCalculatorInput>(DEFAULT_INPUT);

  const result = useMemo(() => calculateCodProfit(input), [input]);

  const updateField = <K extends keyof ProfitCalculatorInput>(key: K, value: number) => {
    setInput((current) => ({ ...current, [key]: value }));
  };

  return (
    <section className="voltix-surface p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Calculateur COD</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Rentabilité nette en tenant compte confirmation, livraison et retours RTO.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField
          label="Prix d'achat (COGS)"
          value={input.cogs}
          suffix="DH"
          onChange={(value) => updateField('cogs', value)}
        />
        <NumberField
          label="Prix de vente"
          value={input.sellingPrice}
          suffix="DH"
          onChange={(value) => updateField('sellingPrice', value)}
        />
        <NumberField
          label="CPA (Ads)"
          value={input.cpa}
          suffix="DH"
          onChange={(value) => updateField('cpa', value)}
        />
        <NumberField
          label="Frais de livraison / colis"
          value={input.shippingFee}
          suffix="DH"
          onChange={(value) => updateField('shippingFee', value)}
        />
        <NumberField
          label="Coût d'un RTO"
          value={input.rtoCost}
          suffix="DH"
          onChange={(value) => updateField('rtoCost', value)}
        />
        <NumberField
          label="Taux de confirmation"
          value={input.confirmationRate}
          suffix="%"
          onChange={(value) => updateField('confirmationRate', value)}
        />
        <NumberField
          label="Taux de livraison"
          value={input.deliveryRate}
          suffix="%"
          onChange={(value) => updateField('deliveryRate', value)}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3">
        <Metric label="CPA Break-even" value={formatMad(result.cpaBreakEven)} highlight />
        <Metric label="Coût logistique global / commande" value={formatMad(result.globalLogisticsCost)} />
        <Metric
          label="Bénéfice net / commande livrée"
          value={formatMad(result.netProfitPerDelivered)}
          highlight
        />
        <Metric label="Marge nette" value={formatPercent(result.netMarginPercent)} highlight />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Probabilité de livraison effective : {formatPercent(result.deliveredProbability * 100)}.
        Ajustez les taux pour simuler votre funnel COD réel.
      </p>
    </section>
  );
};
