<script setup lang="ts">
import CTA from "@/components/CTA.vue";
import PlaceCard from "@/components/PlaceCard.vue";
import UserDisplay from "@/components/UserDisplay.vue";
import type { Visit } from "@/types";
import { collection, limit, orderBy, query, where } from "firebase/firestore";
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { PlusIcon, ArrowNarrowRightIcon, Loader2Icon } from "vue-tabler-icons";
import { useCollection, useCurrentUser, useFirestore } from "vuefire";
import store from "../store";

const db = useFirestore();
const user = useCurrentUser();

const visitsRef = collection(db, "visits");

const visitSource = computed(() =>
  user.value
    ? query(
        visitsRef,
        where("userId", "==", user.value.uid),
        orderBy("date", "desc"),
        limit(1)
      )
    : null
);

const visits = useCollection<Visit>(visitSource);
</script>

<template>
  <UserDisplay />

  <div class="loader" v-if="store.isUserLoading">
    <Loader2Icon size="48" />
  </div>
  <div class="latest" v-else-if="user && visits && visits[0]">
    <h3>Latest visit:</h3>
    <PlaceCard :place="{ ...visits[0].place, visits: [] }" hideVisits />
    <RouterLink to="list" class="list">
      <CTA variant="secondary"> View all <ArrowNarrowRightIcon /> </CTA>
    </RouterLink>
  </div>
  <div v-else-if="!user" class="invite">
    <img src="/bak.png" />
  </div>

  <!-- Add btn -->
  <RouterLink to="add" class="add" v-if="user">
    <PlusIcon />Record visit
  </RouterLink>
</template>

<style scoped lang="scss">
@import "@/styles/variables";

.latest {
  h3 {
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

.invite,
.loader {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  text-align: center;

  //h5 {
  //  font-weight: 700;
  //  text-align: center;
  //  font-size: 1.3rem;
  //  line-height: 1.6rem;
  //  color: $text-light;
  //  font-style: italic;
  //}

  img {
    display: inline-block;
    width: 100px;
    object-fit: cover;
    opacity: 0.2;
  }
}
@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loader .icon-tabler {
  opacity: 0.8;
  animation: rotating 1s linear infinite;
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
