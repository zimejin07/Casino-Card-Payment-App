export function formatCardNumber(value: string): string {
  return (
    value
      .replace(/\D/g, "")
      .match(/.{1,4}/g)
      ?.join(" ") ?? ""
  );
}

export function formatExpiryDate(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length >= 3)
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  return cleaned;
}

export function validateCardNumber(num: string): boolean {
  const cleaned = num.replace(/\D/g, ""); // remove all non-digits
  return cleaned.length === 16;
}

export function validateExpiryDate(date: string): boolean {
  const cleaned = date.replace(/\s/g, "").trim();

  if (!/^\d{2}\/\d{2}$/.test(cleaned)) return false;

  const [monthStr, yearStr] = cleaned.split("/");
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  if (isNaN(month) || isNaN(year)) return false;

  if (month < 1 || month > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  return year > currentYear || (year === currentYear && month >= currentMonth);
}

export function validateCVV(cvv: string): boolean {
  return /^\d{3}$/.test(cvv);
}
