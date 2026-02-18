<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Radar } from "vue-chartjs";

import RatingStars from "@components/molecules/RatingStars.vue";
import PositionTag from "@components/atoms/PositionTag.vue";
import CountryFlag from "@components/atoms/CountryFlag.vue";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import { Attributes, Player } from "@/models/team";
import { PLAYER_ATTRIBUTES } from "@/constants/training";
import { Nautico } from "@/data/teams";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const route = useRoute();
const playerId = computed(() => Number(route.params.id));
const player = computed<Player | null>(() => {
  return Nautico.players.find((p) => p.id === playerId.value) ?? null;
});

const playerHeight = computed(() => {
  const p = player.value;
  return p ? `${(p.height / 100).toFixed(2)}m` : undefined;
});

const radarData = computed(() => {
  if (!player.value) {
    return {
      labels: [],
      datasets: [],
    };
  }

  const coreStats: (keyof Attributes)[] = [
    "pace",
    "shooting",
    "passing",
    "dribbling",
    "defense",
    "physical",
  ];

  const dataValues = coreStats.map((attr) => player.value!.attributes[attr] ?? 0);

  return {
    labels: ["Velocidade", "Chute", "Passe", "Drible", "Defesa", "Físico"],
    datasets: [
      {
        label: player.value.name,
        data: dataValues,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "#3B82F6",
        borderWidth: 2,
        pointBackgroundColor: "#3B82F6",
        pointHoverBackgroundColor: "#60A5FA",
        fill: true,
      },
    ],
  };
});

const radarOptions = {
  scales: {
    r: {
      angleLines: { color: "#444" },
      grid: { color: "#333" },
      pointLabels: {
        color: "#ccc",
        font: { size: 12, family: "Inter, sans-serif" },
      },
      suggestedMin: 0,
      suggestedMax: 100,
      ticks: { display: false },
    },
  },
  plugins: { legend: { display: false } },
};
</script>

<template>
  <div class="p-6" v-if="player">
    <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mb-8">
      <div class="flex flex-col text-center sm:text-left gap-3">
        <h2 class="text-3xl font-bold text-white">
          <span class="text-primary text-lg">{{ player.shirtNumber }}</span>
          {{ player.name }}
        </h2>

        <div class="flex items-center gap-4">
          <PositionTag :position="player.position" />
          <CountryFlag :code="player.nationality" show-name />
          <span>{{ player.age }} anos</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div class="flex items-center justify-between">
              <div class="text-gray-400">Saúde</div>
              <span>{{ player.status.stamina }}%</span>
            </div>
            <progress
              class="progress progress-success w-full"
              :value="player.status.stamina"
              max="100"
            ></progress>
          </div>
          <div>
            <div class="flex items-center justify-between">
              <div class="text-gray-400">Moral</div>
              <span>{{ player.status.morale }}%</span>
            </div>
            <progress
              class="progress progress-warning w-full"
              :value="player.status.morale"
              max="100"
            ></progress>
          </div>
        </div>
        <div class="flex flex-row card bg-base-200">
          <div class="stat">
            <div class="stat-title text-gray-400">Time</div>
            <div class="stat-value text-white">Náutico Capibaribe</div>
          </div>
          <div class="stat">
            <div class="stat-title text-gray-400">Gols</div>
            <div class="stat-value text-white">12</div>
          </div>
          <div class="stat">
            <div class="stat-title text-gray-400">Altura</div>
            <div class="stat-value text-white">{{ playerHeight }}</div>
          </div>
        </div>
      </div>
      <div>
        <div class="card bg-base-200 p-6">
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="stat">
              <div class="stat-title text-gray-400">Salário</div>
              <div class="stat-value text-primary">
                R$
                {{ player.finances.salary.toLocaleString("pt-BR") }}/sem
              </div>
            </div>
            <div class="stat">
              <div class="stat-title text-gray-400">Valor de Passe</div>
              <div class="stat-value text-success">
                R$ {{ player.finances.value.toLocaleString("pt-BR") }}
              </div>
            </div>
            <div class="stat">
              <div class="stat-title text-gray-400">Contrato</div>
              <div class="stat-value text-warning">
                {{ player.finances.contractTime }} Temporadas
              </div>
            </div>
            <div class="stat">
              <div class="stat-title text-gray-400">Nota Média</div>
              <div
                v-if="player.averageRating"
                class="flex w-fit tooltip tooltip-bottom"
                :data-tip="player.averageRating"
              >
                <RatingStars :max="5" :level="player.averageRating" />
              </div>
              <span v-else>Sem avaliações</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="card bg-base-200 p-6 flex flex-col items-center">
        <h3 class="text-lg font-semibold mb-4 text-gray-200">
          Atributos Gerais
        </h3>
        <Radar
          :data="radarData"
          :options="radarOptions"
          class="max-w-[320px]"
        />
      </div>
      <div class="card bg-base-200 p-6">
        <h3 class="text-lg font-semibold mb-4 text-gray-200">
          Estatísticas Individuais
        </h3>
        <div class="space-y-3">
          <div
            v-for="(val, key) in player.attributes"
            :key="key"
            class="flex items-center justify-between gap-3"
          >
            <div class="capitalize text-gray-400 w-32">
              {{ PLAYER_ATTRIBUTES[key]?.title || key }}
            </div>
            <div
              class="flex-1 h-3 bg-gray-700 tooltip tooltip-bottom rounded-full mx-2"
              :data-tip="PLAYER_ATTRIBUTES[key]?.description || 'Sem descrição'"
            >
              <div
                class="h-full bg-primary rounded-full transition-all duration-500"
                :style="{ width: val + '%' }"
              ></div>
            </div>
            <div class="text-sm font-semibold text-gray-200">{{ val }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="p-8 text-center text-gray-400">
    Jogador não encontrado.
  </div>
</template>

<style scoped>
.stat-value {
  font-size: 1.1rem;
}
</style>
