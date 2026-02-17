<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import { MenuItem } from "@/models/menu";
import Icon from "@components/atoms/Icon.vue";

defineProps<{
  items: MenuItem[];
  className?: string;
}>();

function handleClickOutside(event: MouseEvent) {
  const openMenus = document.querySelectorAll("details[open]");
  openMenus.forEach((menu) => {
    if (!menu.contains(event.target as Node)) {
      menu.removeAttribute("open");
    }
  });
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
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
        <summary class="hover:text-primary cursor-pointer">
          <Icon v-if="item?.icon" :name="item.icon" />
          {{ item.label }}
        </summary>
        <ul class="p-2 z-10 bg-base-200 rounded-md">
          <li v-for="subitem in item.children" :key="subitem.path">
            <RouterLink
              :to="subitem.path"
              class="block hover:text-primary"
              @click="
                ($event.currentTarget as HTMLElement)
                  ?.closest('details')
                  ?.removeAttribute('open')
              "
            >
              {{ subitem.label }}
            </RouterLink>
          </li>
        </ul>
      </details>
    </li>
  </ul>
</template>
