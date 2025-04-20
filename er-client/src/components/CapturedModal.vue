<template>
  <Teleport to="body">
    <div v-if="open" class="modal">
      <div class="modal-content">
        <h2>Entity captured!</h2>

        <p>You have captured the <strong>Roostrider</strong></p>

        <img :src="`${base}roostrider.png`" class="capture-image" />
        <p>
          Roostrider, the elusive Easter rooster, is best known for his frantic circular sprints and
          his signature running shoes. Most active around early spring, he can be spotted dashing in
          tight loops through suburban backyards and alleyways, leaving behind trails of feathers
          and faint traces of jellybean dust.
        </p>
        <p>
          Strangely, Roostrider builds his nest <strong>just above household microwaves</strong>.
          Using lint, snack wrappers, and paper bags, he constructs cozy incubators for his
          shimmering eggs. These nests, warmed by the microwave's hum, are believed to enhance
          egg-hatching conditions—though why he prefers kitchens over coops remains one of nature’s
          most whimsical mysteries.
        </p>

        <div>
          <button @click="resetCharge">Reset device (lose charge)</button>
        </div>
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

const base = import.meta.env.BASE_URL
</script>

<style scoped>
.modal-content {
  background-color: rgba(203, 252, 225, 0.9);
}

.error {
  color: brown;
}

.capture-image {
  max-width: 100%;
}
</style>
