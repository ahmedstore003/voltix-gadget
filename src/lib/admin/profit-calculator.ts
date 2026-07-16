export interface ProfitCalculatorInput {
  cogs: number;
  sellingPrice: number;
  cpa: number;
  shippingFee: number;
  rtoCost: number;
  confirmationRate: number;
  deliveryRate: number;
}

export interface ProfitCalculatorResult {
  cpaBreakEven: number;
  globalLogisticsCost: number;
  netProfitPerDelivered: number;
  netMarginPercent: number;
  deliveredProbability: number;
}

function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, value));
}

/** Calculs COD — formules admin (taux en % entiers, ex. 60 pour 60 %). */
export function calculateCodProfit(input: ProfitCalculatorInput): ProfitCalculatorResult {
  const prixAchat = Math.max(0, input.cogs);
  const prixVente = Math.max(0, input.sellingPrice);
  const cpaAds = Math.max(0, input.cpa);
  const fraisLivraison = Math.max(0, input.shippingFee);
  const coutRTO = Math.max(0, input.rtoCost);
  const tauxConfirmation = clampPercent(input.confirmationRate);
  const tauxLivraison = clampPercent(input.deliveryRate);

  const pEff = (tauxConfirmation / 100) * (tauxLivraison / 100);

  const cLog =
    (tauxConfirmation / 100) *
    ((tauxLivraison / 100) * fraisLivraison + (1 - tauxLivraison / 100) * coutRTO);

  if (pEff === 0) {
    return {
      cpaBreakEven: 0,
      globalLogisticsCost: cLog,
      netProfitPerDelivered: 0,
      netMarginPercent: 0,
      deliveredProbability: pEff,
    };
  }

  const cpaBreakEven = pEff * (prixVente - prixAchat) - cLog;
  const beneficeNet = prixVente - prixAchat - cpaAds / pEff - cLog / pEff;
  const margeNette = prixVente > 0 ? (beneficeNet / prixVente) * 100 : 0;

  return {
    cpaBreakEven,
    globalLogisticsCost: cLog,
    netProfitPerDelivered: beneficeNet,
    netMarginPercent: margeNette,
    deliveredProbability: pEff,
  };
}

export function formatMad(value: number): string {
  if (!Number.isFinite(value)) return '0.00 DH';
  return `${value.toFixed(2)} DH`;
}

export function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return '0.0 %';
  return `${value.toFixed(1)} %`;
}
