<script setup lang="ts">
defineProps<{
  items: MenuItem[];
  className?: string;
}>();
</script>

<template>
  <ul :class="className">
    <li v-for="item in items" :key="item.path">
      <RouterLink :to="item.path" v-if="!item.children">
        {{ item.label }}
      </RouterLink>
      <details v-else>
        <summary>{{ item.label }}</summary>
        <ul class="p-2">
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
