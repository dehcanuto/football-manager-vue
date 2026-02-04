<template>
  <div
    class="min-h-screen p-6 bg-center bg-repeat bg-[url('@/assets/images/grass.png')] bg-[length:300px_300px]"
  >
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-3">
        <TeamPanel :team="awayTeam" />
        <div class="mt-2 text-center">
          <button
            class="mt-2 px-3 py-2 bg-white rounded border"
            @click="openTactics(awayTeam)"
          >
            Escalação / Tática (Visitante)
          </button>
        </div>
      </div>

      <div class="col-span-6 bg-white rounded shadow p-4">
        <h1 class="text-2xl font-bold text-center mb-6">
          Footbal Manager — Clássico Recife Edition
        </h1>
        <div
          class="flex items-center justify-between bg-slate-100 p-3 mb-3 rounded-lg"
        >
          <div class="text-center">
            <div class="text-sm text-gray-500">Visitante</div>
            <div class="text-2xl font-bold">
              {{ awayTeam.name }}
            </div>
          </div>

          <div class="flex items-center text-center gap-10">
            <span class="text-4xl font-light">{{ score.away }}</span>
            <div class="text-center">
              <div class="text-sm text-gray-500">Tempo</div>
              <div class="text-xl font-semibold">{{ minute }}'</div>
              <div class="text-sm text-gray-500">{{ statusMsg }}</div>
            </div>
            <span class="text-4xl font-light">{{ score.home }}</span>
          </div>

          <div class="text-center">
            <div class="text-sm text-gray-500">Casa</div>
            <div class="text-2xl font-bold">
              {{ homeTeam.name }}
            </div>
          </div>
        </div>

        <div class="text-center mb-3">
          <button
            v-if="!playing && minute === 0"
            @click="startMatch"
            class="bg-green-600 text-white px-4 py-2 rounded"
          >
            Iniciar partida
          </button>
          <button
            v-if="!playing && !matchEnded && firstHalf && minute >= 45"
            @click="openTactics(homeTeam)"
            class="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Iniciar segundo tempo (Abrir táticas)
          </button>
          <button
            v-if="matchEnded"
            @click="startMatch"
            class="bg-green-600 text-white px-4 py-2 rounded"
          >
            Recomeçar
          </button>
        </div>

        <div class="h-96 overflow-y-auto bg-slate-50 p-2 rounded">
          <div v-for="(event, i) in log" :key="i" class="border-b pb-1">
            <span class="text-gray-500 text-sm">{{ event.minute }}’</span>
            <span class="ml-2">{{ event.text }}</span>
          </div>
        </div>
      </div>

      <div class="col-span-3">
        <TeamPanel :team="homeTeam" />
        <div class="mt-2 text-center">
          <button
            class="mt-2 px-3 py-2 bg-white rounded border"
            @click="openTactics(homeTeam)"
          >
            Escalação / Tática (Mandante)
          </button>
        </div>
      </div>
    </div>

    <TeamTacticsModal
      v-if="showModal && modalTeam"
      :team="modalTeam"
      @close="closeModal"
      @apply="applyTactics"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TeamPanel from "@components/TeamPanel.vue";
import TeamTacticsModal from "@components/TeamTacticsModal.vue";
import { simulateMinute } from "@/utils/matchEngine";
import { Sport, Nautico } from "@/data/teams";
import type { EventResult, Team } from "@/types";

const homeTeam = ref<Team>({ ...Nautico });
const awayTeam = ref<Team>({ ...Sport });

const minute = ref(0);
const playing = ref(false);
const firstHalf = ref(true);
const matchEnded = ref(false);
const log = ref<EventResult[]>([]);
const score = ref({ home: 0, away: 0 });
const statusMsg = ref("Pronto para começar?");

const showModal = ref(false);
const modalTeam = ref<Team | null>(null);

let loop: number | null = null;

function startMatch() {
  // reset
  minute.value = 0;
  log.value = [];
  score.value = { home: 0, away: 0 };
  firstHalf.value = true;
  matchEnded.value = false;
  playing.value = true;
  statusMsg.value = "Primeiro tempo iniciado!";
  // ensure minute loop
  ensureLoop();
}

function ensureLoop() {
  if (loop) return;
  loop = window.setInterval(() => {
    if (playing.value) tick();
  }, 1000);
}

function tick() {
  minute.value++;
  // simulate minute
  const ev = simulateMinute(minute.value, homeTeam.value, awayTeam.value);
  if (ev.text) log.value.unshift(ev);
  if (ev.kind === "goal") {
    if (ev.team === homeTeam.value.name) score.value.home++;
    else if (ev.team === awayTeam.value.name) score.value.away++;
  }

  if (ev.kind === "goal" && ev.playerName) {
    const team =
      ev.team === homeTeam.value.name ? homeTeam.value : awayTeam.value;
    const player = team.players.find((p) => p.name === ev.playerName);
    if (player) player.goals = (player.goals ?? 0) + 1;
  }

  if (ev.kind === "card" && ev.playerName) {
    const team =
      ev.team === homeTeam.value.name ? homeTeam.value : awayTeam.value;
    const player = team.players.find((p) => p.name === ev.playerName);
    if (player) player.yellowCards = (player.yellowCards ?? 0) + 1;
  }

  // stamina decay: titulares per minute (small decay)
  applyStaminaDecay();

  // halftime / fulltime checks
  if (firstHalf.value && minute.value >= 45) {
    playing.value = false;
    statusMsg.value =
      "Intervalo — ajustar escalação/tática e iniciar segundo tempo";
    // note: we do not auto-start; user must open modal and click "Iniciar segundo tempo" (modal's apply triggers resume)
    return;
  }
  if (!firstHalf.value && minute.value >= 90) {
    playing.value = false;
    matchEnded.value = true;
    statusMsg.value = "Fim de jogo!";
    return;
  }
}

function applyStaminaDecay() {
  // reduzir stamina de titulares (mais para times que estão jogando muito)
  [homeTeam.value, awayTeam.value].forEach((team) => {
    team.players.forEach((p) => {
      if (p.starting) {
        // perda base; zagueiros perdem menos por minuto que meias/atacantes
        const posFactor =
          p.position === "GK"
            ? 0.02
            : p.position === "DEF"
              ? 0.6
              : p.position === "MID"
                ? 0.9
                : 1.0;
        p.stamina = Math.max(0, p.stamina - 0.6 * posFactor);
      }
    });
  });
}

function openTactics(team: Team) {
  modalTeam.value = JSON.parse(JSON.stringify(team)); // clone to avoid immediate changes
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  modalTeam.value = null;
}

function applyTactics(newTeam: Team) {
  // find which team was opened and replace
  if (!modalTeam.value) return;
  if (newTeam.name === homeTeam.value.name) {
    homeTeam.value = JSON.parse(JSON.stringify(newTeam));
  } else if (newTeam.name === awayTeam.value.name) {
    awayTeam.value = JSON.parse(JSON.stringify(newTeam));
  }
  showModal.value = false;
  modalTeam.value = null;

  // if we were at interval and home/away changed formation, start second half
  if (
    !playing.value &&
    !matchEnded.value &&
    firstHalf.value &&
    minute.value >= 45
  ) {
    firstHalf.value = false;
    playing.value = true;
    statusMsg.value = "Segundo tempo iniciado!";
  }
}
</script>
