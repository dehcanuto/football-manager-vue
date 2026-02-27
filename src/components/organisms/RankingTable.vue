<script setup lang="ts">
import { onMounted } from "vue";
import BaseCard from "@components/molecules/BaseCard.vue";
import LeagueTable from "@components/molecules/LeagueTable.vue";

import { useChampionship } from "@/composables/useChampionship";

const { championship, loading, fetchChampionship } = useChampionship();

onMounted(fetchChampionship);
</script>
<template>
  <BaseCard variant="stadiumImage">
    <template #title>Classificação</template>
    <template #content>
      <LeagueTable :teams="championship" :promoted="2" :relegated="2" />
    </template>
  </BaseCard>
</template>
