<script setup lang="ts">
import { ref } from "vue";

import RatingStars from "@components/molecules/RatingStars.vue";

const stadium = ref({
  name: "Estádio dos Aflitos",
  capacity: 18500,
  ticketPrice: 80,
  sponsors: [
    { name: "Caixa", value: 500000, logo: "/sponsors/caixa.png" },
    { name: "Umbro", value: 250000, logo: "/sponsors/umbro.png" },
    { name: "Brahma", value: 180000, logo: "/sponsors/brahma.png" },
  ],
});

const club = ref({
  cash: 5_200_000,
  fans: 82000,
});

const facilities = ref([
  {
    name: "Centro de Formação",
    description:
      "Forma novos talentos da base, melhorando a qualidade dos jovens jogadores.",
    level: 2,
    max: 5,
    icon: "🎓",
  },
  {
    name: "Centro de Fisioterapia",
    description: "Reduz o tempo de recuperação dos atletas lesionados.",
    level: 3,
    max: 5,
    icon: "💉",
  },
  {
    name: "Centro de Treinamento",
    description:
      "Aumenta a performance dos jogadores e acelera o ganho de atributos.",
    level: 4,
    max: 5,
    icon: "⚽",
  },
]);
</script>

<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-100">{{ stadium.name }}</h1>
        <p class="text-sm text-gray-400">
          Capacidade atual:
          <span class="text-primary font-semibold">{{
            stadium.capacity.toLocaleString()
          }}</span>
          torcedores
        </p>
      </div>

      <div class="flex gap-3">
        <div class="card bg-base-200 p-3">
          <p class="text-xs text-gray-400">💰 Caixa</p>
          <p class="text-lg font-bold text-success">
            R$ {{ club.cash.toLocaleString("pt-BR") }}
          </p>
        </div>
        <div class="card bg-base-200 p-3">
          <p class="text-xs text-gray-400">👥 Torcida</p>
          <p class="text-lg font-bold text-primary">
            {{ club.fans.toLocaleString("pt-BR") }}
          </p>
        </div>
        <div class="card bg-base-200 p-3">
          <p class="text-xs text-gray-400">🎟️ Ingresso</p>
          <p class="text-lg font-bold text-warning">
            R$ {{ stadium.ticketPrice.toFixed(2) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Facilities -->
    <section>
      <h2 class="text-lg font-semibold text-gray-200 mb-4">Infraestrutura</h2>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          v-for="facility in facilities"
          :key="facility.name"
          class="card bg-base-200 p-5 flex flex-col gap-3"
        >
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-gray-100 flex items-center gap-2">
              <span class="text-xl">{{ facility.icon }}</span>
              {{ facility.name }}
            </h3>

            <RatingStars :max="facility.max" :level="facility.level" />
          </div>

          <p class="text-sm text-gray-400">{{ facility.description }}</p>

          <progress
            class="progress progress-primary w-full"
            :value="facility.level"
            :max="facility.max"
          ></progress>

          <button
            class="btn btn-sm btn-outline mt-auto"
            :disabled="facility.level >= facility.max"
          >
            ↑ Melhorar Instalação
          </button>
        </div>
      </div>
    </section>

    <!-- Sponsors -->
    <section>
      <h2 class="text-lg font-semibold text-gray-200 mb-4">Patrocinadores</h2>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          v-for="sponsor in stadium.sponsors"
          :key="sponsor.name"
          class="card bg-base-200 p-4 flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <img
              :src="sponsor.logo"
              alt="Logo"
              class="w-10 h-10 rounded-md object-contain bg-white p-1"
            />
            <div>
              <p class="font-semibold text-gray-100">{{ sponsor.name }}</p>
              <p class="text-xs text-gray-400">
                Contrato: R$
                {{ sponsor.value.toLocaleString("pt-BR") }}
              </p>
            </div>
          </div>

          <button class="btn btn-xs btn-outline btn-success">Renovar</button>
        </div>
      </div>
    </section>

    <!-- Bottom Summary -->
    <section class="mt-6">
      <div
        class="card bg-base-200 p-4 flex flex-col sm:flex-row justify-between items-center gap-3"
      >
        <div class="text-center sm:text-left">
          <h3 class="font-semibold text-gray-100">Rendimento médio por jogo</h3>
          <p class="text-sm text-gray-400">
            Com ingresso a R$ {{ stadium.ticketPrice }}, estádio cheio gera:
          </p>
        </div>

        <div class="text-primary font-bold text-2xl">
          R$
          {{ (stadium.capacity * stadium.ticketPrice).toLocaleString("pt-BR") }}
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
