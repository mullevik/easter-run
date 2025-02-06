<template>
  <div class="container">
    <p>Charge:</p>
    <progress
      :value="charge"
      max="100"
      :style="{ color: `var(--bar-color)`, backgroundColor: `var(--bar-color)` }"
    />
  </div>
</template>

<script lang="ts">
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
  setup() {},
}
</script>

<style></style>
