<script setup lang="ts">
import { onMounted } from "vue";

import BaseCard from "@components/molecules/BaseCard.vue";
import BaseTextCarousel from "@components/molecules/BaseTextCarousel.vue";

import { useMessages } from "@/composables/useMessages";

const { messages, loading, fetchMessages } = useMessages();

onMounted(fetchMessages);
</script>
<template>
  <BaseCard variant="primary">
    <template #title>Últimas Notícias</template>
    <template #content>
      <BaseTextCarousel :items="messages" :showControls="true" />
    </template>
  </BaseCard>
</template>
