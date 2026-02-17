<script setup lang="ts">
import { ref } from "vue";

import PositionTag from "@components/atoms/PositionTag.vue";
import { PlayerTrainning, TrainingFocus } from "@/models/team";
import { trainingTypes } from "@/constants/team";
import { player_trainning } from "@/data/player_trainning";

const players = ref<PlayerTrainning[]>(player_trainning);

function changeFocus(player: PlayerTrainning, newFocus: TrainingFocus) {
  player.trainingFocus = newFocus;
}
</script>

<template>
  <div class="p-6 flex flex-col gap-6">
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <h2 class="text-2xl font-bold text-gray-200">Centro de Treinamento</h2>
    </div>

    <div class="card bg-base-200 shadow-md">
      <div class="card-body grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <h3 class="text-gray-400 text-sm">Treinos ativos</h3>
          <p class="text-2xl font-bold text-primary">{{ players.length }}</p>
        </div>
        <div>
          <h3 class="text-gray-400 text-sm">Média de Moral</h3>
          <p class="text-2xl font-bold text-success">
            {{
              Math.round(
                players.reduce((acc, p) => acc + p.morale, 0) / players.length,
              )
            }}%
          </p>
        </div>
        <div>
          <h3 class="text-gray-400 text-sm">Média de Fadiga</h3>
          <p class="text-2xl font-bold text-warning">
            {{
              Math.round(
                players.reduce((acc, p) => acc + (100 - p.stamina), 0) /
                  players.length,
              )
            }}%
          </p>
        </div>
      </div>
    </div>

    <div class="card bg-base-200 shadow-lg">
      <div class="card-body">
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr class="text-gray-400 text-sm">
                <th class="text-center">#</th>
                <th>Jogador</th>
                <th class="text-center">Posição</th>
                <th class="text-center">Foco de Treino</th>
                <th class="text-center">Fadiga</th>
                <th class="text-center">Moral</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="p in players"
                :key="p.id"
                class="hover:bg-base-300 transition-colors"
              >
                <td class="text-center font-semibold text-primary">
                  {{ p.id }}
                </td>

                <td class="font-semibold text-gray-100">{{ p.name }}</td>

                <td class="text-center">
                  <PositionTag :position="p.position" />
                </td>

                <td class="text-center">
                  <select
                    v-model="p.trainingFocus"
                    @change="changeFocus(p, p.trainingFocus)"
                    class="select select-bordered select-sm w-full max-w-xs"
                  >
                    <option
                      v-for="type in trainingTypes"
                      :key="type"
                      :value="type"
                    >
                      {{ type }}
                    </option>
                  </select>
                </td>

                <!-- Fadiga -->
                <td class="text-center">
                  <progress
                    class="progress progress-warning w-24"
                    :value="100 - p.stamina"
                    max="100"
                  ></progress>
                  <span class="text-xs text-gray-400 ml-2"
                    >{{ 100 - p.stamina }}%</span
                  >
                </td>

                <!-- Moral -->
                <td class="text-center">
                  <progress
                    class="progress progress-success w-24"
                    :value="p.morale"
                    max="100"
                  ></progress>
                  <span class="text-xs text-gray-400 ml-2"
                    >{{ p.morale }}%</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
