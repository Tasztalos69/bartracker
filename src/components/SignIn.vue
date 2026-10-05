<script setup lang="ts">
import UserDisplay from "./UserDisplay.vue";
</script>

<template>
  <main class="signin">
    <div class="intro">
      <h1 class="wordmark">Bartracker</h1>
      <p class="tagline">Track your bar visits across Budapest</p>
    </div>
    <div class="action"><UserDisplay /></div>
  </main>
</template>

<style scoped lang="scss">
@import "@/styles/variables";

.signin {
  min-height: 100vh;
  min-height: 100dvh;
  box-sizing: border-box;
  // Tight on a phone, generous on a desktop -- no breakpoint needed.
  padding: clamp(32px, 7vh, 80px) clamp(24px, 5vw, 64px);
  // The ink colour doubles as a night ground -- bars happen after dark.
  background: linear-gradient(160deg, $text 0%, $text-light 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.wordmark {
  font-family: "Lobster", serif;
  font-size: clamp(3.5rem, 11vw, 8rem);
  line-height: 1;
  color: $bg;
}

.tagline {
  max-width: 34ch;
  font-weight: 300;
  font-size: clamp(1rem, 2.6vw, 1.2rem);
  line-height: 1.6;
  text-wrap: balance;
  color: rgba($bg, 0.68);
}

.action {
  width: min(100%, 17rem);

  :deep(.user-unauth) {
    width: 100%;
    justify-content: center;
    margin-bottom: 0;
    transition: $transition-short;

    &:hover {
      background: $bg;
    }

    &:focus-visible {
      outline: 2px solid $bg;
      outline-offset: 3px;
    }
  }
}
</style>
