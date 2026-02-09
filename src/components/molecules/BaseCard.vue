<script setup lang="ts">
const props = defineProps<{
  centerTitle?: boolean;
  variant?: "glass" | "primary" | "default" | "black" | "messageImage" | "stadiumImage";
  bgImage?: string;
}>();

const variants = {
  glass: "glass",
  primary: "bg-primary text-primary-content",
  default: "bg-neutral text-neutral-content",
  black: "bg-base-100",
  messageImage:
    "bg-center bg-cover text-white bg-[url('@/assets/images/bg-messages.png')]",
  stadiumImage:
    "bg-center bg-cover text-white bg-[url('@/assets/images/bg-stadium.jpg')]",
};
</script>

<template>
  <div
    class="card h-fit shadow-xl relative overflow-hidden"
    :class="variants[variant || 'default']"
  >
    <div
      v-if="props.variant === 'stadiumImage' || props.variant === 'messageImage'"
      class="absolute inset-0 pointer-events-none bg-black/80"
    ></div>

    <figure v-if="$slots.image" class="relative z-10">
      <slot name="image" />
    </figure>

    <div class="card-body relative z-10">
      <h2
        class="card-title uppercase mb-3"
        :class="{
          'text-center justify-center': centerTitle,
          'text-base-100': props.variant === 'primary',
          'text-primary': props.variant !== 'primary',
        }"
      >
        <slot name="title" />
      </h2>

      <div class="text-content">
        <slot name="content" />
      </div>

      <div class="card-actions justify-end">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
