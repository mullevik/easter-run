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
      <g v-if="bearing !== null" id="needle" :transform="`rotate(${bearing})`">
        <!-- Compass needle -->
        <polygon points="0,15 -10,5 0,-80 10,5" fill="#ab0202" />
      </g>
      <g v-else id="needle" class="rotate-animation">
        <!-- Compass needle spinning because of unknown bearing -->
        <polygon points="0,15 -10,5 0,-80 10,5" fill="#ab0202" />
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
import { cleanOrientation, setupOrientation } from '@/orientation'
import { onMounted, onBeforeUnmount, ref } from 'vue'

export default {
  props: {
    bearing: {
      type: [Number, null],
      default: null,
    },
  },

  setup() {
    const rotation = ref(0)

    const handleOrientation = (event: DeviceOrientationEvent) => {
      const alpha: number = event.alpha || 0
      // cast to any because DeviceOrientationEvent has .webkitCompassHeading only on iOS
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      const webkitHeading: number | null = (event as any).webkitCompassHeading
      const rot = webkitHeading || Math.abs(alpha - 360)
      console.debug(
        `alpha=${alpha}, webkit_heading=${webkitHeading}, rot=${rot}, absolute=${event.absolute}`,
      )
      rotation.value = rot
    }

    onMounted(() => {
      setupOrientation(handleOrientation)
    })

    onBeforeUnmount(() => {
      cleanOrientation(handleOrientation)
    })

    return {
      rotation,
    }
  },
}
</script>

<style>
#needle {
  transition: transform 250ms;
}

.rotate-animation {
  animation: rotate 500ms linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
