import { ref, computed } from "vue";
import { createSharedComposable } from "@vueuse/core";

import { Nautico } from "@/data/teams";
import { Player } from "@/models/team";
import { groups, positionOrder } from "@/constants/team";

export const useTeam = createSharedComposable(() => {
  const players = ref<Player[]>(JSON.parse(JSON.stringify(Nautico.players)));

  const sortByPosition = (a: Player, b: Player) =>
    positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position);

  const starters = computed(() =>
    players.value.filter((p) => p.starting).sort(sortByPosition),
  );
  const reserves = computed(() =>
    players.value.filter((p) => !p.starting).sort(sortByPosition),
  );

  const selectedOut = ref<Player | null>(null);
  const selectedIn = ref<Player | null>(null);
  const mode = ref<"starter" | "reserve" | null>(null);
  const message = ref<string | null>(null);

  const isSubstituting = computed(
    () => !!selectedOut.value || !!selectedIn.value,
  );

  const highlightedIn = computed(() => {
    if (mode.value === "starter" && selectedOut.value) {
      const group = groups[selectedOut.value.position] || [];
      return reserves.value.filter((p) => group.includes(p.position));
    }
    if (mode.value === "reserve" && selectedIn.value) {
      const group = groups[selectedIn.value.position] || [];
      return starters.value.filter((p) => group.includes(p.position));
    }
    return [];
  });

  function handleSubstitutionClick(
    player: Player,
    from: "starter" | "reserve",
  ) {
    message.value = null;
    if (from === "starter") {
      selectedOut.value = player;
      selectedIn.value = null;
      mode.value = "starter";
    } else {
      selectedIn.value = player;
      selectedOut.value = null;
      mode.value = "reserve";
    }
  }

  function cancelSubstitution() {
    selectedOut.value = null;
    selectedIn.value = null;
    mode.value = null;
    message.value = null;
  }

  function confirmSubstitution(player: Player, onAfter?: () => void) {
    const playerOut = mode.value === "starter" ? selectedOut.value : player;
    const playerIn = mode.value === "starter" ? player : selectedIn.value;

    if (!playerOut || !playerIn) return;

    // Mesmo jogador
    if (playerOut.id === playerIn.id) {
      message.value = "Você não pode substituir o mesmo jogador.";
      return;
    }

    // Regras de goleiro
    const hasGoalkeeper = players.value.some(
      (p) => p.starting && p.position === "GK",
    );
    if (
      playerIn.position === "GK" &&
      hasGoalkeeper &&
      playerOut.position !== "GK"
    ) {
      message.value = "Já existe um goleiro titular em campo.";
      return;
    }
    if (playerOut.position === "GK" && playerIn.position !== "GK") {
      message.value =
        "Você não pode tirar o goleiro sem colocar outro no lugar.";
      return;
    }

    // Validação de posição
    const validIds = highlightedIn.value.map((p) => p.id);
    if (
      !validIds.includes(mode.value === "starter" ? playerIn.id : playerOut.id)
    ) {
      message.value = "Substituição inválida para essa posição.";
      return;
    }

    // Finaliza substituicao
    const outIndex = players.value.findIndex((p) => p.id === playerOut.id);
    const inIndex = players.value.findIndex((p) => p.id === playerIn.id);

    if (outIndex === -1 || inIndex === -1) {
      message.value = "Erro interno ao localizar jogadores.";
      return;
    }

    players.value[outIndex].starting = false;
    players.value[inIndex].starting = true;

    message.value = `${playerOut.name} foi substituído por ${playerIn.name}.`;

    setTimeout(() => {
      cancelSubstitution();
      onAfter?.();
    }, 1500);
  }

  return {
    mode,
    players,
    message,
    starters,
    reserves,
    selectedOut,
    selectedIn,
    isSubstituting,
    highlightedIn,
    handleSubstitutionClick,
    confirmSubstitution,
    cancelSubstitution,
  };
});
