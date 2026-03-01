import { MatchStatus } from "@/enum/match.enum";
import { TeamInfos } from "./team";

export interface MatchResult {
  name: string;
  color: string;
  link: string;
  score: number;
}

export interface NextMatch {
  id: number;
  scheduledAt: string;
  round: number;
  homeTeam: {
    id: number;
    name: string;
    abbreviation: string;
    colorPrimary: string;
    colorSecondary: string;
    colorTertiary: string;
    stadium: {
      name: string;
    };
  };
  awayTeam: {
    id: number;
    name: string;
    abbreviation: string;
    colorPrimary: string;
    colorSecondary: string;
    colorTertiary: string;
  };
  season: {
    id: 1;
    seasonCode: string;
    isFinished: boolean;
    isPreSeason: boolean;
    startDate: string;
    createdAt: string;
    competition: {
      id: number;
      name: string;
      type: string;
      division: string;
      teamCount: number;
      createdAt: string;
    };
  };
}

export interface NextMatches {
  date: string;
  matches: NextMatch[];
}
