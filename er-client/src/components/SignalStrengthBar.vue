<template>
  <div class="container">
    <p>Signal strength</p>
    <progress :value="signalStrength" max="100" />
    <div class="measure-wrapper">
      <div class="measure" :style="`width: ${REQUIRED_SIGNAL_STRENGTH}%`"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
export const REQUIRED_SIGNAL_STRENGTH: number = 50

export default {
  props: {
    signalStrength: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const isCloseEnough = computed(() => props.signalStrength >= REQUIRED_SIGNAL_STRENGTH)

    return {
      isCloseEnough,
      REQUIRED_SIGNAL_STRENGTH,
    }
  },
}
</script>

<style>
.measure-wrapper {
  position: relative;
}

.measure {
  height: 20px;
  border-right: 2px rgb(82, 82, 82) solid;
  position: absolute;
  top: -21px;
}
</style>
