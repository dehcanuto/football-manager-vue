<script setup lang="ts">
import BaseCard from "@components/molecules/BaseCard.vue";
import MatchCard from "@components/molecules/MatchCard.vue";
import { lastGames } from "@/data/last_games";
</script>
<template>
  <BaseCard>
    <template #title>Últimos Jogos</template>
    <template #content>
      <div class="flex items-center justify-between mb-4">
        <div>
          <h4 class="text-white text-sm uppercase">Campeonato Pernambucano</h4>
          <span class="text-xs">08/02/2026</span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-white/50 text-xs uppercase">Rodada 1 de 7</span>
          <a href="#" class="text-xs text-blue-500">Ver mais rodadas</a>
        </div>
      </div>
      <ul class="py-3 bg-base-100 rounded-lg">
        <li v-for="game in lastGames" class="">
          <MatchCard size="small" v-bind="game" />
        </li>
      </ul>
    </template>
  </BaseCard>
</template>
