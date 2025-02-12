import { ref } from 'vue'
import { defineStore } from 'pinia'

const MAX_CHARGE = 100
const MIN_CHARGE = 0

export const useChargeStore = defineStore('charge', () => {
  const charge = ref(0)

  function addCharge() {
    charge.value = Math.min(charge.value + 1, MAX_CHARGE)
  }

  function removeCharge() {
    charge.value = Math.max(charge.value - 1, MIN_CHARGE)
  }

  return { charge, addCharge, removeCharge }
})
