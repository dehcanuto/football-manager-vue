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
