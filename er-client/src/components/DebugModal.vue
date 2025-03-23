<template>
  <button @click="open = true">Debug</button>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>UserAgent: {{ userAgent }}</p>
      <p>Last event: {{ lastEventJSON }}</p>
      <p>Last update at: {{ lastUpdateTime }}</p>
      <button @click="open = false">Close</button>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { cleanOrientation, setupOrientation } from '@/orientation'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const handleOrientation = (event: DeviceOrientationEvent) => {
  lastEventJSON.value = JSON.stringify(event)
  lastUpdateTime.value = new Date().toLocaleTimeString()
}
onMounted(() => {
  setupOrientation(handleOrientation)
})

onBeforeUnmount(() => {
  cleanOrientation(handleOrientation)
})

const open = ref(false)
const userAgent = ref(window.navigator.userAgent)
const lastEventJSON = ref('no data')
const lastUpdateTime = ref('no data')
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* height: 100%; */
  background-color: whitesmoke;
  padding: 3em;
  overflow: scroll;
}

.error {
  color: brown;
}
</style>
