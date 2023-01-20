<script setup lang="ts">
import type { Timestamp } from "firebase/firestore";
import { ref, type PropType } from "vue";
import { XIcon } from "vue-tabler-icons";
import { useCurrentUser } from "vuefire";

const user = useCurrentUser();

const props = defineProps({
  visit: { type: Object as PropType<Timestamp>, required: true },
});

const emit = defineEmits(["delete"]);

const deleteMode = ref(false);

const handleDelete = () => {
  if (!deleteMode.value) {
    deleteMode.value = true;
    setTimeout(() => (deleteMode.value = false), 5000);
    return;
  }

  emit("delete");
};
</script>

<template>
  <li>
    {{ props.visit.toDate().toLocaleDateString("hu-HU") }}
    <button type="button" @click="handleDelete">
      <XIcon v-if="user" :class="{ confirm: deleteMode }" />
    </button>
  </li>
</template>

<style scoped lang="scss">
@import "@/styles/variables";

li {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
  font-style: italic;

  &::before {
    content: "";
    width: 5px;
    height: 5px;
    position: absolute;
    left: -10px;
    top: 50%;
    transform: translate(-100%, -50%);
    background: $text;
    border-radius: 9999px;
  }

  button svg {
    transition: $transition-short;

    &.confirm {
      color: red;
    }
  }
}
</style>
