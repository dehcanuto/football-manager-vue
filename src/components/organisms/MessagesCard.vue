<script setup lang="ts">
import BaseCard from "@components/molecules/BaseCard.vue";
import Icon from "@components/atoms/Icon.vue";

import { last_messages } from "@/data/last_messages";
</script>
<template>
  <BaseCard variant="messageImage">
    <template #title>Mensagens</template>
    <template #content>
      <ul class="flex flex-col">
        <li v-for="message in last_messages" class="flex flex-col -mx-4">
          <div class="relative flex flex-row items-center p-2">
            <div class="absolute text-xs text-gray-500 right-0 top-0 mr-4 mt-3">
              {{ message.date }}
            </div>
            <div
              class="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold flex-shrink-0"
            >
              <Icon :name="message.icon" />
            </div>
            <div class="flex flex-col flex-grow ml-3 mr-10 gap-1">
              <div class="text-primary text-sm font-medium">
                {{ message.title }}
              </div>
              <div class="text-xs">{{ message.text }}</div>
            </div>
          </div>
        </li>
      </ul>
    </template>
  </BaseCard>
</template>
