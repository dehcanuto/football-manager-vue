import { MenuItem } from "@/types/menu";

export const menuOptions: MenuItem[] = [
  {
    label: "Home",
    icon: "soccer",
    path: "/",
  },
  {
    label: "Elenco",
    icon: "players",
    path: "/elenco",
    children: [
      {
        label: "Formação",
        path: "/",
      },
      {
        label: "Treinamento",
        path: "/",
      },
    ],
  },
  {
    label: "Clube",
    icon: "stadium",
    path: "#",
    children: [
      {
        label: "Estádio",
        path: "/",
      },
      {
        label: "Sala de Troféus",
        path: "/",
      },
      {
        label: "Imprensa",
        path: "/",
      },
    ],
  },
  {
    label: "Finanças",
    icon: "finances",
    path: "/financas",
  },
  {
    label: "Mercado",
    icon: "trade",
    path: "/mercado",
  },
];
