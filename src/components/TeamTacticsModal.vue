<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div class="bg-white rounded p-4 w-11/12 max-w-xl">
      <h2 class="text-xl font-bold mb-3">
        Ajustar escalação — {{ team.name }}
      </h2>

      <label class="block mb-2">Formação</label>
      <select v-model="localFormation" class="border p-2 rounded w-full mb-4">
        <option>4-3-3</option>
        <option>4-4-2</option>
        <option>3-5-2</option>
      </select>

      <div class="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto mb-4">
        <div
          v-for="p in localPlayers"
          :key="p.id"
          class="p-2 border rounded flex items-center justify-between"
        >
          <div>
            <div class="font-medium">{{ p.name }}</div>
            <div class="text-xs text-gray-500">
              {{ p.position }} • Sho {{ p.attributes.shooting }}
            </div>
          </div>
          <div class="flex items-center gap-2">
            <label class="text-xs">Titular</label>
            <input type="checkbox" v-model="p.starting" />
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-2">
        <button @click="$emit('close')" class="px-3 py-2 rounded border">
          Cancelar
        </button>
        <button
          @click="apply"
          class="px-3 py-2 rounded bg-green-600 text-white"
        >
          Salvar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Team, Player } from "@/types";
import { reactive } from "vue";
const props = defineProps<{ team: Team }>();
const emit = defineEmits<{
  (e: "close"): void;
  (e: "apply", payload: Team): void;
}>();

const local = reactive({
  formation: props.team.formation,
  players: props.team.players.map((p) => ({ ...p })) as Player[],
});

const localFormation = local.formation;
const localPlayers = local.players;

function apply() {
  const newTeam: Team = {
    ...props.team,
    formation: local.formation as Team["formation"],
    players: local.players.map((p) => ({ ...p })),
  };
  emit("apply", newTeam);
}
</script>
