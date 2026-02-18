<script setup lang="ts">
import ProgressBar from "../atoms/ProgressBar.vue";

const props = defineProps<{
  value: number;
  right?: boolean;
  full?: boolean;
}>();
</script>

<template>
  <div class="flex items-center gap-3" :class="right ? 'flex-row-reverse' : ''">
    <div class="w-10 text-sm" :class="right ? 'text-left' : 'text-right'">
      {{ Math.round(value).toFixed(0) }}%
    </div>

    <ProgressBar :value="value" :full="full" />
  </div>
</template>
