<script setup lang="ts">
import { computed, onMounted } from "vue";

import { formatFull } from "@/misc";
import { useChampionship } from "@/composables/useChampionship";
import BaseCard from "@components/molecules/BaseCard.vue";
import MatchCard from "@components/molecules/MatchCard.vue";

const { nextGame, loading, getNextMatch } = useChampionship();

const scheduledAt = computed(
  () => nextGame?.value && formatFull(nextGame?.value.scheduledAt),
);

onMounted(getNextMatch);
</script>
<template>
  <BaseCard variant="glass" centerTitle>
    <template #title>Próximo Jogo</template>
    <template #content>
      <div class="text-center">
        <div class="flex flex-col">
          <span
            >{{ nextGame?.season.competition.name }}
            <template v-if="nextGame?.season.competition.division">
              • Série {{ nextGame?.season.competition.division }}</template
            ></span
          >
          <span>{{ nextGame?.season.seasonCode }} • {{ scheduledAt }}</span>
        </div>
        <MatchCard
          v-if="nextGame"
          :home="{
            name: nextGame?.awayTeam.name,
            color: nextGame?.awayTeam.colorPrimary,
            link: `/equipe/${nextGame?.awayTeam.id}`,
          }"
          :away="{
            name: nextGame?.homeTeam.name,
            color: nextGame?.homeTeam.colorPrimary,
            link: `/equipe/${nextGame?.homeTeam.id}`,
          }"
        />
        <span>{{ nextGame?.homeTeam.stadium.name }}</span>
      </div>
    </template>
  </BaseCard>
</template>
