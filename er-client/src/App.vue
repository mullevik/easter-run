<template>
  <header>
    <h1>Tessertrack 5S</h1>
    <div class="buttons">
      <PermissionModal
        :open="mAskForPermission"
        :subject="'location'"
        :event-setup="mSetupLocation"
      ></PermissionModal>
      <HelpModal></HelpModal>
      <DebugModal :statusMessage="mLocationMessage"></DebugModal>
      <CapturedModal></CapturedModal>
    </div>
  </header>
  <main>
    <CompassDevice :bearing="mHeading" />
    <SignalStrengthBar :signalStrength="mSignalStrength" />
    <ChargeBar :charge="chargeStore.charge" />
  </main>
</template>

<script lang="ts">
import ChargeBar from './components/ChargeBar.vue'
import HelpModal from './components/HelpModal.vue'
import DebugModal from './components/DebugModal.vue'
import CapturedModal from './components/CapturedModal.vue'
import PermissionModal from './components/PermissionModal.vue'
import SignalStrengthBar, { REQUIRED_SIGNAL_STRENGTH } from './components/SignalStrengthBar.vue'
import CompassDevice from './components/CompassDevice.vue'

import { defineComponent, ref, onMounted, onBeforeUnmount, type Ref } from 'vue'
import { headingDistanceTo, type LatLon } from 'geolocation-utils'
import { signalStrength } from './track'
import { THE_TRACK } from './scenarios'
import { useChargeStore } from './state'

type milliseconds = number
const CHARGE_UPDATE_INTERVAL: milliseconds = 1000

export default defineComponent({
  components: {
    ChargeBar,
    HelpModal,
    DebugModal,
    SignalStrengthBar,
    CompassDevice,
    CapturedModal,
    PermissionModal,
  },
  setup() {
    const mSignalStrength = ref(0)
    const mHeading: Ref<number | null> = ref(null)
    const chargeStore = useChargeStore()
    const mLocationMessage = ref('Initial state')
    const mAskForPermission = ref(false)

    let lastDevicePosition: LatLon | null = null

    let timer: NodeJS.Timeout | null = null

    onMounted(() => {
      timer = setInterval(onGameTick, CHARGE_UPDATE_INTERVAL)
      mSetupLocation() // try to setup location on mount
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
        const goal = THE_TRACK.targetAt(new Date()) // temporary use of the small track scenario
        const headingDistance = headingDistanceTo(lastDevicePosition, goal)
        console.debug(`Last device position: ${lastDevicePosition}`)
        console.debug(`Signal strength: ${mSignalStrength.value}`)
        console.debug(`Heading: ${mHeading.value}`)
        mSignalStrength.value = signalStrength(headingDistance.distance)
        mHeading.value = headingDistance.heading
      } else {
        console.debug(`No last device position => resetting`)

        mHeading.value = null
        mSignalStrength.value = 0
      }
    }

    const mSetupLocation = () => {
      if (navigator.geolocation) {
        mLocationMessage.value = 'Request for watchPosition initiated'

        navigator.geolocation.watchPosition(
          (position) => {
            lastDevicePosition = { lat: position.coords.latitude, lon: position.coords.longitude }
            console.debug(`New position update: ${lastDevicePosition}`)
            mLocationMessage.value = 'Got some device position'
            mAskForPermission.value = false
          },
          (error) => {
            console.error('Error getting location (resetting device location):', error)
            lastDevicePosition = null
            mLocationMessage.value = `Error getting location: '${error}'`
            mAskForPermission.value = true
          },
          { enableHighAccuracy: true, timeout: 5000 },
        )
      } else {
        console.error('Geolocation is not supported by this browser.')
        mLocationMessage.value = 'Geolocation is not supported at all'
        mAskForPermission.value = true
      }
    }

    return {
      mSignalStrength,
      mHeading,
      chargeStore,
      mSetupLocation,
      mLocationMessage,
      mAskForPermission,
    }
  },
})
</script>

<style scoped>
.buttons {
  font-size: small;
}
</style>
