import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useChargeStore = defineStore('charge', () => {
  const charge = ref(0)

  function addCharge() {
    charge.value += 1
  }

  function removeCharge() {
    charge.value -= 1
  }

  return { charge, addCharge, removeCharge }
})
