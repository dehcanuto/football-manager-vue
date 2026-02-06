<script setup lang="ts">
import { RouterView } from "vue-router";

import Header from "@components/organisms/Header.vue";
</script>
<template>
  <Header />
  <div class="max-w-7xl mx-auto lg:px-8">
    <RouterView />
  </div>
</template>
