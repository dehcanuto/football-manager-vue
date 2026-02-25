<script setup lang="ts">
defineProps<{ label: string; value: string | undefined; loading: boolean; }>();
</script>
<template>
    <div class="flex flex-col justify-center">
        <span class="text-sm">{{ label }}</span>
        <span class="text-lg text-white">{{ value }}</span>
    </div>
</template>
