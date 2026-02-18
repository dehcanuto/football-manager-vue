<script setup lang="ts">
import { computed } from "vue";
import { COUNTRIES, CountryProps } from "@/constants/countries";

const props = defineProps<{
  code: string;
  showName?: boolean;
  size?: number;
}>();

const defaultShow = props.showName ?? true;

const countryCode = computed(() => props.code.toUpperCase());
const country = computed<CountryProps>(
  () => COUNTRIES[countryCode.value as keyof typeof COUNTRIES],
);
const flagStyle = computed(() => `size-${props.size ?? 5}`);
</script>

<template>
  <div class="inline-flex items-center gap-2">
    <component
      v-if="country.flag"
      :is="country.flag"
      :class="flagStyle"
      class="rounded-sm"
    />
    <span v-if="defaultShow" class="text-xs text-gray-200">
      {{ country.name }}
    </span>
  </div>
</template>
