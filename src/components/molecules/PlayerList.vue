<script setup lang="ts">
import { Player } from "@/models/team";
import Icon from "@components/atoms/Icon.vue";
import Stamina from "@components/atoms/Stamina.vue";

const props = defineProps<Player & { disabled?: boolean }>();
const emit = defineEmits(["substitute"]);
</script>

<template>
  <div
    class="group flex items-center justify-between p-2 px-4 hover:bg-base-100 rounded-lg transition"
  >
    <div class="flex items-center gap-3">
      <div class="w-60">
        <RouterLink
          v-if="!props.disabled"
          :to="`/jogador/${props.id}`"
          class="font-medium text-white"
          :class="{ 'opacity-60': !props.starting }"
        >
          <span class="text-primary">{{ props.shirtNumber }}</span>
          {{ props.name }}
          <span class="text-xs text-gray-500"> ({{ props.position }}) </span>

          <!-- Gols -->
          <span v-if="props.goals" class="ml-2 text-xs">
            {{ "⚽".repeat(props.goals) }}
          </span>

          <!-- Cartões -->
          <span
            v-if="props.yellowCards && props.yellowCards >= 2"
            class="ml-2 text-xs"
            >🟥</span
          >
          <span v-else-if="props.yellowCards === 1" class="ml-2 text-xs"
            >🟨</span
          >
        </RouterLink>

        <div
          v-else
          class="font-medium text-white"
          :class="{ 'opacity-60': !props.starting }"
        >
          <span class="text-primary">{{ props.shirtNumber }}</span>
          {{ props.name }}
          <span class="text-xs text-gray-500"> ({{ props.position }}) </span>
        </div>

        <div class="text-xs text-gray-500">
          Sho: {{ props.attributes.shooting }} • Pac:
          {{ props.attributes.pace }}
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <div
        class="flex opacity-0 transition-opacity duration-300"
        :class="
          props.disabled ? 'pointer-events-none' : 'group-hover:opacity-100'
        "
      >
        <button
          class="flex btn btn-ghost btn-circle tooltip"
          data-tip="Substituir jogador"
          @click="emit('substitute', props)"
        >
          <Icon name="substitution" />
        </button>
      </div>
      <Stamina :value="props.status.stamina" />
    </div>
  </div>
</template>
