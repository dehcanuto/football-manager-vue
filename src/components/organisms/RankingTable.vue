<script setup lang="ts">
import BaseCard from "@components/molecules/BaseCard.vue";
import LeagueTable from "@components/molecules/LeagueTable.vue";

import { classificacaoRanking } from "@/data/classificacao";
</script>
<template>
  <BaseCard variant="stadiumImage">
    <template #title>Classificação</template>
    <template #content>
      <LeagueTable :teams="classificacaoRanking" />
    </template>
  </BaseCard>
</template>
