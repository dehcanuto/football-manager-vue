<script setup lang="ts">
import LoginFlow from "@components/organisms/LoginFlow.vue";
</script>
<template>
  <section>
    <div class="grid h-screen sm:grid-cols-2">
      <LoginFlow />
      <div
        class="relative flex items-center justify-center px-4 py-6 bg-center bg-cover text-white bg-[url('@/assets/images/bg-stadium.jpg')] sm:py-0 sm:px-0"
      >
        <div class="absolute inset-0 pointer-events-none bg-black/80"></div>
        <div class="max-w-md sm:max-w-xl text-center z-10">
          <RouterLink
            to="/"
            class="flex items-center mb-4 text-2xl font-semibold text-white"
          >
            <img
              src="/src/assets/images/the-dugout-logo-1x.png"
              class="w-60 mb-5 mx-auto"
              alt="Somatech Logo"
            />
          </RouterLink>
          <h1
            class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-white sm:text-5xl"
          >
            Controle total do seu time, do banco ao gramado.
          </h1>
          <p class="mb-4 font-light text-white/80 sm:mb-8">
            Gerencie jogadores, treinos, táticas e partidas para levar seu clube
            ao topo. Tome decisões estratégicas e veja seu time brilhar em cada
            rodada.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
