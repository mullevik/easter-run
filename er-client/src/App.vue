<template>
  <header>Bunny detector 3000</header>

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

import { defineComponent, ref, onMounted, onBeforeUnmount, type Ref } from 'vue'
import { headingDistanceTo, normalizeHeading, type LatLon } from 'geolocation-utils'
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
    const mHeading: Ref<number | null> = ref(null)
    const chargeStore = useChargeStore()

    let lastDevicePosition: LatLon | null = null

    let timer: NodeJS.Timeout | null = null

    onMounted(() => {
      timer = setInterval(onGameTick, CHARGE_UPDATE_INTERVAL)
    })

    onBeforeUnmount(() => {
      if (timer) {
        clearInterval(timer)
      }
    })

    const onGameTick = () => {
      if (mSignalStrength.value >= REQUIRED_SIGNAL_STRENGTH) {
        chargeStore.addCharge()
      } else {
        chargeStore.decreaseCharge()
      }
      console.debug(`Charge: ${chargeStore.charge}`)

      if (lastDevicePosition) {
        const goal = SMALL_TRACK.targetAt(new Date()) // temporary use of the small track scenario
        const headingDistance = headingDistanceTo(lastDevicePosition, goal)
        console.debug(`Last device position: ${lastDevicePosition}`)
        console.debug(`Signal strength: ${mSignalStrength.value}`)
        console.debug(`Heading: ${mHeading.value}`)
        mSignalStrength.value = signalStrength(headingDistance.distance)
        mHeading.value = normalizeHeading(headingDistance.heading)
      } else {
        console.debug(`No last device position => resetting`)

        mHeading.value = null
        mSignalStrength.value = 0
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          lastDevicePosition = { lat: position.coords.latitude, lon: position.coords.longitude }
          console.debug(`New position update: ${lastDevicePosition}`)
        },
        (error) => {
          console.error('Error getting location (resetting device location):', error)
          lastDevicePosition = null
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
