<template>
  <div class="container">
    <p>
      Signal strength:
      <span v-if="signalStrength == 0">no signal</span>
      <span v-else-if="signalStrength < 50">weak</span>
      <span v-else>good</span>
    </p>
    <progress :value="signalStrength" max="100" />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'

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
    }
  },
}
</script>
