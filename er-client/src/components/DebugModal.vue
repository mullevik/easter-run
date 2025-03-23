<template>
  <button @click="open = true">Debug</button>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <div style="text-align: right">
        <button @click="open = false">Close</button>
      </div>
      <p>UserAgent: {{ userAgent }}</p>
      <p>Last event: {{ lastEventJSON }}</p>
      <p>Last update at: {{ lastUpdateTime }}</p>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { cleanOrientation, setupOrientation } from '@/orientation'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const handleOrientation = (event: DeviceOrientationEvent) => {
  const customEvent = {
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma,
    absolute: event.absolute,
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    webkitCompassHeading: (event as any).webkitCompassHeading,
  }
  lastEventJSON.value = JSON.stringify(customEvent)

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
  box-sizing: border-box;
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
