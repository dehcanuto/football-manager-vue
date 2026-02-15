<script setup lang="ts">
import { computed, ComputedRef } from "vue";
import BaseCard from "@components/molecules/BaseCard.vue";
import FootballPitchVertical from "@components/molecules/FootballPitchVertical.vue";
import Stamina from "@components/atoms/Stamina.vue";

import { Nautico } from "@/data/teams";
import { Player } from "@/types";

const starters: ComputedRef<Player[]> = computed(() =>
  Nautico.players.filter((p) => p.starting),
);
const reserves = computed(() => Nautico.players.filter((p) => !p.starting));
</script>

<template>
  <div class="flex flex-col p-6 gap-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <BaseCard>
        <template #title>Jogadores</template>
        <template #content>
          <div role="tablist" class="tabs tabs-bordered">
            <input
              type="radio"
              name="formation"
              role="tab"
              class="tab"
              aria-label="Titulares"
              checked
            />
            <div role="tabpanel" class="tab-content pt-5">
              <ul>
                <li
                  v-for="p in starters"
                  :key="p.id"
                  class="flex items-center justify-between p-2 px-4 hover:bg-base-100 rounded-lg"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-60">
                      <div
                        class="font-medium text-white"
                        :class="{ 'opacity-60': !p.starting }"
                      >
                        <span class="text-primary">
                          {{ p.shirtNumber }}
                        </span>
                        {{ p.name }}
                        <span class="text-xs text-gray-500">
                          ({{ p.position }})
                        </span>

                        <!-- Gols -->
                        <span v-if="p.goals" class="ml-2 text-xs">
                          {{ "⚽".repeat(p.goals) }}
                        </span>

                        <!-- Cartões -->
                        <span
                          v-if="p.yellowCards && p.yellowCards >= 2"
                          class="ml-2 text-xs"
                          >🟥</span
                        >
                        <span
                          v-else-if="p.yellowCards === 1"
                          class="ml-2 text-xs"
                          >🟨</span
                        >
                      </div>

                      <div class="text-xs text-gray-500">
                        Sho: {{ p.attributes.shooting }} • Pac:
                        {{ p.attributes.pace }}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Stamina :value="p.stamina" />
                  </div>
                </li>
              </ul>
            </div>
            <input
              type="radio"
              name="formation"
              role="tab"
              class="tab"
              aria-label="Reservas"
            />
            <div role="tabpanel" class="tab-content pt-5">
              <ul>
                <li
                  v-for="p in reserves"
                  :key="p.id"
                  class="flex items-center justify-between p-2 px-4 hover:bg-base-100 rounded-lg"
                >
                  <div class="flex items-center gap-3">
                    <div class="w-60">
                      <div class="font-medium text-white">
                        <span class="text-primary">
                          {{ p.shirtNumber }}
                        </span>
                        {{ p.name }}
                        <span class="text-xs text-gray-500">
                          ({{ p.position }})
                        </span>

                        <!-- Gols -->
                        <span v-if="p.goals" class="ml-2 text-xs">
                          {{ "⚽".repeat(p.goals) }}
                        </span>

                        <!-- Cartões -->
                        <span
                          v-if="p.yellowCards && p.yellowCards >= 2"
                          class="ml-2 text-xs"
                          >🟥</span
                        >
                        <span
                          v-else-if="p.yellowCards === 1"
                          class="ml-2 text-xs"
                          >🟨</span
                        >
                      </div>

                      <div class="text-xs text-gray-500">
                        Sho: {{ p.attributes.shooting }} • Pac:
                        {{ p.attributes.pace }}
                      </div>
                    </div>
                  </div>
                  <Stamina :value="p.stamina" />
                </li>
              </ul>
            </div>
            <input
              type="radio"
              name="formation"
              role="tab"
              class="tab"
              aria-label="Restante do Elenco"
            />
            <div role="tabpanel" class="tab-content p-10">
              Sem dados
            </div>
          </div>
        </template>
      </BaseCard>
      <FootballPitchVertical :formation="starters" />
    </div>
  </div>
</template>
