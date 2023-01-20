<script setup lang="ts">
import CTA from "@/components/CTA.vue";
import PlaceCard from "@/components/PlaceCard.vue";
import UserDisplay from "@/components/UserDisplay.vue";
import type { Place } from "@/types";
import { collection, doc } from "firebase/firestore";
import { RouterLink } from "vue-router";
import { PlusIcon, ArrowNarrowRightIcon } from "vue-tabler-icons";
import { useDocument, useFirestore } from "vuefire";

const db = useFirestore();

const latest = useDocument<Place>(doc(collection(db, "latest"), "latest"));
</script>

<template>
  <UserDisplay />
  <div class="latest" v-if="latest">
    <h3>Your latest visit:</h3>
    <PlaceCard :place="(latest as Place)" hideVisits />
    <RouterLink to="list" class="list"
      ><CTA variant="secondary">View all <ArrowNarrowRightIcon /></CTA
    ></RouterLink>
  </div>
  <RouterLink to="add" class="add"><PlusIcon />Record visit</RouterLink>
</template>

<style scoped lang="scss">
@import "@/styles/variables";

.latest {
  h3 {
    margin-top: 30px;
    font-weight: 600;
  }

  .place-card {
    margin-top: 10px;
  }

  .cta {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none !important;

    .icon-tabler {
      margin-left: 10px;
    }
  }
}

.add {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 20px);
  padding: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: $text;
  color: $bg;
  font-weight: 600;
  font-size: 1rem;
  transition: $transition-short;
  text-decoration: none;

  svg {
    color: inherit;
    margin-right: 10px;
  }

  &:hover {
    background: $text-light;
  }
}
</style>
