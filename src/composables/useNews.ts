import { ref } from "vue";
import { createSharedComposable } from "@vueuse/core";
import axios from "axios";

import type { NewsItem, NewsCategory } from "@/models/news";
import { crudService } from "@/services/crud";

export const useNews = createSharedComposable(() => {
  const news = ref<NewsItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const selectedCategory = ref<NewsCategory | "all">("all");

  async function fetchNews(category: NewsCategory | "all" = "all") {
    loading.value = true;
    error.value = null;
    selectedCategory.value = category;
    try {
      const { data } = await crudService.list<any>("news", { category });
      news.value = data?.data || [];
    } catch (err) {
      console.error(err);
      error.value = "Erro ao carregar notícias.";
    } finally {
      loading.value = false;
    }
  }

  function filterByCategory(category: NewsCategory | "all") {
    selectedCategory.value = category;
    return category === "all"
      ? news.value
      : news.value.filter((n) => n.category === category);
  }

  return {
    news,
    loading,
    error,
    selectedCategory,
    fetchNews,
    filterByCategory,
  };
});
