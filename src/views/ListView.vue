<script setup lang="ts">
import { useRouter } from "vue-router";
import store from "@/store";
import CTA from "@/components/CTA.vue";
import PlaceCard from "@/components/PlaceCard.vue";
import { ref, watch } from "vue";
import { SearchIcon } from "vue-tabler-icons";

const router = useRouter();

const search = ref("");

const filtered = ref(store.places);

watch(
  () => store.places,
  () => {
    filtered.value = store.places;
  },
  { deep: true }
);

watch(search, () => {
  if (!search.value) {
    filtered.value = store.places;
  } else {
    filtered.value = store.places.filter((p) =>
      p.name?.toLowerCase().includes(search.value.toLowerCase())
    );
  }
});
</script>

<template>
  <h2>List places</h2>
  <div class="input-wrapper">
    <SearchIcon class="icon" size="24" />
    <input v-model="search" placeholder="Search" />
  </div>
  <div class="places-wrapper">
    <div class="places">
      <PlaceCard v-for="p in filtered" :key="p.place_id" :place="p"></PlaceCard>
    </div>
  </div>
  <CTA variant="secondary" @click="router.push('/')">Go back</CTA>
</template>

<style scoped lang="scss">
@import "@/styles/variables";

h2 {
  font-weight: 700;
}

.input-wrapper {
  position: relative;

  .icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: $text;
    opacity: 0.4;
  }

  input {
    background: $bg-dark;
    padding: 10px 15px;
    padding-left: 45px;
    border-radius: 7px;
    margin: 10px 0;
    font-size: 1rem;
    width: calc(100% - 15px - 45px);
    color: $text;
    font-weight: 600;
  }
}

.places-wrapper {
  overflow-y: auto;
  /* max-height: 500px; */
}

.place-card:last-of-type {
  margin-bottom: 0;
}

.cta {
  margin-bottom: 10px;
}
</style>
