export type NewsCategory =
  | "transfers"
  | "results"
  | "fans"
  | "management"
  | "injuries"
  | "youth"
  | "partnerships"
  | "general"
  | "all";

export interface NewsItem {
  id: number;
  title: string;
  text: string;
  date: string;
  category: NewsCategory;
}
