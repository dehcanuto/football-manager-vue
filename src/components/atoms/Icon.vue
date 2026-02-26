<script setup lang="ts">
import NotificationIcon from "./icons/Notification.vue";
import PlayersIcon from "./icons/Players.vue";
import StadiumIcon from "./icons/Stadium.vue";
import FinancesIcon from "./icons/Finances.vue";
import TradeIcon from "./icons/Trade.vue";
import SoccerIcon from "./icons/Soccer.vue";
import SubsPlayerIcon from "./icons/SubsPlayer.vue";
import MedicalIcon from "./icons/Medical.vue";
import TrainningIcon from "./icons/Trainning.vue";
import BusinessManIcon from "./icons/BusinessMan.vue";
import MegaphoneIcon from "./icons/Megaphone.vue";


const message_icons = {
  system: MegaphoneIcon,
  player: PlayersIcon,
  finance: FinancesIcon,
  match: SoccerIcon,
  training: TrainningIcon,
  board: BusinessManIcon,
  medical: MedicalIcon,
};

const icons = {
  ...message_icons,
  players: PlayersIcon,
  stadium: StadiumIcon,
  finances: FinancesIcon,
  trade: TradeIcon,
  soccer: SoccerIcon,
  notification: NotificationIcon,
  substitution: SubsPlayerIcon,
};

export type IconName = keyof typeof icons;
export type IconMessages = keyof typeof message_icons;

defineProps<{ name: IconName }>();
</script>

<template>
  <component :is="icons[name]" />
</template>
