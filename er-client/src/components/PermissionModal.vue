<template>
  <Teleport to="body">
    <div v-if="mOpen" class="modal">
      <div class="modal-content">
        <h3>Permissions required</h3>
        <p>Tessertrack 5S requires permission to use your phone's {{ subject }}.</p>

        <div style="text-align: center">
          <button id="permission-button" @click="givePermission()">Allow {{ subject }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

const props = defineProps({
  open: { type: Boolean, required: true },
  subject: { type: String, required: true },
  eventSetup: { type: Function, required: true },
})

const givePermission = () => {
  console.log('give perm')
  props.eventSetup()
  mOpen.value = false
}

const mOpen = ref(props.open)
</script>

<style scoped>
.modal-content {
  background-color: rgba(255, 170, 43, 0.9);
}
</style>
