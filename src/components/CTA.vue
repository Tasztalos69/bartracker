<script setup lang="ts">
import type { PropType } from "vue";

type ButtonType = "button" | "submit" | "reset";
type ButtonVariant = "primary" | "secondary";

const props = defineProps({
  type: { type: String as PropType<ButtonType>, default: "button" },
  disabled: Boolean,
  variant: { type: String as PropType<ButtonVariant>, required: true },
});
defineEmits(["click"]);
</script>

<template>
  <button
    :disabled="props.disabled"
    class="cta"
    :class="props.variant"
    :type="props.type"
    @click="!props.disabled && $emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
@import "@/styles/variables";

button {
  border: 2px solid $text;
  flex-grow: 1;
  flex-basis: 0;
  padding: 10px 25px;
  border-radius: 7px;
  font-size: 1rem;
  font-weight: 600;
  transition: $transition-short;

  &:hover:not(:disabled) {
    background-color: $bg-dark;
  }

  &:disabled {
    border-color: $grey;
    color: $grey;
    cursor: default;
  }

  &.primary {
    background: $text;
    color: $bg;

    &:disabled {
      border-color: $grey;
      background-color: $grey;
    }

    &:hover:not(:disabled) {
      background: $text-light;
    }
  }

  &.secondary {
    background: $bg;
  }
}
</style>
