<script setup lang="ts">
defineProps<{
  value: number;
  full?: boolean;
}>();

function staminaColor(val: number) {
  if (val > 66) return "progress-success";
  if (val > 33) return "progress-warning";
  return "progress-error";
}
</script>

<template>
  <progress
    class="progress"
    :class="[staminaColor(value), full ? 'w-full' : 'w-24']"
    :value="value.toFixed(0)"
    max="100"
  ></progress>
</template>
