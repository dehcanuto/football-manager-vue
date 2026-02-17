/**
 * Retorna uma saudação de acordo com a hora atual do sistema.
 *
 * - "Bom dia" para horários entre 05:00 e 11:59
 * - "Boa tarde" para horários entre 12:00 e 17:59
 * - "Boa noite" para os demais horários
 *
 * @returns Uma string com a saudação apropriada: "Bom dia", "Boa tarde" ou "Boa noite".
 */
export function saudacao(): string {
  const hora = new Date().getHours();

  if (hora >= 5 && hora < 12) {
    return "Bom dia";
  } else if (hora >= 12 && hora < 18) {
    return "Boa tarde";
  } else {
    return "Boa noite";
  }
}

export * from "./format";
