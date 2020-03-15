<template>
  <div class="home p-8">
    <h1 class="mb-4 text-xxlee">Roulette Simulator</h1>
    <Field msg="Welcome to Your Vue.js App" />
    <Simulator />
  </div>
</template>

<script>
import Field from '@/components/Field.vue'
import Simulator from '@/components/Simulator.vue'

export default {
  name: 'Home',
  components: { Field, Simulator },
}
</script>
