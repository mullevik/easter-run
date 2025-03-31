<template>
  <Teleport to="body">
    <div v-if="open" class="modal">
      <h2>Entity captured!</h2>

      <p>TODO: something about the entity</p>

      <p>TODO: something about the entity's nest</p>

      <div>
        <button @click="resetCharge">Reset device (lose charge)</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useChargeStore } from '@/state'
import { ref, watch } from 'vue'

const open = ref(false)
const chargeStore = useChargeStore()

watch(
  () => chargeStore.charge,
  () => {
    open.value = chargeStore.isCaptured()
  },
)

const resetCharge = () => {
  chargeStore.reset()
}
</script>

<style scoped>
.modal {
  box-sizing: border-box;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(203, 252, 225);
  padding: 3em;
  overflow: scroll;
}

.error {
  color: brown;
}
</style>
