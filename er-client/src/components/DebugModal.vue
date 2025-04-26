<template>
  <button @click="open = true">Debug</button>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <div class="modal-content">
        <div style="text-align: right">
          <button @click="open = false">Close</button>
        </div>
        <p>UserAgent: {{ userAgent }}</p>
        <p>LastEvent:</p>
        <pre><code>{{ lastEventJSON }}</code></pre>
        <p>Last update at: {{ lastUpdateTime }}</p>

        <p>Status message: {{ statusMessage }}</p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { cleanOrientation, setupOrientation } from '@/orientation'
import { onBeforeUnmount, onMounted, ref, defineProps } from 'vue'

defineProps({
  statusMessage: String,
})
const handleOrientation = (event: DeviceOrientationEvent) => {
  const customEvent = {
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma,
    absolute: event.absolute,
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    webkitCompassHeading: (event as any).webkitCompassHeading,
  }
  lastEventJSON.value = JSON.stringify(customEvent, null, 2)

  lastUpdateTime.value = new Date().toLocaleTimeString()
}
onMounted(() => {
  setupOrientation(handleOrientation, (msg) => {
    console.error(msg)
  })
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
.modal-content {
  background-color: rgba(240, 240, 240, 0.9);
}

.error {
  color: brown;
}
</style>
