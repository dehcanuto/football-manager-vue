<script setup lang="ts">
import { ref, computed } from "vue";

import { categories, categoryInfo } from "@/constants/news";
import { last_news } from "@/data/last_news";

const selectedCategory = ref("all");
const searchQuery = ref("");

const news = ref(last_news);

const filteredNews = computed(() => {
  return news.value.filter((n) => {
    const matchCategory =
      selectedCategory.value === "all" || n.category === selectedCategory.value;
    const matchSearch = n.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    return matchCategory && matchSearch;
  });
});
</script>

<template>
  <div class="p-6 space-y-6">
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-100">🗞️ Sala de Imprensa</h1>
        <p class="text-sm text-gray-400">
          Fique por dentro das últimas notícias e acontecimentos do futebol.
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <select
          v-model="selectedCategory"
          class="select select-sm select-bordered bg-base-100 text-gray-200"
        >
          <option v-for="(info, key) in categoryInfo" :key="key" :value="key">
            {{ info.name }}
          </option>
        </select>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar..."
          class="input input-sm input-bordered w-48 bg-base-100 text-gray-200"
        />
      </div>
    </div>
    <div
      v-if="filteredNews.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="n in filteredNews"
        :key="n.id"
        class="card bg-base-200 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
      >
        <div class="card-body p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="badge" :class="categoryInfo[n.category].color">
              {{ categoryInfo[n.category].name }}
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
