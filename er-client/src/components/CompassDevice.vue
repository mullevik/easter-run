<template>
  <svg width="100%" height="200" viewBox="0 0 200 200">
    <g id="compass" :transform="`translate(100, 100) rotate(${-rotation} deg)`">
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
      console.error(`webkit heading ${event.webkitCompassHeading}`)
      console.error(`alpha ${event.alpha}`)
      const rot = event.webkitCompassHeading || Math.abs(event.alpha - 360)
      console.error(`rot ${rot}`)
      rotation.value = rot
    }

    onMounted(() => {
      const isIOS =
        navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)

      if (isIOS) {
        if (
          window.DeviceOrientationEvent &&
          typeof window.DeviceOrientationEvent.requestPermission === 'function'
        ) {
          window.DeviceOrientationEvent.requestPermission()
            .then((response) => {
              if (response === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation, true)
              } else {
                console.error('IOS device orientation was not granted')
              }
            })
            .catch(() => console.error('IOS device orientation unavailable'))
        } else {
          console.error('IOS device orientation unavailable')
        }
      } else {
        if (!window.DeviceOrientationEvent) {
          console.error('Device orientation not supported')
        } else {
          window.addEventListener('deviceorientationabsolute', handleOrientation)
          console.debug('Orientation handling mounted')
        }
      }
    })

    onBeforeUnmount(() => {
      window.removeEventListener('deviceorientation', handleOrientation)
      window.removeEventListener('deviceorientationabsolute', handleOrientation)

      console.debug('Orientation handling unmounted')
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
