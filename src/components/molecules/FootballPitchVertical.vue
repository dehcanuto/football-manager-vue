<script setup lang="ts">
import { computed } from "vue";

import StadiumLayout from "@components/atoms/StadiumLayout.vue";
import { Player } from "@/models/team";

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
  const defenders = lineup.value.defenders.length;
  const laterais = lineup.value.laterais.length;
  const volantes = lineup.value.volantes.length;
  const mids = lineup.value.midfielders.length;
  const forwards = lineup.value.forwards.length;

  const totalDef = defenders + laterais;

  const shouldSeparateVolantes = volantes > 0 && mids > 0 && forwards > 0;

  const formation = shouldSeparateVolantes
    ? [totalDef, volantes, mids, forwards]
    : [totalDef, volantes + mids, forwards];

  return formation.filter((n) => n > 0).join("-");
});
</script>

<template>
  <div>
    <div class="text-center">
      <span>Escalação</span>
      <h4 class="text-4xl font-bold mb-4">{{ formationTatics }}</h4>
    </div>
    <div class="football-field">
      <div id="escalacao">
        <div style="height: 105px"></div>
        <div id="atacantes">
          <div
            v-for="player in lineup.forwards"
            :key="player.id"
            class="player"
          >
            <div class="numero-camisa" :data-tip="player.name">
              {{ player.shirtNumber }}
            </div>
          </div>
        </div>
        <div id="meias">
          <div
            v-for="player in lineup.midfielders"
            :key="player.id"
            class="player"
          >
            <div class="numero-camisa" :data-tip="player.name">
              {{ player.shirtNumber }}
            </div>
          </div>
        </div>
        <div id="volantes">
          <div
            v-for="player in lineup.volantes"
            :key="player.id"
            class="player"
          >
            <div class="numero-camisa" :data-tip="player.name">
              {{ player.shirtNumber }}
            </div>
          </div>
        </div>
        <div id="laterais">
          <template v-for="(player, index) in lineup.laterais" :key="player.id">
            <div v-if="index === 1" class="w-[150px] h-10 rounded"></div>
            <div class="player">
              <div class="numero-camisa" :data-tip="player.name">
                {{ player.shirtNumber }}
              </div>
            </div>
          </template>
        </div>
        <div id="zagueiros">
          <div
            v-for="player in lineup.defenders"
            :key="player.id"
            class="player"
          >
            <div class="numero-camisa" :data-tip="player.name">
              {{ player.shirtNumber }}
            </div>
          </div>
        </div>
        <div id="goleiro" style="margin: auto; display: flex">
          <div
            v-for="player in lineup.goalkeeper"
            :key="player.id"
            class="player"
          >
            <div class="numero-camisa" :data-tip="player.name">
              {{ player.shirtNumber }}
            </div>
          </div>
        </div>
      </div>
      <StadiumLayout />
    </div>
  </div>
</template>

<style scoped lang="scss">
.football-field {
  @apply relative w-[320px] h-[500px] bg-green-600 border-[6px] border-white mx-auto rounded-lg overflow-hidden shadow-xl;
  background: repeating-linear-gradient(
    0deg,
    #1b9a4b 0px,
    #1b9a4b 40px,
    #16a34a 40px,
    #16a34a 80px
  );
}

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
      cursor: default;
      @apply tooltip;
    }

    &:hover {
      transform: scale(1.15);
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
