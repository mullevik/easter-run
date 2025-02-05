<template>
  <div class="container">
    <p>Charge: {{ chargeStore.charge }}</p>
    <button class="button" @click="add">+</button>
    <button class="button" @click="remove">-</button>
  </div>
</template>

<script lang="ts">
import { useChargeStore } from '../stores/charge'

export default {
  setup() {
    const chargeStore = useChargeStore()

    const add = () => chargeStore.addCharge()
    const remove = () => chargeStore.removeCharge()

    return {
      chargeStore,
      add,
      remove,
    }
  },
}
</script>
