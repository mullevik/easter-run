import { ref } from 'vue'
import { defineStore } from 'pinia'

const MAX_CHARGE = 100
const MIN_CHARGE = 0

export const useChargeStore = defineStore('charge', () => {
  const charge = ref(0)

  function addCharge() {
    charge.value = Math.min(charge.value + 1, MAX_CHARGE)
  }

  function decreaseCharge() {
    if (charge.value < MAX_CHARGE) {
      charge.value = Math.max(charge.value - 1, MIN_CHARGE)
    }
  }

  function isCaptured(): boolean {
    return charge.value == MAX_CHARGE
  }

  return { charge, addCharge, decreaseCharge, isCaptured }
})
