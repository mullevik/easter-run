<template>
  <div class="container">
    <p>
      Signal strength:
      <span v-if="signalStrength == 0">no signal</span>
      <span v-else-if="signalStrength < REQUIRED_SIGNAL_STRENGTH">weak</span>
      <span v-else>good</span>
    </p>
    <progress :value="signalStrength" max="100" />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
export const REQUIRED_SIGNAL_STRENGTH: number = 75

export default {
  props: {
    signalStrength: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const isCloseEnough = computed(() => props.signalStrength > 50)

    return {
      isCloseEnough,
      REQUIRED_SIGNAL_STRENGTH,
    }
  },
}
</script>
