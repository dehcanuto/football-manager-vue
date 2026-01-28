export type Position = "GK" | "DEF" | "MID" | "FWD";

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

export interface Player {
  id: number;
  name: string;
  position: Position;
  attributes: Attributes;
  stamina: number;
  starting?: boolean;
  goals?: number;
  yellowCards?: number;
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
