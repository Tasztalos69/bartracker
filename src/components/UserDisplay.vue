<script setup lang="ts">
import { OAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useCurrentUser, useFirebaseAuth } from "vuefire";
import { UserCircleIcon, LogoutIcon } from "vue-tabler-icons";
import store from "@/store";

const auth = useFirebaseAuth()!;
const user = useCurrentUser();

const provider = new OAuthProvider("oidc.wanter-id");

const login = () => {
  store.isUserLoading = true;
  signInWithPopup(auth, provider).finally(() => (store.isUserLoading = false));
};

const logout = () => {
  signOut(auth);
};
</script>

<template>
  <div class="user-loading" v-if="user === undefined">
    <UserCircleIcon />
    <span />
  </div>
  <div class="user-unauth" v-if="user === null" @click="login">
    <UserCircleIcon />
    <p>Log in</p>
  </div>
  <div class="user" v-if="user">
    <img v-if="user.photoURL" :src="user.photoURL" />
    <UserCircleIcon v-else />
    <h4>{{ user.email }}</h4>
    <button @click="logout"><LogoutIcon /></button>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/variables";

.user,
.user-loading,
.user-unauth {
  background: $bg-dark;
  padding: 10px 15px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;

  svg {
    margin-right: 10px;
  }

  p {
    font-weight: 700;
  }
}

.user-loading {
  position: relative;
  justify-content: stretch;

  * {
    animation: breathe 1s infinite ease-in-out;
  }
  svg {
    opacity: 0.5;
  }
  span {
    display: block;
    width: 70%;
    height: 20px;
    background: $grey;
    border-radius: 9999px;
    opacity: 1;
  }
}

.user {
  h4 {
    flex-grow: 1;
    font-weight: 600;
  }

  img {
    width: 28px;
    height: 28px;
    border-radius: 9999px;
    margin-right: 10px;
  }

  button {
    width: 24px;
    height: 24px;
  }
}

@keyframes breathe {
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 0.4;
  }
}
</style>
