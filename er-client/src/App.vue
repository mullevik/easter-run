<template>
  <header>Header</header>

  <main>
    <CompassDevice :bearing="mHeading" />
    <SignalStrengthBar :signalStrength="mSignalStrength" />
    <ChargeBar :charge="chargeStore.charge" />
  </main>
</template>

<script lang="ts">
import ChargeBar from './components/ChargeBar.vue'
import SignalStrengthBar, { REQUIRED_SIGNAL_STRENGTH } from './components/SignalStrengthBar.vue'
import CompassDevice from './components/CompassDevice.vue'

import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { headingTo, normalizeHeading } from 'geolocation-utils'
import { signalStrength } from './track'
import { SMALL_TRACK } from './scenarios'
import { useChargeStore } from './state'

type milliseconds = number
const CHARGE_UPDATE_INTERVAL: milliseconds = 1000

export default defineComponent({
  components: {
    ChargeBar,
    SignalStrengthBar,
    CompassDevice,
  },
  setup() {
    const mSignalStrength = ref(0)
    const mHeading = ref(0)
    const chargeStore = useChargeStore()

    let timer: NodeJS.Timeout | null = null

    onMounted(() => {
      timer = setInterval(() => {
        const prevCharge = chargeStore.charge
        if (mSignalStrength.value >= REQUIRED_SIGNAL_STRENGTH) {
          chargeStore.addCharge()
        } else {
          chargeStore.decreaseCharge()
        }
        const nextCharge = chargeStore.charge

        console.debug(`Charge: ${prevCharge} -> ${nextCharge}`)
      }, CHARGE_UPDATE_INTERVAL)
    })

    onBeforeUnmount(() => {
      if (timer) {
        clearInterval(timer)
      }
    })

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const devicePosition = { lat: position.coords.latitude, lon: position.coords.longitude }
          const goal = SMALL_TRACK.targetAt(new Date()) // temporary use of the small track scenario
          mSignalStrength.value = signalStrength(devicePosition, goal)
          mHeading.value = normalizeHeading(headingTo(devicePosition, goal))
          console.debug(`Device position: ${devicePosition}`)
          console.debug(`Signal strength: ${mSignalStrength.value}`)
          console.debug(`Heading: ${mHeading.value}`)
        },
        (error) => {
          console.error('Error getting location:', error)
        },
        { enableHighAccuracy: true, timeout: 5000 },
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }

    return { mSignalStrength, mHeading, chargeStore }
  },
})
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
