<script setup lang="ts">
import { TeamRankingType } from '@/models/team';
import BaseTable, { ColumnType } from '@components/molecules/BaseTable.vue';

const props = defineProps<{
  season?: number;
  teams: TeamRankingType[];
  promoted?: number;
  relegated?: number;
}>();

const columns: ColumnType[] = [
  { key: "position", label: "#", align: "center", width: "40px" },
  { key: "name", label: "Clube" },
  { key: "points", label: "Pts", align: "center" },
  { key: "played", label: "PJ", align: "center" },
  { key: "wins", label: "VIT", align: "center" },
  { key: "draws", label: "E", align: "center" },
  { key: "losses", label: "DER", align: "center" },
  { key: "goalsFor", label: "GM", align: "center" },
  { key: "goalsAgainst", label: "GC", align: "center" },
  { key: "goalDifference", label: "SG", align: "center" },
];

const getTeamStatusColor = (position: number): string => {
  if (props.promoted && position <= props.promoted) return "#3b82f6";
  if (props.relegated && position > props.teams.length - props.relegated)
    return "#ef4444";
  return "transparent";
};
</script>

<template>
  <BaseTable :columns="columns" :rows="teams" hoverable>
    <template #cell-name="{ row }">
      <div class="flex items-center gap-2">
        <div
          class="h-5 w-1 -ml-2.5 rounded-full"
          :style="{ backgroundColor: getTeamStatusColor(row.position) }"
        ></div>
        <img
          v-if="row.logo"
          :src="row.logo"
          alt="Logo"
          class="w-6 h-6 rounded-full object-cover"
        />
        <span>{{ row.name }}</span>
      </div>
    </template>
    <template #cell-goalDifference="{ row }">
      <span
        :class="
          row.goalDifference > 0
            ? 'text-green-400 font-semibold'
            : row.goalDifference < 0
              ? 'text-red-400 font-semibold'
              : 'text-gray-300 font-semibold'
        "
      >
        {{ row.goalDifference }}
      </span>
    </template>
  </BaseTable>
</template>
