<script setup lang="ts">
import { computed } from "vue";

export interface ColumnType {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  width?: string;
  class?: string;
}

const props = defineProps<{
  columns: ColumnType[];
  rows: Record<string, any>[];
  hoverable?: boolean;
  bordered?: boolean;
}>();

const tableClass = computed(() => [
  "table w-full text-sm",
  props.bordered ? "table-zebra" : "",
]);
</script>

<template>
  <div class="overflow-x-auto">
    <table :class="tableClass">
      <thead>
        <tr class="text-gray-400">
          <th
            v-for="col in columns"
            :key="col.key"
            :style="{ width: col.width }"
            :class="[
              col.class,
              col.align === 'center'
                ? 'text-center'
                : col.align === 'right'
                  ? 'text-right'
                  : 'text-left',
            ]"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in rows"
          :key="row.id || rowIndex"
          :class="props.hoverable ? 'hover:bg-base-200 transition-colors' : ''"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            :class="[
              col.align === 'center'
                ? 'text-center'
                : col.align === 'right'
                  ? 'text-right'
                  : 'text-left',
              col.class,
            ]"
          >
            <slot :name="`cell-${col.key}`" :row="row">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
