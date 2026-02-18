import { Position } from "@/models/team";

export const positionOrder = ["GK", "DEF", "LAT", "DM", "MID", "FWD"];

export const positionName = {
  GK: "Goleiro",
  DEF: "Zagueiro",
  LAT: "Lateral",
  DM: "Volante",
  MID: "Meia Ofensivo",
  FWD: "Atacante",
};

export const groups: Record<Position, Position[]> = {
  GK: ["GK"],
  DEF: ["DEF", "LAT"],
  LAT: ["DEF", "LAT"],
  DM: ["DM", "MID"],
  MID: ["DM", "MID"],
  FWD: ["FWD"],
};
