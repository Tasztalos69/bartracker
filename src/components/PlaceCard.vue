<script setup lang="ts">
import type { PropType } from "vue";
import type { CompoundPlace, Visit } from "@/types";
import { deleteDoc, doc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import PlaceCardVisit from "./PlaceCardVisit.vue";

const props = defineProps({
  place: { type: Object as PropType<CompoundPlace>, required: true },
  hideVisits: { type: Boolean, default: false },
});

const db = useFirestore();

const handleDelete = (deleted: Visit) => {
  deleteDoc(doc(db, "visits", deleted.id));
};
</script>

<template>
  <div class="place-card">
    <h3>{{ props.place.name }}</h3>
    <h4>{{ props.place.formatted_address }}</h4>
    <ul v-if="!props.hideVisits">
      <PlaceCardVisit
        v-for="v in props.place.visits"
        :visit="v"
        :key="v.date.toMillis()"
        @delete="() => handleDelete(v)"
      />
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables";
.place-card {
  margin-bottom: 20px;
  padding: 10px;
  border: 2px solid $text;
  border-radius: 7px;
  transition: $transition-short;

  h3 {
    flex-grow: 1;
    font-weight: 700;
    max-width: 90%;
  }

  h4 {
    margin-top: 10px;
  }

  ul {
    margin-left: 20px;
  }

  p {
    margin-top: 20px;
    text-align: right;

    b {
      font-weight: 600;
    }
  }
}
</style>
