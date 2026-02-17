<script setup lang="ts">
import { MenuItem } from "@/models/menu";
import Icon from "@components/atoms/Icon.vue";

defineProps<{
  items: MenuItem[];
  className?: string;
}>();
</script>

<template>
  <ul :class="className">
    <li v-for="item in items" :key="item.path">
      <RouterLink
        :to="item.path"
        v-if="!item.children"
        class="hover:text-primary"
      >
        <Icon v-if="item?.icon" :name="item.icon" />
        {{ item.label }}
      </RouterLink>
      <details v-else>
        <summary class="hover:text-primary">
          <Icon v-if="item?.icon" :name="item.icon" />
          {{ item.label }}
        </summary>
        <ul class="p-2 z-10">
          <li v-for="subitem in item.children" :key="subitem.path">
            <RouterLink :to="subitem.path">
              {{ subitem.label }}
            </RouterLink>
          </li>
        </ul>
      </details>
    </li>
  </ul>
</template>
