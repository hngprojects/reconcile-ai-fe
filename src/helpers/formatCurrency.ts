export const formatCurrency = (amount: number) => {
  const prefix = amount < 0 ? '-₦' : amount > 0 ? '₦' : '₦'
  return `${prefix}${Math.abs(amount).toLocaleString()}`
}
