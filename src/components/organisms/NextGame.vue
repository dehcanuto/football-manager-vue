<script setup lang="ts">
import BaseCard from "@components/molecules/BaseCard.vue";
import MatchCard from "@components/molecules/MatchCard.vue";
</script>
<template>
  <BaseCard variant="glass" centerTitle>
    <template #title>Próximo Jogo</template>
    <template #content>
      <div class="text-center">
        <span>09/02/2026 19:00</span>
        <MatchCard
          :home="{
            name: 'Náutico',
            color: '#ff0000',
            link: '/equipe/52021',
          }"
          :away="{
            name: 'Sport',
            color: '#cc0000',
            link: '/equipe/49141',
          }"
        />
        <span>Aflitos</span>
      </div>
    </template>
  </BaseCard>
</template>
