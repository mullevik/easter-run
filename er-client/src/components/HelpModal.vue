<template>
  <button @click="open = true">Help</button>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <div style="text-align: right">
        <button @click="open = false">Close</button>
      </div>

      <h3>Tesser-grab 3000</h3>
      <p>Track down and capture high-dimensional beings using ordinary smartphone.</p>

      <h4>The compass</h4>
      <p>
        The red compass needle always points to the direction of the closest high-dimensional being.
      </p>
      <p class="error">
        If the compass needle spins rapidly, there is a problem with your device and you should
        contact maintenance.
      </p>
      <p>
        The <strong>N</strong> symbol on the compass should always point to north when the device is
        held in a horizontal position.
      </p>
      <p class="error">
        If the <strong>N</strong> symbol does not point to the north, there is a problem with your
        device and you should contact maintenance.
      </p>

      <h4>Signal strength</h4>
      <p>
        Shows how close the user is to the high-dimensional entity. The higher the value, the closer
        the entity is to the device.
      </p>
      <p>
        If the user is too far from its target, the signal strength is too low to even display. The
        compass needle, however, should still point in the right direction to the closest
        high-dimensional entity.
      </p>

      <h4>Charge</h4>
      <p>
        The charge shows you the energy level of the device. To capture a high-dimensional being,
        the device needs to be fully charged.
      </p>
      <p>
        To charge the device, position your self near the target high-dimensional being. The signal
        strength must be above {{ REQUIRED_SIGNAL_STRENGTH }} % to gain charge. When the signal
        strength is below {{ REQUIRED_SIGNAL_STRENGTH }} %, the device loses charge over time.
      </p>
      <p>
        Once the device is fully charged, it captures the closest high-dimensional target
        automatically.
      </p>

      <div style="text-align: right">
        <button @click="open = false">Close</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { REQUIRED_SIGNAL_STRENGTH } from './SignalStrengthBar.vue'

const open = ref(false)
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
