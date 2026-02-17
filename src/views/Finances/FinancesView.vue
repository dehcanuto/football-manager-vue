<script setup lang="ts">
const finances = {
  balance: 8450000,
  monthlyProfit: 350000,
  totalIncome: 12300000,
  totalExpenses: 11950000,
  trend: "up",
};

const revenues = [
  { label: "Bilheteria", value: 420000 },
  { label: "Patrocínios", value: 1200000 },
  { label: "Direitos de TV", value: 900000 },
  { label: "Prêmios", value: 600000 },
  { label: "Transferências", value: 3000000 },
  { label: "Merchandising", value: 250000 },
];

const expenses = [
  { label: "Salários", value: 800000 },
  { label: "Manutenção do Estádio", value: 120000 },
  { label: "Treinamentos", value: 70000 },
  { label: "Viagens", value: 50000 },
  { label: "Contratações", value: 2000000 },
  { label: "Impostos", value: 40000 },
];

const formatMoney = (value: number) => "R$ " + value.toLocaleString("pt-BR");
</script>

<template>
  <div class="p-6 flex flex-col gap-6">
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div class="card bg-base-200 shadow">
        <div class="card-body p-4 text-center">
          <p class="text-sm text-gray-400">Saldo Atual</p>
          <h2 class="text-2xl font-bold text-success">
            {{ formatMoney(finances.balance) }}
          </h2>
        </div>
      </div>

      <div class="card bg-base-200 shadow">
        <div class="card-body p-4 text-center">
          <p class="text-sm text-gray-400">Lucro / Mês</p>
          <h2
            class="text-2xl font-bold"
            :class="finances.monthlyProfit >= 0 ? 'text-success' : 'text-error'"
          >
            {{ formatMoney(finances.monthlyProfit) }}
          </h2>
        </div>
      </div>

      <div class="card bg-base-200 shadow">
        <div class="card-body p-4 text-center">
          <p class="text-sm text-gray-400">Receitas Totais</p>
          <h2 class="text-2xl font-bold text-info">
            {{ formatMoney(finances.totalIncome) }}
          </h2>
        </div>
      </div>

      <div class="card bg-base-200 shadow">
        <div class="card-body p-4 text-center">
          <p class="text-sm text-gray-400">Despesas Totais</p>
          <h2 class="text-2xl font-bold text-error">
            {{ formatMoney(finances.totalExpenses) }}
          </h2>
        </div>
      </div>
    </div>

    <div class="card bg-base-200 shadow">
      <div class="card-body p-4">
        <div class="flex justify-between items-center mb-3">
          <h2 class="card-title text-base">Receitas vs Despesas</h2>
          <span
            :class="{
              'text-success': finances.trend === 'up',
              'text-error': finances.trend === 'down',
              'text-neutral': finances.trend === 'stable',
            }"
          >
            {{
              finances.trend === "up"
                ? "Em crescimento"
                : finances.trend === "down"
                  ? "Em queda"
                  : "Estável"
            }}
          </span>
        </div>

        <div class="w-full h-4 bg-base-300 rounded-full flex overflow-hidden">
          <div
            class="bg-success h-full"
            :style="{ width: '70%' }"
            title="Receitas"
          ></div>
          <div
            class="bg-error h-full"
            :style="{ width: '68%' }"
            title="Despesas"
          ></div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div class="card bg-base-200 shadow">
        <div class="card-body p-4">
          <h3 class="card-title text-base">Receitas</h3>
          <ul class="divide-y divide-base-300 mt-2">
            <li
              v-for="r in revenues"
              :key="r.label"
              class="flex justify-between py-2"
            >
              <span>{{ r.label }}</span>
              <span class="font-semibold text-success">{{
                formatMoney(r.value)
              }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="card bg-base-200 shadow">
        <div class="card-body p-4">
          <h3 class="card-title text-base">Despesas</h3>
          <ul class="divide-y divide-base-300 mt-2">
            <li
              v-for="e in expenses"
              :key="e.label"
              class="flex justify-between py-2"
            >
              <span>{{ e.label }}</span>
              <span class="font-semibold text-error">{{
                formatMoney(e.value)
              }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
