<script setup lang="ts">
import { saudacao } from "@/misc";
import { useAuthStore } from "@/stores/auth";

import MyTeam from "@components/organisms/MyTeam.vue";
import NewsSlide from "@components/organisms/NewsSlide.vue";
import NextGame from "@components/organisms/NextGame.vue";
import LastGame from "@components/organisms/LastGame.vue";
import NextGames from "@components/organisms/NextGames.vue";
import LastGames from "@components/organisms/LastGames.vue";
import MessagesCard from "@components/organisms/MessagesCard.vue";
import RankingTable from "@components/organisms/RankingTable.vue";

const authStore = useAuthStore()
</script>

<template>
  <div class="flex flex-col p-6 gap-4">
    <h2 v-if="authStore?.getMe" class="text-bold text-2xl mb-2">
      {{ saudacao() }} <span class="text-primary">{{ authStore.getMe.name }}</span>, bem vindo de
      volta.
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
      <MyTeam />
      <NewsSlide />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-5 items-center gap-4">
      <MessagesCard class="col-span-2" />
      <NextGame class="col-span-3" />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-5 gap-4">
      <div class="flex flex-col col-span-2 gap-4">
        <LastGame />
        <LastGames />
        <NextGames />
      </div>
      <RankingTable class="col-span-3" />
    </div>
  </div>
</template>
