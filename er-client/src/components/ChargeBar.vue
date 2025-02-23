<template>
  <div class="container">
    <p> Charge: {{ charge }}/100 <span v-if="isCharging && charge < 100">▲</span><span v-else-if="isDischarging">▼</span></p>
    <progress max="100" :value="charge" />
  </div>
</template>

<script lang="ts">
import { toRefs, watch, ref } from 'vue'

export default {
  props: {
    charge: {
      type: Number,
      default: 0,
    }
  },
  setup(props) {
    const {charge} = toRefs(props);
    const isCharging = ref(false);
    const isDischarging = ref(false);
    

    watch(charge, (newVal, oldVal) => {
        isCharging.value = newVal > oldVal
        isDischarging.value = newVal < oldVal
      }
    )

    return {
      isCharging,
      isDischarging,
    }
  },
}
</script>
