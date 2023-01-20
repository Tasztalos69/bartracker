<script setup lang="ts">
import CTA from "@/components/CTA.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="container">
    <h2>Visit added!</h2>
    <CTA variant="primary" @click="router.push('/')">Home</CTA>
  </div>
</template>

<style scoped lang="scss">
.container {
  text-align: center;
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 30px;
    font-weight: 700;
  }

  .cta {
    flex-grow: 0;
  }
}
</style>
