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
  gkDefense: number;
  fairPlay: number;
  marking: number;
  interception: number;
  crossing: number;
  longPass: number;
  setPieces: number;
  ballControl: number;
  positioning: number;
}

export interface PlayerFinances {
  salary: number;
  value: number;
  contractTime: number;
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
  stamina: number;
  morale: number;
  position: Position;
  height: number;
  attributes: Attributes;
  finances: PlayerFinances;
  starting?: boolean;
  goals?: number;
  yellowCards?: number;
  averageRating?: number;
  trainingFocus: string;
  team?: string;
  overall?: number;
}

export interface Team {
  name: string;
  color: string;
  formation: string;
  players: Player[];
}

export interface TeamInfos {
  name: string;
  abbreviation: string;
  stadium: string;
  supporters: number;
  balance: number;
  morale: number;
  colors: {
    primary: string;
    secondary: string;
  }
}

export interface EventResult {
  minute: number;
  text: string;
  team?: string;
  playerName?: string;
  kind?: "goal" | "shot" | "card" | "foul" | "corner" | "none";
}
