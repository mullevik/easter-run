import { ref } from 'vue'
import { defineStore } from 'pinia'

const MAX_CHARGE = 100
const MIN_CHARGE = 0

type Seconds = number
type PerSecond = number

const EXPECTED_CAPTURE_DURATION: Seconds = 400

const INCREASE_RATE: PerSecond = MAX_CHARGE / EXPECTED_CAPTURE_DURATION
const DECREASE_RATE: PerSecond = INCREASE_RATE * 2

export const useChargeStore = defineStore('charge', () => {
  const charge = ref(0)

  function addCharge() {
    charge.value = Math.min(charge.value + INCREASE_RATE, MAX_CHARGE)
  }

  function decreaseCharge() {
    if (charge.value < MAX_CHARGE) {
      charge.value = Math.max(charge.value - DECREASE_RATE, MIN_CHARGE)
    }
  }

  function isCaptured(): boolean {
    return charge.value == MAX_CHARGE
  }

  function reset() {
    charge.value = MIN_CHARGE
  }

  return { charge, addCharge, decreaseCharge, isCaptured, reset }
})
