import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina múltiplas classes CSS usando clsx e tailwind-merge
 *
 * @param inputs - Classes CSS a serem combinadas
 * @returns String com as classes CSS combinadas e otimizadas
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
