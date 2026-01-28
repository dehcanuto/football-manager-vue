<template>
  <div class="bg-white rounded shadow p-3">
    <div class="mb-4">
      <h3 class="text-2xl font-semibold">{{ team.name }}</h3>
      <span>{{ team.formation }}</span>
    </div>

    <div class="space-y-2">
      <div
        v-for="p in team.players.filter((p) => p.starting)"
        :key="p.id"
        class="flex items-center justify-between"
      >
        <div class="flex items-center gap-3">
          <div class="w-60">
            <div
              class="font-medium text-sm"
              :class="{ 'opacity-60': !p.starting }"
            >
              {{ p.name }}
              <span class="text-xs text-gray-500">({{ p.position }})</span>
              <span v-if="p.goals" class="ml-2 text-xs">
                {{ "⚽ ".repeat(p.goals) }}
              </span>

              <span v-if="p.yellowCards" class="text-xs">🟨</span>
            </div>
            <div class="text-xs text-gray-500">
              Sho: {{ p.attributes.shooting }} • Pac: {{ p.attributes.pace }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="w-10 text-right text-sm">
            {{ Math.round(p.stamina) }}%
          </div>
          <div class="w-24 bg-gray-200 rounded h-2">
            <div
              class="h-2 rounded"
              :style="{
                width: p.stamina + '%',
                backgroundColor: staminaColor(p.stamina),
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Team } from "@/types";
const props = defineProps<{ team: Team }>();

function staminaColor(val: number) {
  if (val > 66) return "#22c55e";
  if (val > 33) return "#f59e0b";
  return "#ef4444";
}
</script>
