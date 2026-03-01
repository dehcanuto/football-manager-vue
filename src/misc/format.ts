/**
 * Formata um número ou string numérica como valor monetário brasileiro.
 *
 * @param money - Valor a ser formatado (ex: `1234.56` ou `"1234.56"`).
 * @returns Uma string no formato "R$ 1.234,56".
 */
export function MoneyFormat(money: string | number): string {
  return Number(money).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/**
 * Formata um número para o padrão brasileiro, usando ponto como separador de milhar
 * e vírgula como separador decimal.
 *
 * @example
 * ```ts
 * formatNumber(1000); // "1.000"
 * formatNumber(1234567.89); // "1.234.567,89"
 * ```
 *
 * @param value - O número que deve ser formatado.
 * @returns O número formatado como string no padrão brasileiro.
 */
export function formatNumber(value: number): string {
  return value.toLocaleString("pt-BR");
}

/**
 * Garante que o valor fornecido é um número finito.
 *
 * Se o valor for `NaN`, `Infinity`, `-Infinity`, `null`, `undefined`
 * ou não for um número válido, retorna `0`.
 *
 * @param n - Valor a ser validado.
 * @returns O número original, caso seja finito; caso contrário, retorna `0`.
 *
 * @example
 * ```ts
 * safeNumber(10)         // 10
 * safeNumber(NaN)        // 0
 * safeNumber(Infinity)   // 0
 * safeNumber(undefined)  // 0
 * safeNumber('abc')      // 0
 * ```
 */
export function safeNumber(n: any): number {
  return Number.isFinite(n) ? n : 0;
}

/**
 * @module useMorale
 * @description
 * Fornece utilitários para exibir e interpretar o valor da moral de um time.
 * Retorna rótulos textuais e classes CSS correspondentes a diferentes níveis de moral.
 */

/**
 * Estrutura de retorno da função getMoraleStatus.
 */
export interface MoraleStatus {
  /** Texto descritivo do nível de moral (ex: "Excelente", "Baixa") */
  label: string;
  /** Classe CSS (Tailwind) para definir a cor do texto. */
  color: string;
}

/**
 * Retorna uma descrição textual e a cor associada ao nível de moral.
 *
 * @param morale - Valor numérico da moral (0–100)
 * @returns Um objeto contendo o rótulo (`label`) e a cor (`color`)
 */
export function getMoraleStatus(morale: number): MoraleStatus {
  if (morale >= 85) return { label: 'Excelente', color: 'text-green-500' };
  if (morale >= 70) return { label: 'Boa', color: 'text-emerald-400' };
  if (morale >= 50) return { label: 'Regular', color: 'text-yellow-500' };
  if (morale >= 30) return { label: 'Baixa', color: 'text-orange-500' };
  return { label: 'Crítica', color: 'text-red-600' };
}

/**
 * Retorna a cor de fundo (classe Tailwind) de uma barra de moral.
 *
 * @param morale - Valor numérico da moral (0–100)
 * @returns Classe CSS da cor correspondente
 */
export function getMoraleBarColor(morale: number): string {
  if (morale >= 85) return 'bg-green-500';
  if (morale >= 70) return 'bg-emerald-400';
  if (morale >= 50) return 'bg-yellow-500';
  if (morale >= 30) return 'bg-orange-500';
  return 'bg-red-600';
}

export * from "./date.format";
