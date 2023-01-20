<script setup lang="ts">
import { CircleIcon } from "vue-tabler-icons";
import type { PropType } from "vue";
import type { Place } from "@/types";

const props = defineProps({
  place: { type: Object as PropType<Place> },
  visitCount: Number,
  selected: { type: Boolean, default: false },
});
</script>

<template>
  <div
    class="result-card"
    :class="{ selected: props.selected }"
    @click="$emit('select')"
  >
    <div class="top-bar">
      <div class="circle-wrapper">
        <CircleIcon size="24" />
      </div>
      <h3>{{ place?.name }}</h3>
    </div>
    <h4>{{ place?.formatted_address }}</h4>
    <p v-if="props.visitCount">
      Visits: <b>{{ props.visitCount }}</b>
    </p>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables";
.result-card {
  margin-bottom: 20px;
  padding: 10px;
  border: 2px solid $text;
  border-radius: 7px;
  transition: $transition-short;
  cursor: pointer;

  .top-bar {
    display: flex;
    gap: 10px;

    .circle-wrapper {
      position: relative;
      width: 24px;
      height: 24px;

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 30%;
        height: 30%;
        border-radius: 9999px;
        background: $marker;
        transition: $transition-short;
        opacity: 0;
      }
    }

    h3 {
      flex-grow: 1;
      font-weight: 700;
    }
  }

  h4 {
    margin-top: 10px;
  }

  p {
    margin-top: 20px;
    text-align: right;

    b {
      font-weight: 600;
    }
  }
}
.selected {
  border-color: $marker;

  .top-bar .circle-wrapper::after {
    opacity: 1;
  }
}
</style>
