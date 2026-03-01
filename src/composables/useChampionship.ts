import { ref } from "vue";
import { createSharedComposable } from "@vueuse/core";

import { crudService } from "@/services/crud";
import { NextMatch, NextMatches } from "@/models/match";

export const useChampionship = createSharedComposable(() => {
  const championship = ref<any[]>([]);
  const nextGame = ref<NextMatch>();
  const lastGame = ref<NextMatch>();
  const lastTeamsGames = ref<NextMatches>();
  const nextTeamsGames = ref<NextMatches>();

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

  async function getLastMatch() {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await crudService.list<NextMatch>(`matches/last`);
      lastGame.value = data;
    } catch (err) {
      console.error(err);
      error.value = "Erro ao carregar notícias.";
    } finally {
      loading.value = false;
    }
  }

  async function getLastMatches() {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await crudService.list<NextMatches>(`matches/last-round`);
      lastTeamsGames.value = data;
    } catch (err) {
      console.error(err);
      error.value = "Erro ao carregar notícias.";
    } finally {
      loading.value = false;
    }
  }

  async function getNextMatches() {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await crudService.list<NextMatches>(`matches/next-round`);
      nextTeamsGames.value = data;
    } catch (err) {
      console.error(err);
      error.value = "Erro ao carregar notícias.";
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    lastGame,
    nextGame,
    championship,
    lastTeamsGames,
    nextTeamsGames,
    getLastMatch,
    getNextMatch,
    getLastMatches,
    getNextMatches,
    fetchChampionship,
  };
});
