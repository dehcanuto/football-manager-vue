<script setup lang="ts">
import { Player } from "@/types";
import { computed } from "vue";

const props = defineProps<{ formation: Player[] }>();

const lineup = computed(() => ({
  forwards: props.formation.filter((p) => p.position === "FWD"),
  midfielders: props.formation.filter((p) => p.position === "MID"),
  volantes: props.formation.filter((p) => p.position === "DM"),
  laterais: props.formation.filter((p) => p.position === "LAT"),
  defenders: props.formation.filter((p) => p.position === "DEF"),
  goalkeeper: props.formation.filter((p) => p.position === "GK"),
}));

const formationTatics = computed(() => {
  // monta a sequência baseada nas linhas defensivas e ofensivas
  const defenders = lineup.value.defenders.length;
  const laterais = lineup.value.laterais.length;
  const volantes = lineup.value.volantes.length;
  const mids = lineup.value.midfielders.length;
  const forwards = lineup.value.forwards.length;

  // Aqui você pode ajustar a ordem que quer mostrar
  // ex: [defesa total], [meio defensivo], [meio ofensivo], [ataque]
  const formation = [
    defenders + laterais, // linha de defesa completa
    volantes, // volantes (meio defensivo)
    mids, // meias (meio ofensivo)
    forwards, // ataque
  ].filter((n) => n > 0); // remove posições vazias (caso falte alguém)

  // retorna no formato 4-2-3-1, por exemplo
  return formation.join("-");
});
</script>

<template>
  <div>
    <div class="text-center">
      <span>Escalação</span>
      <h4 class="text-4xl font-bold mb-4">{{ formationTatics }}</h4>
    </div>
    <div
      class="relative w-[320px] h-[500px] bg-green-600 border-[6px] border-white mx-auto rounded-lg overflow-hidden shadow-xl"
    >
      <div id="escalacao">
        <div style="height: 105px"></div>
        <div id="atacantes">
          <div
            v-for="player in lineup.forwards"
            :key="player.id"
            class="player"
          >
            <div class="numero-camisa">{{ player.id }}</div>
          </div>
        </div>
        <div id="meias">
          <div
            v-for="player in lineup.midfielders"
            :key="player.id"
            class="player"
          >
            <div class="numero-camisa">{{ player.id }}</div>
          </div>
        </div>
        <div id="volantes">
          <div
            v-for="player in lineup.volantes"
            :key="player.id"
            class="player"
          >
            <div class="numero-camisa">{{ player.id }}</div>
          </div>
        </div>
        <div id="laterais">
          <template v-for="(player, index) in lineup.laterais" :key="player.id">
            <div v-if="index === 1" class="w-[150px] h-10 rounded"></div>
            <div class="player">
              <div class="numero-camisa">{{ player.id }}</div>
            </div>
          </template>
        </div>
        <div id="zagueiros">
          <div
            v-for="player in lineup.defenders"
            :key="player.id"
            class="player"
          >
            <div class="numero-camisa">{{ player.id }}</div>
          </div>
        </div>
        <div id="goleiro" style="margin: auto; display: flex">
          <div
            v-for="player in lineup.goalkeeper"
            :key="player.id"
            class="player"
          >
            <div class="numero-camisa">{{ player.id }}</div>
          </div>
        </div>
      </div>
      <div id="stadium_layout">
        <div class="absolute inset-2 border-2 border-white rounded-lg" />
        <div
          class="absolute left-2 right-2 top-1/2 -translate-y-1/2 h-[2px] bg-white"
        />

        <div
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90px] h-[90px] border-2 border-white rounded-full"
        />
        <div
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] bg-white rounded-full"
        />

        <div
          class="absolute top-2 left-[20%] w-[60%] h-[75px] border-2 border-white"
        />
        <div
          class="absolute top-2 left-[35%] w-[30%] h-[30px] border-2 border-white"
        />
        <div
          class="absolute top-[55px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] bg-white rounded-full"
        />

        <div
          class="absolute top-[82px] left-1/2 -translate-x-1/2 w-[70px] h-[40px] overflow-hidden rotate-180"
        >
          <div
            class="absolute left-0 bottom-0 w-full h-full border-2 border-white rounded-full translate-y-1/2"
          />
        </div>

        <div
          class="absolute bottom-2 left-[20%] w-[60%] h-[75px] border-2 border-white"
        />
        <div
          class="absolute bottom-2 left-[35%] w-[30%] h-[30px] border-2 border-white"
        />
        <div
          class="absolute bottom-[55px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] bg-white rounded-full"
        />

        <div
          class="absolute bottom-[82px] left-1/2 -translate-x-1/2 w-[70px] h-[40px] overflow-hidden"
        >
          <div
            class="absolute left-0 bottom-0 w-full h-full border-2 border-white rounded-full translate-y-1/2"
          />
        </div>

        <div
          class="absolute left-2 top-2 w-6 h-6 border-t-2 border-l-2 border-white rounded-tl-full"
        />
        <div
          class="absolute right-2 top-2 w-6 h-6 border-t-2 border-r-2 border-white rounded-tr-full"
        />
        <div
          class="absolute left-2 bottom-2 w-6 h-6 border-b-2 border-l-2 border-white rounded-bl-full"
        />
        <div
          class="absolute right-2 bottom-2 w-6 h-6 border-b-2 border-r-2 border-white rounded-br-full"
        />
        <div
          class="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-3 border-t-2 border-white"
        />
        <div
          class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90px] h-3 border-b-2 border-white"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#escalacao {
  --primary: #7580ff;

  height: 489px;
  width: 308px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;

  #zagueiros {
    margin: auto;
    width: 200px;
    height: 35px;
    margin-bottom: 35px;
    display: flex;
  }

  #laterais {
    margin: auto;
    height: 35px;
    margin-bottom: 0px;
    display: flex;
  }

  #volantes {
    margin: auto;
    width: 155px;
    height: 35px;
    margin-bottom: 40px;
    display: flex;
  }

  #meias {
    margin: auto;
    height: 35px;
    margin-bottom: 28px;
    display: flex;
  }

  #atacantes {
    margin: auto;
    width: 210px;
    height: 35px;
    margin-bottom: 52px;
    display: flex;
  }

  .player {
    margin: auto;
    width: 35px;
    height: 35px;
    border-width: 3px;
    border-style: solid;
    border-color: #000;
    background: var(--primary);
    border-radius: 50%;
    text-align: center;
    z-index: 1;

    .numero-camisa {
      margin: 4px;
      font-size: 0.9rem;
    }

    &:hover {
      transform: scale(1.15);
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
