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
  <BaseCard variant="messageImage" class="h-full">
    <template #title>Mensagens</template>
    <template #content>
      <ul class="flex flex-col">
        <li v-for="message in messages" class="flex flex-col -mx-4">
          <div class="relative flex flex-row items-center p-2">
            <div
              class="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold flex-shrink-0"
            >
              <Icon :name="message.type" />
            </div>
            <div class="flex flex-col flex-grow ml-3 mr-10 gap-1">
              <div class="text-primary text-sm font-medium">
                {{ message.title }} <span class="text-white/50 text-xs">• {{ formatRelative(message.createdAt) }}</span>
              </div>
              <div class="text-xs">{{ message.content }}</div>
              <div class="text-xs text-gray-500">
              {{ formatFull(message.createdAt) }}
            </div>
            </div>
          </div>
        </li>
      </ul>
    </template>
  </BaseCard>
</template>
