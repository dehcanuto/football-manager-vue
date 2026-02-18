<script setup lang="ts">
import {
  trainingTypes,
  positionTrainingSuggestions,
} from "@/constants/training";

import { useTraining } from "@/composables/training";
import Stamina from "@/components/molecules/Stamina.vue";

const {
  availablePlayers,
  selectedPlayer,
  selectedPlayerId,
  trainingFocus,
  addPlayerToTraining,
} = useTraining();
</script>

<template>
  <div class="card bg-base-200 shadow-lg">
    <div class="card-body">
      <h3 class="text-lg font-bold text-gray-100 mb-3">
        Adicionar Jogador ao Treino
      </h3>

      <div class="grid grid-cols-1 sm:grid-cols-5 gap-4">
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Jogador</span>
          </div>
          <select
            v-model="selectedPlayerId"
            class="select select-bordered select-sm w-full max-w-xs"
          >
            <option disabled value="">Selecione um jogador...</option>
            <option v-for="p in availablePlayers" :key="p.id" :value="p.id">
              {{ p.name }} ({{ p.position }})
            </option>
          </select>
        </label>

        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Foco do Treino</span>
          </div>
          <select
            v-model="trainingFocus"
            class="select select-bordered select-sm w-full max-w-xs"
          >
            <option disabled value="">Selecione o foco...</option>
            <option v-for="type in trainingTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
        </label>

        <template v-if="selectedPlayer">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Fadiga</span>
            </div>
            <Stamina
              class="my-auto"
              :value="selectedPlayer.status.stamina"
              full
              right
            />
          </label>

          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Moral</span>
            </div>
            <Stamina
              class="my-auto"
              :value="selectedPlayer.status.morale"
              full
              right
            />
          </label>
        </template>

        <button
          class="btn btn-sm btn-primary sm:col-start-5 mt-auto"
          :disabled="!selectedPlayerId"
          @click="addPlayerToTraining"
        >
          Adicionar
        </button>
      </div>

      <div v-if="selectedPlayer" class="mt-4 space-y-2 pt-3">
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-400">
          <div>
            <strong>Foco sugerido:</strong>
            <span
              v-for="focus in positionTrainingSuggestions[
                selectedPlayer.position
              ]"
              :key="focus"
              class="badge badge-outline mx-1"
            >
              {{ focus }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
