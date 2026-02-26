<script setup lang="ts">
import { onMounted } from "vue";

import { formatFull, formatRelative } from "@/misc";
import { useMessages } from "@/composables/useMessages";

import BaseCard from "@components/molecules/BaseCard.vue";
import Icon from "@components/atoms/Icon.vue";

const { messages, loading, fetchMessages } = useMessages();

onMounted(fetchMessages);
</script>
<template>
  <BaseCard variant="messageImage">
    <template #title>Mensagens</template>
    <template #content>
      <ul class="flex flex-col">
        <li v-for="message in messages" class="flex flex-col -mx-4">
          <div class="relative flex flex-row items-center p-2">
            <div class="absolute text-xs text-gray-500 right-0 top-0 mr-4 mt-3">
              {{ formatFull(message.createdAt) }}
            </div>
            <div
              class="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold flex-shrink-0"
            >
              <Icon :name="message.type" />
            </div>
            <div class="flex flex-col flex-grow ml-3 mr-10 gap-1">
              <div class="text-primary text-sm font-medium">
                {{ message.title }} • {{ formatRelative(message.createdAt) }}
              </div>
              <div class="text-xs">{{ message.content }}</div>
            </div>
          </div>
        </li>
      </ul>
    </template>
  </BaseCard>
</template>
