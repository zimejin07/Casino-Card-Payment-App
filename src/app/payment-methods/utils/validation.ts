export function formatCardNumber(value: string): string {
  return value.replace(/\D/g, '').match(/.{1,4}/g)?.join(' ') ?? ''
}

export function formatExpiryDate(value: string): string {
  const cleaned = value.replace(/\D/g, '')
  if (cleaned.length >= 3)
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
  return cleaned
}

export function validateCardNumber(num: string): boolean {
  return /^\d{16}$/.test(num.replace(/\s/g, ''))
}

export function validateExpiryDate(date: string): boolean {
  if (!/^\d{2}\/\d{2}$/.test(date)) return false
  const [month, year] = date.split('/').map(Number)
  const now = new Date()
  const currentYear = now.getFullYear() % 100
  const currentMonth = now.getMonth() + 1
  return (
    month >= 1 &&
    month <= 12 &&
    (year > currentYear || (year === currentYear && month >= currentMonth))
  )
}

export function validateCVV(cvv: string): boolean {
  return /^\d{3}$/.test(cvv)
}
