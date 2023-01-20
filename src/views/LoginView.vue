<script setup lang="ts">
import CTA from "@/components/CTA.vue";
import FormInput from "@/components/FormInput.vue";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCurrentUser, useFirebaseAuth } from "vuefire";

const route = useRoute();
const router = useRouter();

const auth = useFirebaseAuth()!;

const to =
  route.query.redirectTo && typeof route.query.redirectTo === "string"
    ? route.query.redirectTo
    : "/";

onMounted(async () => {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    router.push(to);
  }
});

let email = "";
let password = "";

const login = async (e: Event) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
  router.push(to);
};
</script>

<template>
  <form @submit="login">
    <FormInput
      type="email"
      name="email"
      v-model="email"
      placeholder="john.doe@wanter.dev"
      required
    />
    <FormInput
      type="password"
      name="password"
      v-model="password"
      placeholder="Never tell anyone"
      required
    />
    <div class="actions">
      <CTA variant="secondary" @click="router.back()">Go back</CTA>
      <CTA type="submit" variant="primary">Log in!</CTA>
    </div>
  </form>
</template>

<style scoped lang="scss">
@import "@/styles/variables";

form {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  padding: 20px;
}

.actions {
  display: flex;
  gap: 10px;
  align-self: stretch;
  align-items: stretch;
  justify-content: center;
}
</style>
