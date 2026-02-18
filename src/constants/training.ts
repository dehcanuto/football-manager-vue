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

export const PLAYER_ATTRIBUTES = {
  pace: {
    title: "Velocidade",
    description: "Velocidade e aceleração do jogador",
  },
  shooting: { title: "Chute", description: "Precisão e potência nos chutes" },
  passing: {
    title: "Passe",
    description: "Qualidade nos passes curtos e longos",
  },
  dribbling: {
    title: "Drible",
    description: "Controle de bola e habilidade no um contra um",
  },
  heading: {
    title: "Cabeceio",
    description: "Capacidade de finalização e defesa pelo alto",
  },
  defense: {
    title: "Defesa",
    description: "Marcação, desarme e posicionamento defensivo",
  },
  physical: {
    title: "Resistência",
    description: "Força, vigor físico e fôlego ao longo da partida",
  },
  height: { title: "Altura", description: "Altura do jogador (cm)" },
  // novos
  gkDefense: {
    title: "Def. Goleiro",
    description: "Reflexos e defesa em chutes diretos ao gol",
  },
  fairPlay: {
    title: "Fair Play",
    description: "Disciplina e comportamento em campo",
  },
  marking: {
    title: "Marcação",
    description: "Habilidade em marcar adversários e recuperar bolas",
  },
  interception: {
    title: "Interceptação",
    description: "Antecipação e leitura de jogadas para interceptar passes",
  },
  crossing: {
    title: "Cruzamento",
    description: "Precisão nos cruzamentos para a área",
  },
  longPass: {
    title: "Lançamento",
    description: "Precisão e força em passes longos",
  },
  setPieces: {
    title: "Bola Parada",
    description: "Execução de faltas, escanteios e pênaltis",
  },
  ballControl: {
    title: "Domínio",
    description: "Controle de bola em recepções e giros rápidos",
  },
  positioning: {
    title: "Posicionamento",
    description: "Leitura tática e posicionamento em campo",
  },
} as const;

export type PlayerAttribute = keyof typeof PLAYER_ATTRIBUTES;
