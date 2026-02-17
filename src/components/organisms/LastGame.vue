<script setup lang="ts">
import BaseCard from "@components/molecules/BaseCard.vue";
import MatchCard from "@components/molecules/MatchCard.vue";
</script>
<template>
  <BaseCard variant="dark" centerTitle>
    <template #title>Último Jogo</template>
    <template #content>
      <div class="flex flex-col items-center text-center gap-2">
        <div class="flex items-center justify-center text-sm gap-4">
          <span>08/02/2026 19:00</span>
          <span>-</span>
          <span>Aflitos</span>
        </div>
        <MatchCard
          size="medium"
          :home="{
            name: 'Náutico',
            color: '#ff0000',
            link: '/equipe/52021',
            score: 4,
          }"
          :away="{
            name: 'Sport',
            color: '#cc0000',
            link: '/equipe/49141',
            score: 0,
          }"
        />
        <RouterLink to="/match" class="btn btn-sm btn-outline w-fit">
          Assistir Reprise
        </RouterLink>
      </div>
    </template>
  </BaseCard>
</template>
