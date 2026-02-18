<script setup lang="ts">
import { ref } from "vue";
import { useTeam } from "@/composables/team";

import BaseTitle from "@/components/molecules/BaseTitle.vue";
import BaseCard from "@components/molecules/BaseCard.vue";
import PlayerList from "@components/molecules/PlayerList.vue";
import FootballPitchVertical from "@components/molecules/FootballPitchVertical.vue";

const currentTab = ref<"titulares" | "reservas" | "elenco">("titulares");

const {
  mode,
  message,
  starters,
  reserves,
  selectedOut,
  highlightedIn,
  isSubstituting,
  handleSubstitutionClick,
  confirmSubstitution,
  cancelSubstitution,
} = useTeam();
</script>

<template>
  <div class="flex flex-col p-6 gap-4">
    <BaseTitle
      title="Formação do Time"
      subtitle="Monte sua escalação ideal e defina quem entra em campo desde o início."
    />
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <BaseCard>
        <template #title>Elenco</template>

        <template #content>
          <div role="tablist" class="tabs tabs-bordered">
            <button
              role="tab"
              class="tab"
              :class="{ 'tab-active': currentTab === 'titulares' }"
              @click="currentTab = 'titulares'"
            >
              Titulares
            </button>

            <button
              role="tab"
              class="tab"
              :class="{ 'tab-active': currentTab === 'reservas' }"
              @click="currentTab = 'reservas'"
            >
              Reservas
            </button>
          </div>

          <!-- Mensagem -->
          <transition name="fade">
            <div v-if="message" class="alert alert-info text-sm mt-2 py-2">
              {{ message }}
            </div>
          </transition>

          <!-- Titulares -->
          <div v-if="currentTab === 'titulares'" class="pt-5">
            <ul>
              <li v-for="p in starters" :key="p.id">
                <PlayerList
                  v-bind="p"
                  :disabled="isSubstituting && mode === 'reserve'"
                  @substitute="
                    () => {
                      handleSubstitutionClick(p, 'starter');
                      currentTab = 'reservas';
                    }
                  "
                />
              </li>
            </ul>
          </div>

          <!-- Reservas -->
          <div v-else class="pt-5 space-y-2">
            <div
              v-if="selectedOut"
              class="alert alert-info text-sm flex items-center justify-between"
            >
              <span>
                Substituindo
                <strong>{{ selectedOut.name }}</strong> ({{
                  selectedOut.position
                }}) — selecione quem vai entrar.
              </span>
              <button class="btn btn-xs btn-ghost" @click="cancelSubstitution">
                Cancelar
              </button>
            </div>
            <ul>
              <li v-for="p in reserves" :key="p.id">
                <PlayerList
                  v-bind="p"
                  :disabled="isSubstituting && mode === 'starter'"
                  @substitute="
                    () => {
                      handleSubstitutionClick(p, 'reserve');
                      currentTab = 'titulares';
                    }
                  "
                  :class="[
                    highlightedIn.some((h) => h.id === p.id)
                      ? 'border border-primary bg-primary/10 cursor-pointer'
                      : 'cursor-pointer hover:bg-base-100',
                  ]"
                  @click="
                    highlightedIn.some((h) => h.id === p.id)
                      ? confirmSubstitution(
                          p,
                          () =>
                            (currentTab =
                              mode === 'starter' ? 'titulares' : 'reservas'),
                        )
                      : null
                  "
                />
              </li>
            </ul>
          </div>
        </template>
      </BaseCard>

      <FootballPitchVertical :formation="starters" />
    </div>
  </div>
</template>
