<script setup lang="ts">
import BaseCard from "@components/molecules/BaseCard.vue";
</script>
<template>
  <BaseCard centerTitle>
    <template #title>Meu Time</template>
    <template #content>
      <div class="grid grid-cols-1 sm:grid-cols-3 my-3">
        <div class="flex flex-col items-center text-center gap-3 mt-4">
          <div
            class="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center overflow-hidden shrink-0"
            :style="{ backgroundColor: '#ff0000' }"
          >
            <span class="text-2xl text-white font-bold"> N </span>
          </div>
          <h2 class="text-2xl text-white font-bold">Náutico</h2>
        </div>
        <div class="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="flex flex-col justify-center">
            <span class="text-sm">Estádio</span>
            <span class="text-lg text-white">Aflitos</span>
          </div>
          <div class="flex flex-col justify-center">
            <span class="text-sm">Torcedores</span>
            <span class="text-lg text-white">1.322.255</span>
          </div>
          <div class="flex flex-col justify-center">
            <span class="text-sm">Saldo</span>
            <span class="text-lg text-white">R$ 2.245.122,68</span>
          </div>
          <div class="flex flex-col justify-center">
            <span class="text-sm">Moral</span>
            <span class="text-lg text-green-400">98%</span>
          </div>
        </div>
      </div>
    </template>
  </BaseCard>
</template>
