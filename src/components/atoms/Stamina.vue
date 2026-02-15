<script setup lang="ts">
defineProps<{ value: number }>();

function staminaColor(val: number) {
  if (val > 66) return "progress-success";
  if (val > 33) return "progress-warning";
  return "progress-error";
}
</script>

<template>
  <div class="flex items-center gap-3">
    <div class="w-10 text-right text-sm">{{ Math.round(value) }}%</div>
    <progress
      class="progress w-24"
      :class="staminaColor(value)"
      :value="value"
      max="100"
    ></progress>
  </div>
</template>
