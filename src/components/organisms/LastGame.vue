<script setup lang="ts">
import { computed, onMounted } from "vue";

import { formatFull } from "@/misc";
import { useChampionship } from "@/composables/useChampionship";

import BaseCard from "@components/molecules/BaseCard.vue";
import MatchCard from "@components/molecules/MatchCard.vue";

const { lastGame, loading, getLastMatch } = useChampionship();

const scheduledAt = computed(
  () => lastGame?.value && formatFull(lastGame?.value.scheduledAt),
);

onMounted(getLastMatch);
</script>
<template>
  <BaseCard v-if="lastGame" variant="dark" centerTitle>
    <template #title>Último Jogo</template>
    <template #content>
      <div class="flex flex-col items-center text-center gap-2">
        <div class="flex items-center justify-center text-sm gap-4">
          <span>{{ scheduledAt }}</span>
          <span>-</span>
          <span>Aflitos</span>
        </div>
        <MatchCard
          size="medium"
          v-bind="lastGame"
        />
        <RouterLink to="/match" class="btn btn-sm btn-outline w-fit">
          Assistir Reprise
        </RouterLink>
      </div>
    </template>
  </BaseCard>
</template>
