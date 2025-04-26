<template>
  <button @click="open = true">Manual</button>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <div class="modal-content">
        <div style="text-align: right">
          <button @click="open = false">Close</button>
        </div>
        <h3>Tessertrack 5S</h3>
        <p>
          The Tessertrack 5S is a precision instrument designed to locate and capture
          high-dimensional entities.
        </p>

        <h4>The Compass</h4>
        <p>
          The red compass needle indicates the direction of the nearest high-dimensional entity.
        </p>
        <p class="error">
          If the compass needle begins spinning rapidly, the device may be malfunctioning. Please
          contact maintenance immediately.
        </p>
        <p>
          The <strong>N</strong> symbol on the compass should always align with true north when the
          device is held horizontally.
        </p>
        <p class="error">
          If the <strong>N</strong> symbol does not point to north, the device may be compromised.
          Contact maintenance for assistance.
        </p>

        <h4>Signal Strength</h4>
        <p>
          This indicator reflects your proximity to the high-dimensional entity. Due to the
          dimensional conversion process, signal strength is derived through a
          <strong>non-linear</strong> function. However, the value will always decrease as your
          distance from the target increases. A higher signal strength value indicates closer
          proximity to the entity.
        </p>
        <p>
          If you are too far from the target, signal strength may fall below the visible threshold.
          Despite this, the compass will continue to indicate the direction of the nearest
          high-dimensional entity.
        </p>

        <h4>Charge</h4>
        <p>
          The charge indicator displays the device's current energy level. A full charge is required
          to successfully capture a high-dimensional entity.
        </p>
        <p>
          To charge the device, remain within close proximity to a high-dimensional entity. Signal
          strength must be above {{ REQUIRED_SIGNAL_STRENGTH }}% for charging to occur. If the
          signal strength falls below {{ REQUIRED_SIGNAL_STRENGTH }}%, the device will gradually
          lose charge.
        </p>
        <p>
          Once fully charged, the device will automatically capture the nearest high-dimensional
          target. The entity will be displayed along with some important information about them.
          Make sure to <strong>read and remember</strong> this information.
        </p>

        <h4>Supported entities</h4>
        <p>
          Here are some examples of high-dimensional entities that can be captured using this
          device:
        </p>

        <p><strong>Tidy Tails</strong> - the eco-friendly bunny.</p>
        <img :src="`${base}tidy_tails.png`" class="example-image" />

        <p>
          <strong>Woolie Wheels</strong> - she's just a scater lamb, she said see you later, fam!
        </p>
        <img :src="`${base}woolie.png`" class="example-image" />

        <p>... and more.</p>

        <div style="text-align: right">
          <button @click="open = false">Close</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { REQUIRED_SIGNAL_STRENGTH } from '../track'

const open = ref(false)
const base = import.meta.env.BASE_URL
</script>

<style scoped>
.modal-content {
  background-color: rgba(210, 210, 215, 0.9);
}

.error {
  color: brown;
}

.example-image {
  max-width: min(100px, 100%);
}
</style>
