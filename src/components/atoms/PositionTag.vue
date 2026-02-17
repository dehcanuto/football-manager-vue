<script setup lang="ts">
import { Position } from "@/models/team";
import { positionName } from "@constants/team";

defineProps<{ position: Position }>();
</script>

<template>
  <span
    class="badge tooltip tooltip-bottom"
    :data-tip="positionName[position]"
    :class="{
      'badge-error': position === 'FWD',
      'badge-warning': position === 'MID',
      'badge-info': position === 'DEF',
      'badge-neutral': position === 'GK',
    }"
  >
    {{ position }}
  </span>
</template>
