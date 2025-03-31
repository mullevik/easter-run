<template>
  <div class="container">
    <p>
      Charge: {{ `${Math.floor(charge)}` }}/100
      <!-- <span v-if="isCharging">▲</span>
      <span v-else-if="isDischarging">▼</span> -->
    </p>
    <progress max="100" :value="charge" :class="`${isDischarging ? 'discharge' : 'charge'}`" />
  </div>
</template>

<script lang="ts">
import { toRefs, watch, ref } from 'vue'

export default {
  props: {
    charge: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const { charge } = toRefs(props)
    const isCharging = ref(false)
    const isDischarging = ref(false)

    watch(charge, (newVal, oldVal) => {
      isCharging.value = newVal > oldVal && newVal < 100
      isDischarging.value = newVal < oldVal && newVal > 0
    })

    return {
      isCharging,
      isDischarging,
    }
  },
}
</script>

<style>
progress.discharge::-webkit-progress-value {
  background-color: rgb(240, 96, 72);
}
</style>
