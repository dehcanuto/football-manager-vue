export const TEXTS = {
  MATCH: {
    GOAL: (player: string, team: string) =>
      `⚽ GOL! ${player} finaliza e abre o placar para o ${team}!`,
    GOAL_OPEN: (player: string, team: string, score: string) =>
      `⚽ GOL! ${player} (${team}) marca — placar: ${score}`,
    SAVE: (keeper: string, player: string, team: string) =>
      `${keeper} (${team}) faz grande defesa ao chute de ${player}!`,
    FOUL: (player: string, team: string) =>
      `Falta de ${player} (${team}) no meio-campo.`,
    YELLOW_CARD: (player: string, team: string) =>
      `🟨 Cartão amarelo para ${player} (${team}).`,
    CORNER: (taker: string, team: string) =>
      `🚩 Escanteio cobrado por ${taker} (${team}).`,
    OUT: (player: string, team: string) =>
      `${player} (${team}) chuta… pra fora!`,
    PRESSURE: (team: string, opponent: string) =>
      `${team} pressiona, mas o ${opponent} resiste.`,
    NEUTRAL_PASS: (team: string) => `${team} troca passes no meio-campo.`,
    PASS_ERROR: (team: string, opponent: string) =>
      `${team} erra o passe e o ${opponent} recupera a posse.`,
    COUNTER_ATTACK: (team: string, opponent: string) =>
      `Contra-ataque do ${team}, mas o ${opponent} bloqueia.`,
    BALL_ROTATION: (team: string, opponent: string) =>
      `${team} gira a bola, buscando espaço na defesa do ${opponent}.`,
    INTERVAL_MSG:
      "Intervalo — ajuste escalação/tática e inicie o segundo tempo.",
  },
  UI: {
    START_MATCH: "Iniciar Partida",
    START_SECOND_HALF: "Iniciar Segundo Tempo",
    RESTART: "Recomeçar",
  },
};
