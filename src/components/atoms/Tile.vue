<template>
  <div
    class="tile flex justify-center content-end bg-green
           cursor-pointer"
    @click="$emit('selected', value)"
  >
    <div class="p-2 flex justify-center content-center">
      <div
        class="tile__inner rounded-full text-white py-4 px-6 text-xxl"
        :class="{
          'bg-black': value.value % 2 === 0 && value.value != 0,
          'bg-red-lighter': value.value % 2 === 1,
        }"
      >
        {{ value.value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tile',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.tile {
  /*&__inner {
    transform: rotate(-90deg);
  }*/
}
</style>
