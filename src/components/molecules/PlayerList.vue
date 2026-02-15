<script setup lang="ts">
import { Player } from "@/types";
import Stamina from "@components/atoms/Stamina.vue";

defineProps<Player>();
</script>

<template>
  <div
    class="flex items-center justify-between p-2 px-4 hover:bg-base-100 rounded-lg"
  >
    <div class="flex items-center gap-3">
      <div class="w-60">
        <div
          class="font-medium text-white"
          :class="{ 'opacity-60': !starting }"
        >
          <span class="text-primary">
            {{ shirtNumber }}
          </span>
          {{ name }}
          <span class="text-xs text-gray-500"> ({{ position }}) </span>

          <!-- Gols -->
          <span v-if="goals" class="ml-2 text-xs">
            {{ "⚽".repeat(goals) }}
          </span>

          <!-- Cartões -->
          <span v-if="yellowCards && yellowCards >= 2" class="ml-2 text-xs"
            >🟥</span
          >
          <span v-else-if="yellowCards === 1" class="ml-2 text-xs">🟨</span>
        </div>

        <div class="text-xs text-gray-500">
          Sho: {{ attributes.shooting }} • Pac:
          {{ attributes.pace }}
        </div>
      </div>
    </div>
    <div>
      <Stamina :value="stamina" />
    </div>
  </div>
</template>
