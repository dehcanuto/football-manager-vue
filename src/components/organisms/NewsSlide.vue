<script setup lang="ts">
import BaseCard from "@components/molecules/BaseCard.vue";
import BaseTextCarousel from "@components/molecules/BaseTextCarousel.vue";

import { last_news } from "@/data/last_news";
</script>
<template>
  <BaseCard variant="primary">
    <template #title>Últimas Notícias</template>
    <template #content>
      <BaseTextCarousel :items="last_news" :showControls="true" />
    </template>
  </BaseCard>
</template>
