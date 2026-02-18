<script setup lang="ts">
defineProps<{ title: string; subtitle: string }>();
</script>
<template>
  <div>
    <h2 class="text-2xl font-bold text-white">{{ title }}</h2>
    <p class="text-gray-400 text-sm">
      {{ subtitle }}
    </p>
  </div>
</template>
