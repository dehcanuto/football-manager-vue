export const trainingTypes = [
  "Finalização",
  "Passe",
  "Velocidade",
  "Força",
  "Tática",
  "Marcação",
  "Posicionamento",
  "Reflexos",
];

export const positionTrainingSuggestions: Record<string, string[]> = {
  GK: ["Reflexos", "Reposição de bola", "Posicionamento"],
  DEF: ["Desarme", "Marcação", "Cabeceio", "Passe curto"],
  MID: ["Passe", "Visão de jogo", "Resistência", "Controle de bola"],
  FWD: ["Finalização", "Velocidade", "Drible", "Movimentação"],
};
