<template>
  <svg width="100%" height="200" viewBox="0 0 200 200">
    <g id="compass" :transform="`translate(100, 100) rotate(${rotation})`">
      <!-- Circle stroke -->
      <circle
        cx="0"
        cy="0"
        r="90"
        fill="white"
        stroke="black"
        stroke-width="2"
        stroke-opacity="1"
      />
      <!-- "N" character -->
      <text x="0" y="-65" text-anchor="middle" font-family="Arial" font-size="24" fill="black">
        N
      </text>
      <g id="needle" :transform="`rotate(${bearing})`">
        <!-- Compass needle -->
        <polygon points="0,15 -10,5 0,-80 10,5" fill="#ab0202" />
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

export default {
  props: {
    bearing: {
      type: Number,
      default: 0,
    },
  },

  setup() {
    const rotation = ref(0)

    const setRotation = (rot: number) => {
      rotation.value = rot
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      console.log('orientation event')
      console.log(event)
      if (event.alpha !== null && event.alpha !== undefined) {
        rotation.value = 360 - event.alpha
      } else {
        rotation.value = 0
      }
    }

    onMounted(() => {
      if (!window.DeviceOrientationEvent) {
        console.error('Device orientation not supported')
      } else {
        window.addEventListener('deviceorientation', handleOrientation)
        console.log('Orientation handling mounted')
      }
    })

    onBeforeUnmount(() => {
      window.removeEventListener('deviceorientation', handleOrientation)
      console.log('Orientation handling unmounted')
    })

    return {
      rotation,
      setRotation,
    }
  },
}
</script>
