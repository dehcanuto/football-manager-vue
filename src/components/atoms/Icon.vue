<script setup lang="ts">
import NotificationIcon from "./icons/Notification.vue";
import PlayersIcon from "./icons/Players.vue";
import StadiumIcon from "./icons/Stadium.vue";
import FinancesIcon from "./icons/Finances.vue";
import TradeIcon from "./icons/Trade.vue";
import SoccerIcon from "./icons/Soccer.vue";

const icons = {
  players: PlayersIcon,
  stadium: StadiumIcon,
  finances: FinancesIcon,
  trade: TradeIcon,
  soccer: SoccerIcon,
  notification: NotificationIcon,
};

export type IconName = keyof typeof icons;

defineProps<{ name: IconName }>();
</script>

<template>
  <component :is="icons[name]" />
</template>
