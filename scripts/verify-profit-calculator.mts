import { calculateCodProfit } from '../src/lib/admin/profit-calculator';

function assertClose(label: string, actual: number, expected: number, tolerance = 0.01) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`${label}: expected ${expected}, got ${actual}`);
  }
}

// Cas nominal (DEFAULT_INPUT du dashboard)
const base = calculateCodProfit({
  cogs: 80,
  sellingPrice: 200,
  cpa: 35,
  shippingFee: 25,
  rtoCost: 30,
  confirmationRate: 65,
  deliveryRate: 72,
});

const pEff = 0.65 * 0.72;
const cLog = 0.65 * (0.72 * 25 + 0.28 * 30);
const cpaBreakEven = pEff * (200 - 80) - cLog;
const beneficeNet = 200 - 80 - 35 / pEff - cLog / pEff;
const margeNette = (beneficeNet / 200) * 100;

assertClose('pEff', base.deliveredProbability, pEff);
assertClose('cLog', base.globalLogisticsCost, cLog);
assertClose('cpaBreakEven', base.cpaBreakEven, cpaBreakEven);
assertClose('beneficeNet', base.netProfitPerDelivered, beneficeNet);
assertClose('margeNette', base.netMarginPercent, margeNette);

// Division par zéro
const zero = calculateCodProfit({
  cogs: 80,
  sellingPrice: 200,
  cpa: 35,
  shippingFee: 25,
  rtoCost: 30,
  confirmationRate: 0,
  deliveryRate: 72,
});

if (zero.cpaBreakEven !== 0 || zero.netProfitPerDelivered !== 0 || zero.netMarginPercent !== 0) {
  throw new Error('pEff=0 should zero out break-even, profit and margin');
}

console.log('profit-calculator: all checks passed');
console.log(JSON.stringify({ cpaBreakEven, beneficeNet, margeNette, cLog }, null, 2));
