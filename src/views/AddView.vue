<script setup lang="ts">
/*global google */
import { BOUNDS } from "@/constants";
import { ref, type Ref } from "vue";
import PlaceCard from "@/components/ResultCard.vue";
import FormInput from "@/components/FormInput.vue";
import CTA from "@/components/CTA.vue";
import { useRouter } from "vue-router";
import store from "@/store";
import type { Place, VisitUpload } from "@/types";
import { useCurrentUser, useFirestore } from "vuefire";
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  GeoPoint,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import loader from "@/useLoader";

const router = useRouter();
const db = useFirestore();
const user = useCurrentUser();

const searchOptions = {
  bounds: BOUNDS,
};

let queryString = "";
let results: Ref<google.maps.places.PlaceResult[] | null> = ref(null);

let TO: any;

// Only search 0.5s after last keystroke
const handleChange = () => {
  clearTimeout(TO);
  TO = setTimeout(handleQuery, 500);
};

const handleQuery = async () => {
  if (queryString.length === 0) {
    results.value = null;
    selected.value = null;
    return;
  }
  service.textSearch(
    {
      query: queryString,
      ...searchOptions,
    },
    (res) => {
      results.value = res ? res.slice(undefined, 5) : [];
      if (!results.value.some((r) => r.place_id === selected.value)) {
        selected.value = null;
      }
    }
  );
};

let service: google.maps.places.PlacesService;

loader.importLibrary("places").then(({ PlacesService }) => {
  if (!store.map) return;
  service = new PlacesService(store.map);
});

let selected = ref<google.maps.places.PlaceResult | null>(null);

const handleSelect = (result: google.maps.places.PlaceResult | null) => {
  if (result === selected.value) {
    selected.value = null;
  } else {
    selected.value = result;
  }
};

const handleSubmit = async () => {
  const { name, formatted_address, geometry, place_id } = selected.value!;
  const now = Timestamp.fromMillis(Date.now());

  const filtered: Place = {
    name,
    formatted_address,
    place_id,
    coords: new GeoPoint(
      geometry?.location?.lat() ?? 0,
      geometry?.location?.lng() ?? 0
    ),
  };

  const placeIds = (await getDocs(collection(db, "places"))).docs.map(
    (d) => (d.data() as Place).place_id
  );

  // If the place doesn't exist, create it
  if (!placeIds.includes(selected.value?.place_id)) {
    await setDoc(doc(db, "places", place_id!), filtered);
  }

  const visitObj: VisitUpload = {
    date: now,
    place: doc(db, "places", place_id!) as DocumentReference<Place>,
    userId: user.value!.uid,
  };

  await addDoc(collection(db, "visits"), visitObj);

  router.push("/add/success");
};
</script>

<template>
  <h2>Add a visit</h2>
  <FormInput
    class="place-input"
    name="query"
    label="Place name"
    placeholder="Heaven"
    v-model="queryString"
    @input="handleChange"
  />
  <div class="predictions">
    <h5 v-if="results === null">Start typing to search places</h5>
    <h5 v-else-if="results.length === 0">
      That did not match anything. Sorry.
    </h5>
    <PlaceCard
      v-else
      v-for="r in results"
      :key="r.place_id"
      :place="(r as Place)"
      :selected="selected?.place_id === r.place_id"
      @select="() => handleSelect(r ?? null)"
      :visitCount="
        store.places
          .filter((p) => p.place_id === r.place_id)
          .flatMap((p) => p.visits).length
      "
    />
  </div>
  <div class="actions">
    <CTA variant="secondary" @click="router.push('/')">Go back</CTA>
    <CTA
      type="submit"
      variant="primary"
      @click="handleSubmit"
      :disabled="!selected"
      >Save visit!</CTA
    >
  </div>
</template>

<style scoped lang="scss">
h2 {
  font-weight: 700;
}

.place-input {
  margin-top: 10px;
}

h5 {
  text-align: center;
  font-size: 1rem;
  font-style: italic;
}

.predictions {
  max-height: 50vh;
  overflow: scroll;
}

.actions {
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: calc(100% - 20px);
  display: flex;
  gap: 10px;
  align-items: stretch;
  justify-content: center;
}
</style>
@/useLoader
