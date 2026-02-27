import { ref } from "vue";
import { createSharedComposable } from "@vueuse/core";

import { crudService } from "@/services/crud";
import { NextMatch } from "@/models/match";

export const useChampionship = createSharedComposable(() => {
  const championship = ref<any[]>([]);
  const nextGame = ref<NextMatch>();

  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchChampionship() {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await crudService.list<any>(
        `competitions/seasons/${1}/standings`,
      );
      const dataFormatted = data.map((team: any, position: any) => ({
        ...team,
        position: ++position,
        team: team.team.name,
        goalDifference: team.goalsFor - team.goalsAgainst,
      }));

      championship.value = dataFormatted || [];
    } catch (err) {
      console.error(err);
      error.value = "Erro ao carregar notícias.";
    } finally {
      loading.value = false;
    }
  }

  async function getNextMatch() {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await crudService.list<NextMatch>(`matches/next`);
      nextGame.value = data;
    } catch (err) {
      console.error(err);
      error.value = "Erro ao carregar notícias.";
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    nextGame,
    championship,
    getNextMatch,
    fetchChampionship,
  };
});
