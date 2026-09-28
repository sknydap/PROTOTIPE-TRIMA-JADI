export function formatRupiah(amount: number, compact: boolean = false): string {
  if (compact) {
    if (amount >= 1_000_000_000_000) {
      return `Rp${(amount / 1_000_000_000_000).toFixed(1)} T`;
    }
    if (amount >= 1_000_000_000) {
      return `Rp${(amount / 1_000_000_000).toFixed(1)} M`;
    }
    if (amount >= 1_000_000) {
      return `Rp${(amount / 1_000_000).toFixed(1)} Jt`;
    }
  }

  // Indonesian number format with dots for thousands
  const formatted = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(amount);

  return `Rp${formatted}`;
}

export function formatPercent(value: number, showSign: boolean = true): string {
  const sign = showSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2).replace('.', ',')}%`;
}

/**
 * Calculates estimated monthly Dollar Cost Averaging (DCA) required:
 * Formula:
 * FV = PV * (1 + r)^t + PMT * [ ((1 + r)^t - 1) / r ]
 * Where:
 * r = monthly interest rate (annualReturn / 12)
 * t = total months
 * PMT = (FV - PV * (1 + r)^t) / [ ((1 + r)^t - 1) / r ]
 */
export function calculateRequiredMonthlyDca(
  targetFv: number,
  initialPv: number,
  months: number,
  annualReturnRatePercent: number = 10.0
): number {
  if (months <= 0) return 0;
  
  const r = annualReturnRatePercent / 100 / 12; // monthly rate
  const compFactor = Math.pow(1 + r, months);
  
  const futureValueOfPv = initialPv * compFactor;
  const remainingNeeded = targetFv - futureValueOfPv;

  if (remainingNeeded <= 0) return 0;

  // Annuity compound factor
  const annuityFactor = (compFactor - 1) / r;
  const monthlyDeposit = remainingNeeded / annuityFactor;

  // Round up to nearest Rp10,000 for realistic investment UX
  return Math.ceil(monthlyDeposit / 10000) * 10000;
}
