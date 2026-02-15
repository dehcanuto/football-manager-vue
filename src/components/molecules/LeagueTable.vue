<script setup lang="ts">
interface Team {
  position: number;
  name: string;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  logo?: string;
}

const props = defineProps<{
  season?: number;
  teams: Team[];
  promoted?: number;
  relegated?: number;
}>();

const getTeamStatusColor = (position: number): string => {
  if (props.promoted && position <= props.promoted) return "#3b82f6";
  if (props.relegated && position > props.teams.length - props.relegated) return "#ef4444";
  return "transparent";
};
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table w-full text-sm">
      <thead>
        <tr class="text-gray-400">
          <th class="w-8 text-center">#</th>
          <th>Clube</th>
          <th class="text-center">Pts</th>
          <th class="text-center">PJ</th>
          <th class="text-center">VIT</th>
          <th class="text-center">E</th>
          <th class="text-center">DER</th>
          <th class="text-center">GM</th>
          <th class="text-center">GC</th>
          <th class="text-center">SG</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="team in teams"
          :key="team.position"
          class="hover:bg-base-200 transition-colors"
        >
          <td class="text-center font-semibold text-primary">
            {{ team.position }}
          </td>

          <td class="flex items-center gap-2">
            <div
              class="h-5 w-1 -ml-2.5 rounded-full"
              :style="{ backgroundColor: getTeamStatusColor(team.position) }"
            ></div>

            <img
              v-if="team.logo"
              :src="team.logo"
              alt="Logo"
              class="w-6 h-6 rounded-full object-cover"
            />
            <span>{{ team.name }}</span>
          </td>

          <td class="text-center font-bold">{{ team.points }}</td>
          <td class="text-center">{{ team.played }}</td>
          <td class="text-center">{{ team.wins }}</td>
          <td class="text-center">{{ team.draws }}</td>
          <td class="text-center">{{ team.losses }}</td>
          <td class="text-center">{{ team.goalsFor }}</td>
          <td class="text-center">{{ team.goalsAgainst }}</td>
          <td
            class="text-center font-semibold"
            :class="
              team.goalDifference > 0
                ? 'text-green-400'
                : team.goalDifference < 0
                ? 'text-red-400'
                : 'text-gray-300'
            "
          >
            {{ team.goalDifference }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
