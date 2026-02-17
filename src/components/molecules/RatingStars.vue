<script setup lang="ts">
defineProps<{ max: number; level: number }>();
</script>

<template>
  <div class="rating rating-sm pointer-events-none select-none gap-1">
    <div
      v-for="n in max"
      :key="n"
      class="mask mask-star w-4 h-4"
      :class="n <= level ? 'bg-yellow-400' : 'bg-gray-700'"
    ></div>
  </div>
</template>
