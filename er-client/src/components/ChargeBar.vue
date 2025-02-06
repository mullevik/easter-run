<template>
  <div class="container">
    <p>Charge:</p>
    <progress
      :value="charge"
      max="100"
      :style="{ color: `var(--bar-color)`, backgroundColor: `${color}` }"
    />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'

export default {
  props: {
    charge: {
      type: Number,
      default: 0,
    },
    isCharging: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const color = computed(() => {
      if (props.isCharging) {
        return '#afa'
      }
      return '#faa'
    })

    return {
      color,
    }
  },
}
</script>
