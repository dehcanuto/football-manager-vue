<script setup lang="ts">
import { useTraining } from "@/composables/training";

import { trainingTypes } from "@/constants/training";

import BaseTitle from "@/components/molecules/BaseTitle.vue";
import Stamina from "@/components/molecules/Stamina.vue";
import PositionTag from "@components/atoms/PositionTag.vue";
import AddPlayerTrainingForm from "@components/organisms/AddPlayerTrainingForm.vue";

const { players, changeFocus } = useTraining();
</script>

<template>
  <div class="p-6 flex flex-col gap-6">
    <!-- Header -->
    <BaseTitle
      title="Centro de Treinamento"
      subtitle="Gerencie os treinos individuais e desenvolva as habilidades dos seus jogadores."
    />

    <AddPlayerTrainingForm />

    <!-- Lista de jogadores treinando -->
    <div class="card bg-base-200 shadow-lg">
      <div class="card-body">
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr class="text-gray-400 text-sm">
                <th class="text-center">#</th>
                <th>Jogador</th>
                <th class="text-center">Posição</th>
                <th class="text-center">Foco de Treino</th>
                <th class="text-center">Fadiga</th>
                <th class="text-center">Moral</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="p in players"
                :key="p.id"
                class="hover:bg-base-300 transition-colors"
              >
                <td class="text-center font-semibold text-primary">
                  {{ p.id }}
                </td>
                <td class="font-semibold text-gray-100">{{ p.name }}</td>
                <td class="text-center">
                  <PositionTag :position="p.position" />
                </td>

                <td class="text-center">
                  <select
                    v-model="p.trainingFocus"
                    @change="changeFocus(p, p.trainingFocus)"
                    class="select select-bordered select-sm w-full max-w-xs"
                  >
                    <option
                      v-for="type in trainingTypes"
                      :key="type"
                      :value="type"
                    >
                      {{ type }}
                    </option>
                  </select>
                </td>

                <td class="text-center">
                  <Stamina :value="p.stamina" right />
                </td>

                <td class="text-center">
                  <Stamina :value="p.morale" right />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
