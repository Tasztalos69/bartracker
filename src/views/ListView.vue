<script setup lang="ts">
import { useRouter } from "vue-router";
import store from "@/store";
import CTA from "@/components/CTA.vue";
import PlaceCard from "@/components/PlaceCard.vue";

const router = useRouter();
</script>

<template>
  <h2>List places</h2>
  <div class="places">
    <PlaceCard
      v-for="p in store.places"
      :key="p.place_id"
      :place="p"
    ></PlaceCard>
  </div>
  <CTA variant="secondary" @click="router.push('/')">Go back</CTA>
</template>

<style scoped lang="scss">
h2 {
  font-weight: 700;
}

.places {
  margin-top: 20px;
  overflow: scroll;
  max-height: 70%;
}

.place-card:last-of-type {
  margin-bottom: 0;
}
.cta {
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: calc(100% - 20px);
}
</style>
