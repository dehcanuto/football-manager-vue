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
    path: "#",
    children: [
      {
        label: "Formação",
        path: "/elenco/formacao",
      },
      {
        label: "Treinamento",
        path: "/elenco/treinamento",
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
        path: "/clube/estadio",
      },
      {
        label: "Sala de Troféus",
        path: "/clube/sala-trofeus",
      },
      {
        label: "Imprensa",
        path: "/clube/imprensa",
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
