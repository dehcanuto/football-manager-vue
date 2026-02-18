<script setup lang="ts">
import { reactive, computed } from "vue";

import BaseTitle from "@/components/molecules/BaseTitle.vue";

interface SubRule {
  id: number;
  condition: "winning" | "losing" | "draw" | "time" | "stamina";
  minute?: number;
  staminaBelow?: number;
  playerOut: string;
  playerIn: string;
}

const tactics = reactive({
  mentality: "balanced",
  focus: "middle",
  passingStyle: "mixed",
  pressure: "normal",
  width: "balanced",
  tempo: "normal",
});

const subs = reactive<SubRule[]>([
  {
    id: 1,
    condition: "losing",
    playerOut: "Volante",
    playerIn: "Atacante",
  },
]);

function addSubRule() {
  subs.push({
    id: Date.now(),
    condition: "time",
    minute: 70,
    playerOut: "",
    playerIn: "",
  });
}

function removeSubRule(id: number) {
  const index = subs.findIndex((r) => r.id === id);
  if (index !== -1) subs.splice(index, 1);
}

const mentalityColors = computed(() => ({
  defensive: "btn-info",
  balanced: "btn-neutral",
  offensive: "btn-error",
}));
</script>

<template>
  <div class="p-6 space-y-8">
    <BaseTitle
      title="Táticas do Time"
      subtitle="Defina a filosofia de jogo e os planos de substituição automáticos."
    />

    <!-- Game Plan -->
    <div class="card bg-base-200 p-6 space-y-4">
      <h3 class="text-lg font-semibold text-gray-100 mb-2">Plano de Jogo</h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Mentalidade -->
        <div>
          <label class="block text-sm text-gray-400 mb-1">Mentalidade</label>
          <div class="flex gap-2">
            <button
              class="btn btn-sm flex-1"
              :class="
                tactics.mentality === 'defensive' ? 'btn-info' : 'btn-outline'
              "
              @click="tactics.mentality = 'defensive'"
            >
              Defensiva
            </button>
            <button
              class="btn btn-sm flex-1"
              :class="
                tactics.mentality === 'balanced' ? 'btn-neutral' : 'btn-outline'
              "
              @click="tactics.mentality = 'balanced'"
            >
              Balanceada
            </button>
            <button
              class="btn btn-sm flex-1"
              :class="
                tactics.mentality === 'offensive' ? 'btn-error' : 'btn-outline'
              "
              @click="tactics.mentality = 'offensive'"
            >
              Ofensiva
            </button>
          </div>
        </div>

        <!-- Foco de jogo -->
        <div>
          <label class="block text-sm text-gray-400 mb-1">Foco de Ataque</label>
          <select v-model="tactics.focus" class="select select-sm w-full">
            <option value="middle">Pelo meio</option>
            <option value="wings">Pelas pontas</option>
            <option value="mixed">Misto</option>
          </select>
        </div>

        <!-- Estilo de passe -->
        <div>
          <label class="block text-sm text-gray-400 mb-1"
            >Estilo de Passe</label
          >
          <select
            v-model="tactics.passingStyle"
            class="select select-sm w-full"
          >
            <option value="short">Curtos</option>
            <option value="long">Longos</option>
            <option value="mixed">Misto</option>
          </select>
        </div>

        <!-- Pressão -->
        <div>
          <label class="block text-sm text-gray-400 mb-1">Pressão</label>
          <select v-model="tactics.pressure" class="select select-sm w-full">
            <option value="low">Baixa</option>
            <option value="normal">Normal</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <!-- Largura -->
        <div>
          <label class="block text-sm text-gray-400 mb-1"
            >Largura do Time</label
          >
          <select v-model="tactics.width" class="select select-sm w-full">
            <option value="narrow">Fechado</option>
            <option value="balanced">Equilibrado</option>
            <option value="wide">Aberto</option>
          </select>
        </div>

        <!-- Ritmo -->
        <div>
          <label class="block text-sm text-gray-400 mb-1">Ritmo de Jogo</label>
          <select v-model="tactics.tempo" class="select select-sm w-full">
            <option value="slow">Lento</option>
            <option value="normal">Normal</option>
            <option value="fast">Rápido</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Substituições automáticas -->
    <div class="card bg-base-200 p-6 space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-100">
          Planos de Substituição
        </h3>
        <button class="btn btn-sm btn-primary" @click="addSubRule">
          + Adicionar Regra
        </button>
      </div>

      <p class="text-sm text-gray-400 mb-3">
        Configure substituições automáticas baseadas em condições de jogo.
      </p>

      <div class="space-y-3">
        <div
          v-for="rule in subs"
          :key="rule.id"
          class="flex flex-col md:flex-row md:items-center gap-3 bg-base-300 p-3 rounded-lg"
        >
          <div class="flex-1 flex flex-wrap gap-3 items-center">
            <select v-model="rule.condition" class="select select-sm w-36">
              <option value="winning">Se estiver ganhando</option>
              <option value="losing">Se estiver perdendo</option>
              <option value="draw">Se estiver empatando</option>
              <option value="time">Em minuto específico</option>
              <option value="stamina">Se jogador cansar</option>
            </select>

            <div
              v-if="rule.condition === 'time'"
              class="flex items-center gap-2"
            >
              <span class="text-gray-400 text-sm">Minuto:</span>
              <input
                v-model.number="rule.minute"
                type="number"
                min="1"
                max="90"
                class="input input-sm w-20"
              />
            </div>

            <div
              v-if="rule.condition === 'stamina'"
              class="flex items-center gap-2"
            >
              <span class="text-gray-400 text-sm">Abaixo de:</span>
              <input
                v-model.number="rule.staminaBelow"
                type="number"
                min="0"
                max="100"
                class="input input-sm w-20"
              />
              <span class="text-gray-400 text-sm">%</span>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-gray-400 text-sm">Sai:</span>
              <input
                v-model="rule.playerOut"
                placeholder="Nome ou posição"
                class="input input-sm w-32"
              />
            </div>

            <div class="flex items-center gap-2">
              <span class="text-gray-400 text-sm">Entra:</span>
              <input
                v-model="rule.playerIn"
                placeholder="Nome ou posição"
                class="input input-sm w-32"
              />
            </div>
          </div>

          <button
            class="btn btn-sm btn-error md:ml-auto"
            @click="removeSubRule(rule.id)"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
