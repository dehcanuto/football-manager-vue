<script setup lang="ts">
import { computed, ComputedRef } from "vue";
import BaseCard from "@components/molecules/BaseCard.vue";
import PlayerList from "@components/molecules/PlayerList.vue";
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
                <li v-for="p in starters" :key="p.id">
                  <PlayerList v-bind="p" />
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
                >
                  <PlayerList v-bind="p" />
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
            <div role="tabpanel" class="tab-content p-10">Sem dados</div>
          </div>
        </template>
      </BaseCard>
      <FootballPitchVertical :formation="starters" />
    </div>
  </div>
</template>
