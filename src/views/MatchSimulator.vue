<script setup lang="ts">
import { ref } from "vue";
import TeamPanel from "@components/TeamPanel.vue";
import { simulateMinute } from "@/utils/matchEngine";
import { Sport, Nautico } from "@/data/teams";
import { EventResult, Team } from "@/models/team";

const homeTeam = ref<Team>({ ...Nautico });
const awayTeam = ref<Team>({ ...Sport });

const minute = ref(0);
const playing = ref(false);
const firstHalf = ref(true);
const matchEnded = ref(false);
const log = ref<EventResult[]>([]);
const score = ref({ home: 0, away: 0 });
const statusMsg = ref("Pronto para começar?");

let loop: number | null = null;

function startMatch() {
  minute.value = 0;
  log.value = [];
  score.value = { home: 0, away: 0 };
  firstHalf.value = true;
  matchEnded.value = false;
  playing.value = true;
  statusMsg.value = "Primeiro tempo iniciado!";
  ensureLoop();
}

function ensureLoop() {
  if (loop) return;
  loop = window.setInterval(() => {
    if (playing.value && !matchEnded.value) tick();
  }, 1000);
}

function stopLoop() {
  if (loop) {
    clearInterval(loop);
    loop = null;
  }
}

function tick() {
  minute.value++;
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

  applyStaminaDecay();

  if (minute.value === 45) {
    statusMsg.value = "Segundo tempo iniciado!";
  }

  if (minute.value >= 90) {
    matchEnded.value = true;
    playing.value = false;
    statusMsg.value = "Fim de jogo!";
    stopLoop();
    return;
  }
}

function applyStaminaDecay() {
  [homeTeam.value, awayTeam.value].forEach((team) => {
    team.players.forEach((p) => {
      if (p.starting) {
        const posFactor =
          p.position === "GK"
            ? 0.02
            : p.position === "DEF"
              ? 0.6
              : p.position === "MID"
                ? 0.9
                : 1.0;
        p.status.stamina = Math.max(0, p.status.stamina - 0.6 * posFactor);
      }
    });
  });
}
</script>

<template>
  <div>
    <div class="grid grid-cols-12 mt-8 gap-4">
      <TeamPanel :team="awayTeam" class="col-span-4" />
      <div class="col-span-4 bg-base-300 rounded shadow p-4">
        <div>
          <div class="relative w-fit -mb-3 mx-auto text-center">
            <div class="text-xs text-gray-300">Tempo</div>
            <div class="px-4 bg-primary text-2xl font-semibold rounded-lg">
              {{ minute }}'
            </div>
          </div>
          <div
            class="flex items-center justify-between bg-base-100 p-3 mb-3 rounded-lg"
          >
            <div class="w-40 text-center">
              <div class="text-xs text-gray-500">Visitante</div>
              <div class="text-2xl font-bold">
                {{ awayTeam.name }}
              </div>
            </div>

            <div class="flex items-center text-center gap-4">
              <span class="text-4xl font-light">{{ score.away }}</span>
              <span>x</span>
              <span class="text-4xl font-light">{{ score.home }}</span>
            </div>

            <div class="w-40 text-center">
              <div class="text-xs text-gray-500">Casa</div>
              <div class="text-2xl font-bold">
                {{ homeTeam.name }}
              </div>
            </div>
          </div>
          <div class="text-sm text-center text-gray-500 mb-4">
            {{ statusMsg }}
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
            v-if="matchEnded"
            @click="startMatch"
            class="bg-green-600 text-white px-4 py-2 rounded"
          >
            Recomeçar
          </button>
        </div>
        <div class="h-96 overflow-y-auto bg-base-200 p-2 rounded">
          <div
            v-for="(event, i) in log"
            :key="i"
            class="border-base-100 border-b pb-1"
          >
            <span class="text-gray-500 text-xs">{{ event.minute }}’</span>
            <span class="text-sm ml-2">{{ event.text }}</span>
          </div>
        </div>
      </div>
      <TeamPanel :team="homeTeam" class="col-span-4" />
    </div>
  </div>
</template>
