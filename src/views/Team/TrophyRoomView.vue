<script setup lang="ts">
import { ref, computed } from "vue";

const trophies = ref([
  {
    id: 1,
    name: "Campeonato Pernambucano",
    year: 2024,
    type: "🥇",
    description: "Título estadual conquistado com 5 pontos de vantagem.",
  },
  {
    id: 2,
    name: "Série B do Brasileirão",
    year: 2025,
    type: "🥇",
    description: "Campanha sólida garantindo o acesso com 70 pontos.",
  },
  {
    id: 3,
    name: "Copa do Nordeste",
    year: 2023,
    type: "🥈",
    description: "Vice-campeonato após uma final disputada nos pênaltis.",
  },
]);

const records = ref([
  { label: "Maior vitória", value: "7x1 vs Afogados (2024)" },
  { label: "Artilheiro histórico", value: "Marcelo Ajul (112 gols)" },
  { label: "Temporadas disputadas", value: 22 },
  { label: "Títulos totais", value: 6 },
  { label: "Melhor campanha", value: "Série B 2025 (70 pts)" },
]);

const stats = computed(() => ({
  total: trophies.value.length,
  gold: trophies.value.filter((t) => t.type === "🥇").length,
  silver: trophies.value.filter((t) => t.type === "🥈").length,
  bronze: trophies.value.filter((t) => t.type === "🥉").length,
}));
</script>

<template>
  <div class="p-6 space-y-10">
    <!-- Header -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-100">🏟️ Sala de Troféus</h1>
        <p class="text-sm text-gray-400">
          Reviva as grandes conquistas e recordes da história do clube.
        </p>
      </div>

      <div class="stats bg-base-200 shadow">
        <div class="stat">
          <div class="stat-title text-gray-400">Total</div>
          <div class="stat-value text-primary">{{ stats.total }}</div>
        </div>
        <div class="stat">
          <div class="stat-title text-gray-400">🥇 Ouro</div>
          <div class="stat-value text-yellow-400">{{ stats.gold }}</div>
        </div>
        <div class="stat">
          <div class="stat-title text-gray-400">🥈 Prata</div>
          <div class="stat-value text-gray-300">{{ stats.silver }}</div>
        </div>
        <div class="stat">
          <div class="stat-title text-gray-400">🥉 Bronze</div>
          <div class="stat-value text-amber-600">{{ stats.bronze }}</div>
        </div>
      </div>
    </div>

    <!-- Trophies -->
    <section>
      <h2 class="text-lg font-semibold text-gray-200 mb-4">
        Troféus Conquistados
      </h2>

      <div v-if="trophies.length" class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div
          v-for="trophy in trophies"
          :key="trophy.id"
          class="card bg-base-200 p-4 text-center hover:scale-[1.02] transition-transform"
        >
          <div class="text-5xl mb-3">{{ trophy.type }}</div>
          <h3 class="font-semibold text-gray-100 text-lg">
            {{ trophy.name }}
          </h3>
          <p class="text-sm text-gray-400 mb-1">Ano: {{ trophy.year }}</p>
          <p class="text-xs text-gray-500">{{ trophy.description }}</p>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 py-20">
        <div class="text-6xl mb-4">😔</div>
        <p>Nenhum troféu conquistado... ainda!</p>
        <p class="text-sm text-gray-400">
          Leve seu time à glória para encher esta sala.
        </p>
      </div>
    </section>

    <!-- Records -->
    <section>
      <h2 class="text-lg font-semibold text-gray-200 mb-4">
        Recordes do Clube
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="record in records"
          :key="record.label"
          class="card bg-base-200 p-4"
        >
          <h4 class="font-semibold text-gray-100">{{ record.label }}</h4>
          <p class="text-sm text-gray-400">{{ record.value }}</p>
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
