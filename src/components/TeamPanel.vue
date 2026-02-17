<script setup lang="ts">
import { Team } from "@/models/team";
import Stamina from "@components/atoms/Stamina.vue";

const props = defineProps<{ team: Team }>();
</script>

<template>
  <div class="bg-base-200 rounded shadow p-3">
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
          <div class="w-56">
            <div
              class="font-medium text-sm"
              :class="{ 'opacity-60': !p.starting }"
            >
              {{ p.name }}
              <span class="text-xs text-gray-500">({{ p.position }})</span>
              <span v-if="p.goals" class="ml-2 text-xs">
                {{ "⚽ ".repeat(p.goals) }}
              </span>

              <span
                v-if="p.yellowCards && p.yellowCards >= 2"
                class="ml-2 text-xs"
                >🟥</span
              >
              <span v-else-if="p.yellowCards === 1" class="ml-2 text-xs"
                >🟨</span
              >
            </div>
            <div class="text-xs text-gray-500">
              Sho: {{ p.attributes.shooting }} • Pac: {{ p.attributes.pace }}
            </div>
          </div>
        </div>

        <Stamina :value="p.status.stamina" />
      </div>
    </div>
  </div>
</template>
