<script setup lang="ts">
import { onMounted } from "vue";

import BaseCard from "@components/molecules/BaseCard.vue";
import BaseTextCarousel from "@components/molecules/BaseTextCarousel.vue";

import { useNews } from "@/composables/useNews";

const { news, loading, fetchNews } = useNews();
onMounted(fetchNews);
</script>
<template>
  <BaseCard variant="primary" class="h-full">
    <template #title>Últimas Notícias</template>
    <template #content>
      <BaseTextCarousel :items="news" :showControls="true" />
    </template>
  </BaseCard>
</template>
