<script setup lang="ts">
import { computed, onMounted } from "vue";

import FieldInfo from "@components/molecules/FieldInfo.vue";
import BaseCard from "@components/molecules/BaseCard.vue";
import { useTeam } from "@/composables/team";
import { formatNumber, getMoraleStatus, MoneyFormat } from "@/misc";

const { loading, myTeam, teamInfos } = useTeam();

const supporters = computed(() => formatNumber(myTeam?.value?.supporters || 0));
const balance = computed(() => MoneyFormat(myTeam?.value?.balance || 0));
const morale = computed(() => `${myTeam?.value?.morale || 0}%`);

onMounted(teamInfos);
</script>
<template>
  <BaseCard>
    <template #title>Meu Time</template>
    <template #content>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="p-2 py-4 bg-base-100 rounded-xl">
          <div class="flex flex-col items-center text-center gap-3 mt-4">
            <div
              class="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center overflow-hidden shrink-0"
              :style="{ backgroundColor: myTeam?.colors.primary }"
            >
              <span class="text-2xl text-white font-bold">{{
                myTeam?.abbreviation
              }}</span>
            </div>
            <h2 class="text-2xl text-white font-bold">{{ myTeam?.name }}</h2>
          </div>
        </div>
        <div class="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FieldInfo
            label="Estádio"
            :value="myTeam?.stadium"
            :loading="loading.teamInfos"
          />
          <FieldInfo
            label="Torcedores"
            :value="supporters"
            :loading="loading.teamInfos"
          />
          <FieldInfo
            label="Saldo"
            :value="balance"
            :loading="loading.teamInfos"
          />
          <div v-if="myTeam" class="flex flex-col justify-center">
            <span class="text-sm">Moral</span>
            <span 
              class="w-fit tooltip tooltip-primary tooltip-bottom"
              :data-tip="getMoraleStatus(myTeam.morale).label"
              :class="getMoraleStatus(myTeam.morale).color">
              {{ morale }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </BaseCard>
</template>
