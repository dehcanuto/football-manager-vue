<script setup lang="ts">
import BaseCard from "@components/molecules/BaseCard.vue";
import FootballPitchVertical from "@components/molecules/FootballPitchVertical.vue";
</script>

<template>
  <div class="flex flex-col p-6 gap-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <BaseCard>
        <template #title>Titulares</template>
        <template #content>

        </template>
      </BaseCard>
      <div class="mt-20">
        <FootballPitchVertical />
      </div>
    </div>
  </div>
</template>
