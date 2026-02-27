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
  content: string;
  date: string;
  category: NewsCategory;
}
