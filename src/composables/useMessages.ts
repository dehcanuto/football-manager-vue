import { ref } from "vue";
import { createSharedComposable } from "@vueuse/core";
import axios from "axios";
import { MessagesType } from "@/models/messages";
import { crudService } from "@/services/crud";

export const useMessages = createSharedComposable(() => {
  const messages = ref<MessagesType[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchMessages() {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await crudService.list<any>("team-messages");
      messages.value = data || [];
    } catch (err) {
      console.error(err);
      error.value = "Erro ao carregar mensagens do time.";
    } finally {
      loading.value = false;
    }
  }

  // Exemplo extra: filtrar mensagens por tipo (sistema, jogador, finanças, etc.)
  function getMessagesByType(type: string) {
    return messages.value.filter((m) => m.type === type);
  }

  // Se quiser marcar como lida (futuro)
  function markAsRead(id: number) {
    const msg = messages.value.find((m) => m.id === id);
    if (msg) msg.read = true;
  }

  return {
    messages,
    loading,
    error,
    fetchMessages,
    getMessagesByType,
    markAsRead,
  };
});
