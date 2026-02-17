<script setup lang="ts">
import { reactive, computed } from "vue";

const state = reactive({
  budgets: {
    transferBudget: 8000000,
  },
  zones: {
    north: {
      label: "Fundo Norte (Visitantes)",
      rows: 2,
      seatsPerRow: 28,
      maxRows: 8,
      costPerRow: 150000,
    },
    south: {
      label: "Fundo Sul (Mandante)",
      rows: 3,
      seatsPerRow: 30,
      maxRows: 10,
      costPerRow: 200000,
    },
    west: {
      label: "Lateral Oeste",
      rows: 4,
      seatsPerRow: 10,
      maxRows: 12,
      costPerRow: 100000,
    },
    east: {
      label: "Lateral Este",
      rows: 4,
      seatsPerRow: 10,
      maxRows: 12,
      costPerRow: 100000,
    },
  },
});

const zoneCapacity = (z: { rows: number; seatsPerRow: number }) =>
  z.rows * z.seatsPerRow;

const totalCapacity = computed(() =>
  Object.values(state.zones).reduce((s, z: any) => s + zoneCapacity(z), 0),
);

function canAddRow(zoneKey: keyof typeof state.zones) {
  const z = state.zones[zoneKey];
  return z.rows < z.maxRows && state.budgets.transferBudget >= z.costPerRow;
}

function addRow(zoneKey: keyof typeof state.zones) {
  const z = state.zones[zoneKey];
  if (z.rows >= z.maxRows) return;
  if (state.budgets.transferBudget < z.costPerRow) return;
  z.rows++;
  state.budgets.transferBudget -= z.costPerRow;
}

function removeRow(zoneKey: keyof typeof state.zones) {
  const z = state.zones[zoneKey];
  if (z.rows <= 0) return;
  z.rows--;
}
</script>

<template>
  <div class="p-6 space-y-6">
    <div class="flex items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-100">
          Visualização do Estádio (Top-down)
        </h2>
        <p class="text-sm text-gray-400">
          Ajuste fileiras por zona para ver a capacidade mudar em tempo real.
        </p>
      </div>

      <div class="flex gap-4 items-center">
        <div class="card bg-base-200 p-3">
          <div class="text-xs text-gray-400">Orçamento disponível</div>
          <div class="text-lg font-bold text-success">
            R$ {{ state.budgets.transferBudget.toLocaleString("pt-BR") }}
          </div>
        </div>
        <div class="card bg-base-200 p-3">
          <div class="text-xs text-gray-400">Capacidade estimada</div>
          <div class="text-lg font-bold text-primary">
            {{ totalCapacity.toLocaleString() }}
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="space-y-4 col-span-1">
        <div
          v-for="(zone, key) in state.zones"
          :key="key"
          class="card bg-base-200 p-3 flex flex-col gap-2"
        >
          <div class="flex justify-between items-start">
            <div>
              <div class="text-sm text-gray-400">{{ zone.label }}</div>
              <div class="text-lg font-semibold text-gray-100">
                {{ zone.rows }} fileiras • {{ zone.seatsPerRow }} assentos/fil.
              </div>
              <div class="text-xs text-gray-400">
                Capacidade:
                <strong>{{
                  (zone.rows * zone.seatsPerRow).toLocaleString()
                }}</strong>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs text-gray-400">Custo/fil.</div>
              <div class="font-semibold text-yellow-300">
                R$ {{ zone.costPerRow.toLocaleString("pt-BR") }}
              </div>
            </div>
          </div>
          <div class="flex gap-2 items-center">
            <button
              class="btn btn-sm btn-outline"
              @click="removeRow(key)"
              :disabled="zone.rows <= 0"
            >
              - Remover
            </button>
            <button
              class="btn btn-sm"
              :class="canAddRow(key) ? 'btn-primary' : 'btn-disabled'"
              @click="addRow(key)"
              :disabled="!canAddRow(key)"
            >
              + Adicionar fileira
            </button>
            <div class="ml-auto text-sm text-gray-400">
              máx: {{ zone.maxRows }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-1 space-y-4">
        <div class="card bg-base-200 p-3">
          <div class="text-sm text-gray-400">Resumo por zona</div>
          <div class="mt-2 space-y-2">
            <div
              v-for="(z, k) in state.zones"
              :key="k"
              class="flex justify-between"
            >
              <div class="text-sm text-gray-200">{{ z.label }}</div>
              <div class="text-sm font-semibold">
                {{ (z.rows * z.seatsPerRow).toLocaleString() }}
              </div>
            </div>
            <div class="divider"></div>
            <div class="flex justify-between">
              <div class="text-sm text-gray-400">Total capacidade</div>
              <div class="text-lg font-bold text-primary">
                {{ totalCapacity.toLocaleString() }}
              </div>
            </div>
          </div>
        </div>

        <div class="card bg-base-200 p-3">
          <div class="text-sm text-gray-400">Legenda</div>
          <div class="flex gap-2 mt-2 items-center">
            <div class="w-4 h-4 bg-white/90 border rounded-sm"></div>
            <div class="text-sm text-gray-300">Assento (representação)</div>
          </div>
          <p class="text-xs text-gray-400 mt-2">
            Use os botões para adicionar fileiras em uma zona. O custo por
            fileira é apenas ilustrativo.
          </p>
        </div>

        <div class="card bg-base-200 p-3">
          <div class="text-sm text-gray-400">Ações rápidas</div>
          <div class="mt-3 flex gap-2">
            <button
              class="btn btn-sm btn-outline"
              @click="
                Object.keys(state.zones).forEach(
                  (k) => (state.zones[k as keyof typeof state.zones].rows = 1),
                )
              "
            >
              Resetar fileiras
            </button>
            <button
              class="btn btn-sm btn-primary"
              @click="
                Object.keys(state.zones).forEach((k) => {
                  const z = state.zones[k as keyof typeof state.zones];
                  if (
                    z.rows < z.maxRows &&
                    state.budgets.transferBudget >= z.costPerRow
                  ) {
                    z.rows++;
                    state.budgets.transferBudget -= z.costPerRow;
                  }
                })
              "
            >
              Upgrade leve (1 fila cada)
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pitch {
  position: relative;
  overflow: hidden;
}

.stripe {
  position: absolute;
  left: 0;
  right: 0;
  height: calc(100% / 6);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.06),
    rgba(255, 255, 255, 0.02)
  );
  opacity: 0.25;
}

.stand-row {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
}

.seats-inline {
  display: grid;
  gap: 3px;
  width: 100%;
  padding: 2px 6px;
}

.seat {
  display: inline-block;
  width: 100%;
  height: 8px;
  border-radius: 3px;
  background: linear-gradient(180deg, #f8fafc, #e6eef5);
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.06);
  opacity: 0.95;
}

.stand-col {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.seats-vertical {
  display: grid;
  gap: 4px;
  width: 100%;
  align-items: center;
  justify-items: center;
}

.seat-vertical {
  width: 8px;
  height: 6px;
  background: linear-gradient(180deg, #f8fafc, #e6eef5);
  border-radius: 2px;
}

.goal {
  opacity: 0.95;
}

.card {
  border-radius: 8px;
}
</style>
