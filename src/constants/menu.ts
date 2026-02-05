export const menuOptions: MenuItem[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Elenco",
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
    label: "Estádio",
    path: "/estadio",
  },
  {
    label: "Finanças",
    path: "/financas",
  },
  {
    label: "Mercado",
    path: "/mercado",
  },
];
