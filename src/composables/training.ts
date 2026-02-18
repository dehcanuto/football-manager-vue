import { ref, computed } from "vue";
import { createSharedComposable } from "@vueuse/core";

import type { PlayerTrainning, TrainingFocus } from "@/models/team";
import { Nautico } from "@/data/teams";
import { player_trainning } from "@/data/player_trainning";
import { positionTrainingSuggestions } from "@/constants/training";

export const useTraining = createSharedComposable(() => {
  const allPlayers = Nautico.players;
  const players = ref<PlayerTrainning[]>(player_trainning);
  const selectedPlayerId = ref<number | null>(null);
  const trainingFocus = ref<TrainingFocus | null>(null);

  const availablePlayers = computed(() =>
    allPlayers.filter((p) => !players.value.some((t) => t.id === p.id)),
  );

  const selectedPlayer = computed(() =>
    availablePlayers.value.find((p) => p.id === selectedPlayerId.value),
  );

  function changeFocus(player: PlayerTrainning, newFocus: TrainingFocus) {
    player.trainingFocus = newFocus;
  }

  function addPlayerToTraining() {
    if (!selectedPlayer.value) return;

    const player = selectedPlayer.value;
    const suggestions = positionTrainingSuggestions[player.position] ?? ["Geral"];
    const focus = trainingFocus.value || (suggestions[0] as TrainingFocus);

    players.value.push({
      ...player,
      morale: player.status?.morale ?? 80,
      stamina: player.status?.stamina ?? 100,
      trainingFocus: focus,
    });

    selectedPlayerId.value = null;
    trainingFocus.value = null;
  }

  return {
    players,
    trainingFocus,
    selectedPlayer,
    availablePlayers,
    selectedPlayerId,
    changeFocus,
    addPlayerToTraining,
  };
});
