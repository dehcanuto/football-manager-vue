<script setup lang="ts">
import MyTeam from "@components/organisms/MyTeam.vue";
import NewsSlide from "@components/organisms/NewsSlide.vue";
import NextGame from "@components/organisms/NextGame.vue";
import LastGames from "@components/organisms/LastGames.vue";
import MessagesCard from "@components/organisms/MessagesCard.vue";
import RankingTable from "@components/organisms/RankingTable.vue";
</script>

<template>
  <div class="flex flex-col p-6 gap-4">
    <h2 class="text-bold text-2xl mb-2">
      Bom dia <span class="text-primary">John Doe</span>, bem vindo de volta.
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
      <MyTeam />
      <NewsSlide />
      <MessagesCard />
      <NextGame />
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-5 gap-4">
      <LastGames class="col-span-2" />
      <RankingTable class="col-span-3" />
    </div>
  </div>
</template>
