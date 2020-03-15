<template>
  <div class="field bg-white">
    <div class="field__table grid grid-flow-col grid-cols-14 grid-rows-5 gap-1">
      <tile
        v-for="(item, index) in leftItems"
        :key="index + 'd'"
        :value="item"
        class="row-span-3 row-start-1 row-end-4 items-center"
        @selected="onSelected"
      />
      <div
        class="grid grid-flow-col grid-cols-12 grid-rows-3 gap-1 col-span-12 row-span-3"
      >
        <tile
          v-for="(item, index) in numberItems"
          :key="index + 'e'"
          :value="item"
          @selected="onSelected"
        />
      </div>
      <div class="grid row-span-3 col-span-1 gap-1">
        <tile
          v-for="(item, index) in rightItems"
          :key="index + 'c'"
          :value="item"
          @selected="onSelected"
        />
      </div>
      <div
        class="grid grid-flow-col row-span-1 row-start-4 row-end-5
               col-span-12 col-start-2 col-end-14 gap-1"
      >
        <tile
          v-for="(item, index) in thirdsItems"
          :key="index + 'a'"
          :value="item"
          class="col-span-4"
          @selected="onSelected"
        />
      </div>
      <div
        class="grid grid-flow-col row-span-1 row-start-5 row-end-6
               col-span-4 col-start-2 col-end-6 gap-1"
      >
        <tile
          v-for="(item, index) in bottomLeftItems"
          :key="index + 'b'"
          :value="item"
          class="col-span-2"
          @selected="onSelected"
        />
      </div>
      <div
        class="grid grid-flow-col row-span-1 row-start-5 row-end-6
               col-span-4 col-start-6 col-end-10 gap-1"
      >
        <tile
          v-for="(item, index) in bottomCenterItems"
          :key="index + 'b'"
          :value="item"
          class="col-span-2"
          @selected="onSelected"
        />
      </div>
      <div
        class="grid grid-flow-col row-span-1 row-start-5 row-end-6
               col-span-4 col-start-10 col-end-14 gap-1"
      >
        <tile
          v-for="(item, index) in bottomRightItems"
          :key="index + 'b'"
          :value="item"
          class="col-span-2"
          @selected="onSelected"
        />
      </div>
    </div>
    <div>
      selected:
      <span
        v-for="(item, index) in selected"
        :key="index"
        :class="{
          'ml-1': index > 0,
        }"
      >
        <span v-if="index > 0">,</span> {{ item }}
      </span>
    </div>
  </div>
</template>

<script>
import Tile from '@/components/atoms/Tile.vue'

export default {
  name: 'Field',
  components: { Tile },
  props: {
    msg: String,
  },
  data() {
    return {
      itemsMap: {},
      /* eslint-disable */
      leftItems: [
        { value: "0", selected: false },
      ],
      numberItems: [
        { value: "1", selected: false },
        { value: "2", selected: false },
        { value: "3", selected: false },
        { value: "4", selected: false },
        { value: "5", selected: false },
        { value: "6", selected: false },
        { value: "7", selected: false },
        { value: "8", selected: false },
        { value: "9", selected: false },
        { value: "10", selected: false },
        { value: "11", selected: false },
        { value: "12",  selected: false },
        { value: "13", selected: false },
        { value: "14", selected: false },
        { value: "15", selected: false },
        { value: "16", selected: false },
        { value: "17", selected: false },
        { value: "18", selected: false },
        { value: "19", selected: false },
        { value: "20", selected: false },
        { value: "21", selected: false },
        { value: "22", selected: false },
        { value: "23", selected: false },
        { value: "24", selected: false },
        { value: "25", selected: false },
        { value: "26", selected: false },
        { value: "27", selected: false },
        { value: "28", selected: false },
        { value: "29", selected: false },
        { value: "30", selected: false },
        { value: "31", selected: false },
        { value: "32", selected: false },
        { value: "33", selected: false },
        { value: "34", selected: false },
        { value: "35", selected: false },
        { value: "36", selected: false },
      ],
      rightItems: [
        { value: "1st 3", selected: false },
        { value: "2st 3", selected: false },
        { value: "3st 3", selected: false },
      ],
      thirdsItems: [
        { value: "1st 12", selected: false },
        { value: "2st 12", selected: false },
        { value: "3st 12", selected: false },
      ],
      bottomLeftItems: [
        { value: "1to18", selected: false },
        { value: "even", selected: false },
      ],
      bottomCenterItems: [
        { value: "red", selected: false },
        { value: "black", selected: false },
      ],
      bottomRightItems: [
        { value: "odd", selected: false },
        { value: "19to36", selected: false },
      ]
      /* eslint-enable */
    }
  },
  computed: {
    items() {
      return this.leftItems
        .concat(this.numberItems)
        .concat(this.rightItems)
        .concat(this.thirdsItems)
        .concat(this.bottomLeftItems)
        .concat(this.bottomCenterItems)
        .concat(this.bottomRightItems)
    },
    getItemsMap() {
      return this.items.reduce((map, item) => {
        map[item.value] = item.selected
        return map
      }, {})
    },
    selected() {
      return Object.keys(this.itemsMap)
        .filter(item => this.itemsMap[item])
        .map(item => +item)
    },
  },
  mounted() {
    this.itemsMap = this.getItemsMap
    this.initSelection()

    this.$store.commit('simulator/setSelectedItems', this.selected)
  },
  methods: {
    onSelected(item) {
      this.itemsMap[item.value] = !this.itemsMap[item.value]
      this.$store.commit('simulator/setSelectedItems', this.selected)
    },
    initSelection() {
      const numbers = [...Array(30).keys()].map(item => item + 1)
      numbers.forEach(number => {
        this.itemsMap[number] = true
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.field {
}
</style>
