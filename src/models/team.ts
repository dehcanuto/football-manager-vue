export type Position = "GK" | "DEF" | "LAT" | "MID" | "DM" | "FWD";

export type TrainingFocus =
  | "Finalização"
  | "Passe"
  | "Velocidade"
  | "Força"
  | "Tática"
  | "Marcação"
  | "Posicionamento"
  | "Reflexos";

export interface TeamRankingType {
  position: number;
  name: string;
  logo?: string;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  color: string;
}

export interface Attributes {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  heading: number;
  defense: number;
  physical: number;
  height: number;
}

export interface PlayerFinances {
  salary: number;
  value: number;
  contractTime: number;
}

export interface PlayerStatus {
  stamina: number;
  morale: number;
}

export interface PlayerTrainning {
  id: number;
  name: string;
  position: Position;
  stamina: number;
  morale: number;
  trainingFocus: TrainingFocus;
}

export interface Player {
  id: number;
  shirtNumber: number;
  name: string;
  nationality: string;
  age: number;
  status: PlayerStatus;
  position: Position;
  attributes: Attributes;
  finances: PlayerFinances;
  starting?: boolean;
  goals?: number;
  yellowCards?: number;
  averageRating?: number;
  trainingFocus: string;
}

export interface Team {
  name: string;
  color: string;
  formation: "4-3-3" | "4-4-2" | "3-5-2";
  players: Player[];
}

export interface EventResult {
  minute: number;
  text: string;
  team?: string;
  playerName?: string;
  kind?: "goal" | "shot" | "card" | "foul" | "corner" | "none";
}
