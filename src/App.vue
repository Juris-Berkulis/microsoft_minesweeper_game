<script setup lang="ts">
import { RouterView } from 'vue-router';
import GoogleAnalytics from './analytics/GoogleAnalytics';
import { isRegisterServiceWorker } from '@/serviceWorker/registrationServiceWorker';
import TheServiceWorkerMessage from './components/TheServiceWorkerMessage.vue';

//* Подключение ServiceWorker:
isRegisterServiceWorker();
//* Подключение Google Analytics:
new GoogleAnalytics();
</script>

<template>
<div class="wrapper">
  <main>
    <RouterView />
  </main>
  <TheServiceWorkerMessage />
</div>
</template>

<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
  padding: min(5vh, 5vw) 0;
}
</style>
