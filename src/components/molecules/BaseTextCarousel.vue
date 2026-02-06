<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  items: string[] | { title?: string; text: string }[];
  showControls?: boolean;
}>();

const currentIndex = ref(0);
const totalSlides = computed(() => props.items.length);
</script>

<template>
  <div
    class="relative w-full overflow-hidden rounded-lg text-base-content mt-3"
  >
    <div
      class="flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="w-full flex-shrink-0 flex flex-col mb-10"
      >
        <h2
          v-if="typeof item === 'object' && item.title"
          class="text-xl font-bold text-base-100 mb-2"
        >
          {{ item.title }}
        </h2>
        <p class="text-base text-base-100">
          {{ typeof item === "string" ? item : item.text }}
        </p>
      </div>
    </div>

    <div
      v-if="showControls"
      class="absolute bottom-1 right-1 flex justify-center items-center gap-3"
    >
      <div class="flex gap-2">
        <button
          v-for="(_, i) in totalSlides"
          :key="i"
          class="w-2 h-2 rounded-full"
          :class="i === currentIndex ? 'bg-base-100' : 'bg-base-100 opacity-20'"
          @click="currentIndex = i"
        ></button>
      </div>
    </div>
  </div>
</template>
