<script setup lang="ts">
import { ref, computed } from "vue";

const categories = ["All", "Transfers", "Results", "Fans", "Management"];

const selectedCategory = ref("All");
const searchQuery = ref("");

const news = ref([
  {
    id: 1,
    title: "Náutico anuncia reforço de peso",
    text: "O atacante Pedro Henrique, ex-Sport, assina contrato de 2 anos com o Timbu.",
    date: "2026-02-12",
    category: "Transfers",
    image: "/news/pedro-henrique.jpg",
  },
  {
    id: 2,
    title: "Vitória épica na Arena",
    text: "Náutico vence o Santa Cruz por 3x2 nos acréscimos e assume a liderança.",
    date: "2026-02-10",
    category: "Results",
    image: "/news/arena-vitoria.jpg",
  },
  {
    id: 3,
    title: "Torcida organizada faz festa antes do clássico",
    text: "Milhares de torcedores recepcionam o ônibus do time com fogos e bandeiras.",
    date: "2026-02-09",
    category: "Fans",
    image: "/news/torcida.jpg",
  },
  {
    id: 4,
    title: "Diretoria planeja modernização do CT",
    text: "Projeto prevê novos campos e centro de recuperação física para os atletas.",
    date: "2026-02-08",
    category: "Management",
    image: "/news/ct-modernizacao.jpg",
  },
]);

const filteredNews = computed(() => {
  return news.value.filter((n) => {
    const matchCategory =
      selectedCategory.value === "All" || n.category === selectedCategory.value;
    const matchSearch = n.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    return matchCategory && matchSearch;
  });
});

const categoryColors = {
  Transfers: "badge-primary",
  Results: "badge-success",
  Fans: "badge-warning",
  Management: "badge-info",
  All: "badge-neutral",
};
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-100">🗞️ Sala de Imprensa</h1>
        <p class="text-sm text-gray-400">
          Fique por dentro das últimas notícias e acontecimentos do futebol.
        </p>
      </div>

      <!-- Filtros -->
      <div class="flex flex-wrap items-center gap-2">
        <div class="join">
          <button
            v-for="c in categories"
            :key="c"
            class="join-item btn btn-sm"
            :class="{
              'btn-active': selectedCategory === c,
              'btn-outline': selectedCategory !== c,
            }"
            @click="selectedCategory = c"
          >
            {{ c }}
          </button>
        </div>

        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar..."
          class="input input-sm input-bordered w-48"
        />
      </div>
    </div>

    <!-- News List -->
    <div
      v-if="filteredNews.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="n in filteredNews"
        :key="n.id"
        class="card bg-base-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
      >
        <figure class="h-40 w-full overflow-hidden">
          <img
            :src="n.image"
            :alt="n.title"
            class="object-cover w-full h-full"
          />
        </figure>

        <div class="card-body p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="badge" :class="categoryColors[n.category]">
              {{ n.category }}
            </div>
            <span class="text-xs text-gray-400">
              {{ new Date(n.date).toLocaleDateString("pt-BR") }}
            </span>
          </div>

          <h3 class="card-title text-base text-gray-100">{{ n.title }}</h3>
          <p class="text-sm text-gray-400 mb-3">{{ n.text }}</p>

          <div class="card-actions justify-end">
            <button class="btn btn-xs btn-outline">Ler mais</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-20 text-gray-500">
      <div class="text-6xl mb-4">🗯️</div>
      <p>Nenhuma notícia encontrada.</p>
      <p class="text-sm text-gray-400">Tente ajustar o filtro ou a busca.</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
