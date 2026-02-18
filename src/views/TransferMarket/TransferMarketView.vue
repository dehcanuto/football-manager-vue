<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

import BaseTitle from "@/components/molecules/BaseTitle.vue";

// TODO: provisório até a integração.
interface Player {
  id: number;
  name: string;
  age: number;
  position: string;
  club: string;
  value: number;
  salary: number;
  overall: number;
}

const userFinances = {
  transferBudget: 8_000_000,
  salaryBudget: 600_000,
};

const players = ref<Player[]>([]);
const loading = ref(false);

const filters = ref({
  position: "ALL",
  maxValue: 10_000_000,
  minOverall: 0,
  search: "",
  page: 1,
});

const formatMoney = (v: number) => "R$ " + v.toLocaleString("pt-BR");

// TODO: Está como mock. Integrar depois.
async function fetchPlayers() {
  loading.value = true;

  // (no futuro: aqui tu troca pelo axios.get(`/api/transfers`, { params: filters.value }))
  await new Promise((r) => setTimeout(r, 500)); // simula latência

  const allMock = [
    {
      id: 1,
      name: "R. Souza",
      age: 26,
      position: "FWD",
      club: "América-RN",
      value: 3_500_000,
      salary: 120_000,
      overall: 78,
    },
    {
      id: 2,
      name: "L. Costa",
      age: 30,
      position: "MID",
      club: "Salgueiro",
      value: 2_000_000,
      salary: 95_000,
      overall: 74,
    },
    {
      id: 3,
      name: "P. Mendes",
      age: 21,
      position: "DEF",
      club: "Afogados",
      value: 1_200_000,
      salary: 80_000,
      overall: 70,
    },
    {
      id: 4,
      name: "E. Lima",
      age: 24,
      position: "GK",
      club: "Central",
      value: 1_800_000,
      salary: 85_000,
      overall: 73,
    },
    {
      id: 5,
      name: "G. Oliveira",
      age: 27,
      position: "FWD",
      club: "Santa Cruz",
      value: 4_500_000,
      salary: 150_000,
      overall: 80,
    },
  ];

  players.value = allMock.filter((p) => {
    const pos =
      filters.value.position === "ALL" || p.position === filters.value.position;
    const val = p.value <= filters.value.maxValue;
    const ovr = p.overall >= filters.value.minOverall;
    const search = p.name
      .toLowerCase()
      .includes(filters.value.search.toLowerCase());
    return pos && val && ovr && search;
  });

  loading.value = false;
}

watch(filters, fetchPlayers, { deep: true });
onMounted(fetchPlayers);
</script>

<template>
  <div class="p-6 flex flex-col gap-6">
    <BaseTitle
      title="Mercado"
      subtitle="Negocie jogadores, contrate reforços e fortaleça seu elenco."
    />

    <div class="flex flex-col sm:flex-row justify-between gap-4">
      <div class="card bg-base-200 shadow-md flex-1">
        <div class="card-body py-3 px-4">
          <h2 class="text-gray-400 text-sm">Orçamento de Transferências</h2>
          <p class="text-2xl font-bold text-success">
            {{ formatMoney(userFinances.transferBudget) }}
          </p>
        </div>
      </div>

      <div class="card bg-base-200 shadow-md flex-1">
        <div class="card-body py-3 px-4">
          <h2 class="text-gray-400 text-sm">Orçamento Salarial Mensal</h2>
          <p class="text-2xl font-bold text-info">
            {{ formatMoney(userFinances.salaryBudget) }}
          </p>
        </div>
      </div>
    </div>

    <div class="card bg-base-200 shadow-md">
      <div class="card-body p-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <label class="label text-sm text-gray-400">Buscar jogador</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Ex: Souza, Lima..."
            class="input input-bordered w-full"
          />
        </div>

        <div>
          <label class="label text-sm text-gray-400">Posição</label>
          <select
            v-model="filters.position"
            class="select select-bordered w-full"
          >
            <option value="ALL">Todas</option>
            <option value="FWD">FWD</option>
            <option value="MID">MID</option>
            <option value="DEF">DEF</option>
            <option value="GK">GK</option>
          </select>
        </div>

        <div>
          <label class="label text-sm text-gray-400 mb-3">
            Valor máximo: {{ formatMoney(filters.maxValue) }}
          </label>
          <input
            type="range"
            v-model="filters.maxValue"
            min="500000"
            max="10000000"
            step="500000"
            class="range range-primary"
          />
        </div>

        <div>
          <label class="label text-sm text-gray-400 mb-3">
            Overall mínimo: {{ filters.minOverall }}
          </label>
          <input
            type="range"
            v-model="filters.minOverall"
            min="60"
            max="90"
            step="1"
            class="range range-info"
          />
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-10 text-gray-400">
      Carregando...
    </div>

    <div v-else class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead>
          <tr class="text-gray-400 text-sm">
            <th class="text-center">#</th>
            <th>Jogador</th>
            <th class="text-center">Posição</th>
            <th class="text-center">Clube</th>
            <th class="text-center">Overall</th>
            <th class="text-center">Valor</th>
            <th class="text-center">Salário</th>
            <th class="text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="p in players"
            :key="p.id"
            class="hover:bg-base-200 transition-colors"
          >
            <td class="text-center font-semibold text-primary">{{ p.id }}</td>
            <td class="text-gray-100 font-semibold">{{ p.name }}</td>
            <td class="text-center">{{ p.position }}</td>
            <td class="text-center text-gray-300">{{ p.club }}</td>
            <td class="text-center text-gray-300">{{ p.overall }}</td>
            <td class="text-center text-success font-semibold">
              {{ formatMoney(p.value) }}
            </td>
            <td class="text-center text-info">{{ formatMoney(p.salary) }}</td>
            <td class="text-center">
              <button class="btn btn-success btn-sm">Negociar</button>
            </td>
          </tr>

          <tr v-if="!players.length">
            <td colspan="8" class="text-center py-6 text-gray-400">
              Nenhum jogador encontrado 😢
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
