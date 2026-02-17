import { createRouter, createWebHistory } from "vue-router";

import DashboardView from "@/views/Dashboard.vue";

import TeamFormationView from "@/views/TeamSquad/TeamFormationView.vue";
import TeamTrainingView from "@/views/TeamSquad/TeamTrainingView.vue";
import TeamTaticsView from "@/views/TeamSquad/TeamTaticsView.vue";

import StadiumView from "@/views/Team/StadiumView.vue";
import TrophyRoomView from "@/views/Team/TrophyRoomView.vue";
import PressRoomView from "@/views/Team/PressRoomView.vue";
import PlayerView from "@/views/Team/PlayerView.vue";

import FinancesView from "@/views/Finances/FinancesView.vue";
import TransferMarketView from "@/views/TransferMarket/TransferMarketView.vue";

import MatchView from "@/views/MatchSimulator.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, left: 0 };
    }
  },
  routes: [
    {
      path: "/",
      component: DashboardView,
    },
    {
      path: "/elenco",
      children: [
        { path: "formacao", component: TeamFormationView },
        { path: "taticas", component: TeamTaticsView },
        { path: "treinamento", component: TeamTrainingView },
      ],
    },
    {
      path: "/clube",
      children: [
        { path: "estadio", component: StadiumView },
        { path: "sala-trofeus", component: TrophyRoomView },
        { path: "imprensa", component: PressRoomView },
      ],
    },
    {
      path: "/financas",
      children: [{ path: "", component: FinancesView }],
    },
    {
      path: "/mercado",
      children: [{ path: "", component: TransferMarketView }],
    },
    {
      path: "/match",
      component: MatchView,
    },
    {
      path: "/jogador/:id",
      component: PlayerView,
    },
  ],
});

export default router;
