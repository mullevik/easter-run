<template>
  <div class="container">
    <p>Signal strength: {{ signalStrength.toFixed(1) }} %</p>
    <progress :value="signalStrength" max="100" />
    <div class="measure-wrapper">
      <div class="measure" :style="`width: ${REQUIRED_SIGNAL_STRENGTH}%`"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { REQUIRED_SIGNAL_STRENGTH } from '../track'
defineProps({
  signalStrength: {
    type: Number,
    default: 0,
  },
})
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
