import { useDateFormat } from "@vueuse/core";

/**
 * Utilitário para formatação de datas em diferentes padrões da aplicação.
 *
 * Baseado no `useDateFormat` do VueUse, que utiliza o mesmo padrão de tokens do Day.js.
 *
 * @example
 * ```ts
 * formatFull("2026-02-26T14:27:18.511Z");
 * // "26/02/2026 11:27"
 *
 * formatShort(new Date());
 * // "26/02/2026"
 *
 * formatTime("2026-02-26T14:27:18.511Z");
 * // "11:27"
 * ```
 *
 * @see https://vueuse.org/core/useDateFormat/
 */

/**
 * Formata a data completa no padrão `DD/MM/YYYY HH:mm`.
 * Ideal para exibir logs, mensagens ou notícias com data e hora.
 *
 * @param date - A data em formato `string` ISO ou `Date`.
 * @param locale - Localização opcional (padrão: `pt-BR`).
 * @returns Uma string formatada no formato `DD/MM/YYYY HH:mm`.
 */
export function formatFull(date: string | Date, locale = "pt-BR"): string {
  return useDateFormat(date, "DD/MM/YYYY HH:mm", { locales: locale }).value;
}

/**
 * Formata a data curta no padrão `DD/MM/YYYY`.
 * Usado em listagens onde a hora não é necessária.
 *
 * @param date - A data em formato `string` ISO ou `Date`.
 * @param locale - Localização opcional (padrão: `pt-BR`).
 * @returns Uma string formatada no formato `DD/MM/YYYY`.
 */
export function formatShort(date: string | Date, locale = "pt-BR"): string {
  return useDateFormat(date, "DD/MM/YYYY", { locales: locale }).value;
}

/**
 * Formata apenas o horário no padrão `HH:mm`.
 * Ideal para partidas, eventos ou logs.
 *
 * @param date - A data em formato `string` ISO ou `Date`.
 * @param locale - Localização opcional (padrão: `pt-BR`).
 * @returns Uma string formatada no formato `HH:mm`.
 */
export function formatTime(date: string | Date, locale = "pt-BR"): string {
  return useDateFormat(date, "HH:mm", { locales: locale }).value;
}

/**
 * Formata uma data relativa amigável (ex.: "há 3 horas", "ontem").
 * Pode ser útil em notificações e mensagens recentes.
 *
 * @param date - A data em formato `string` ISO ou `Date`.
 * @param locale - Localização opcional (padrão: `pt-BR`).
 * @returns Uma string descritiva relativa ao momento atual.
 */
export function formatRelative(date: string | Date, locale = "pt-BR"): string {
  const now = new Date();
  const diff = (now.getTime() - new Date(date).getTime()) / 1000; // segundos
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (diff < 60) return rtf.format(-Math.floor(diff), "second");
  if (diff < 3600) return rtf.format(-Math.floor(diff / 60), "minute");
  if (diff < 86400) return rtf.format(-Math.floor(diff / 3600), "hour");
  if (diff < 2592000) return rtf.format(-Math.floor(diff / 86400), "day");
  if (diff < 31536000) return rtf.format(-Math.floor(diff / 2592000), "month");
  return rtf.format(-Math.floor(diff / 31536000), "year");
}
