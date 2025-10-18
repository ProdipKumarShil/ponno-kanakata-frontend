import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function toBengaliNumber(enNumber) {
  if (enNumber === undefined) {
    return '';
  }
  const enStr = String(enNumber);
  const bnDigits = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  };
  return enStr.replace(/[0-9]/g, (digit) => bnDigits[digit]);
}
