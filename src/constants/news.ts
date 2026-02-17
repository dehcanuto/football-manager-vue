import { NewsCategory } from "@/models/news";

export const categories = [
  "all",
  "transfers",
  "results",
  "fans",
  "management",
  "injuries",
  "youth",
  "partnerships",
  "general",
] as const;

export const categoryInfo: Record<
  NewsCategory,
  { name: string; color: string }
> = {
  transfers: {
    name: "Transferências",
    color: "badge-primary",
  },
  results: {
    name: "Resultados",
    color: "badge-success",
  },
  fans: {
    name: "Torcida",
    color: "badge-warning",
  },
  management: {
    name: "Gestão",
    color: "badge-info",
  },
  injuries: {
    name: "Lesões",
    color: "badge-error",
  },
  youth: {
    name: "Base",
    color: "badge-accent",
  },
  partnerships: {
    name: "Parcerias",
    color: "badge-secondary",
  },
  general: {
    name: "Geral",
    color: "badge-neutral",
  },
  all: {
    name: "Todas",
    color: "badge-outline",
  },
};

export type CategoryType = (typeof categories)[number];
