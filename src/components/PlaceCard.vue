<script setup lang="ts">
import type { PropType } from "vue";
import type { Place } from "@/types";
import {
  collection,
  deleteDoc,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useFirestore } from "vuefire";
import PlaceCardVisit from "./PlaceCardVisit.vue";

const props = defineProps({
  place: { type: Object as PropType<Place>, required: true },
  hideVisits: { type: Boolean, default: false },
});

const db = useFirestore();

const handleDelete = (ts: Timestamp) => {
  const docRef = doc(collection(db, "places"), props.place?.place_id);
  if (props.place.visits.length === 1) {
    deleteDoc(docRef);
  } else {
    updateDoc(docRef, {
      visits: props.place.visits.filter(
        (v) => v.toDate().getTime() !== ts.toDate().getTime()
      ),
    });
  }
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
        :key="v.toString()"
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
