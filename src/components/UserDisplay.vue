<script setup lang="ts">
import { signOut } from "firebase/auth";
import { useCurrentUser, useFirebaseAuth } from "vuefire";
import { UserCircleIcon, LogoutIcon } from "vue-tabler-icons";

const auth = useFirebaseAuth()!;
const user = useCurrentUser();

const logout = () => signOut(auth);
</script>

<template>
  <div class="user-loading" v-if="user === undefined">
    <UserCircleIcon />
    <span />
  </div>
  <div class="user-unauth" v-if="user === null">
    <UserCircleIcon />
    <RouterLink to="login">Log in</RouterLink>
  </div>
  <div class="user" v-if="user">
    <UserCircleIcon />
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
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
  }

  button {
    width: 24px;
    height: 24px;
    svg {
      margin: 0;
    }
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

.user-unauth {
  a {
    text-decoration: none;
    font-weight: 700;
  }
}

.user {
  h4 {
    flex-grow: 1;
    font-weight: 600;
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
