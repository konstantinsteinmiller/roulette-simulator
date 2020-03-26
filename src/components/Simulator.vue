<template>
  <div class="simulator mt-8">
    <div class="border-solid border border-grey p-4">
      <div class="flex justify-end">
        <select v-model="selectedStrategy" @change="onStrategyChanged">
          <option
            v-for="(strategy, index) in strategies"
            :key="'stat_' + index"
            :value="strategy"
          >
            {{ strategy.name }}
          </option>
        </select>
        <div v-if="strategy">
          min: {{ strategy.minBetAmount }} - mult:
          {{ strategy.betLooseMultiplier }}
        </div>
        <div class="mb-4">{{ strategy }}</div>
      </div>
      <div>rounds: {{ rounds.length }}</div>
      <div>total wins: {{ statistics.totalWins }}</div>
      <div>total losses: {{ statistics.totalLosses }}</div>
      <div>
        max bet amount: {{ statistics.maxBetAmount }} - max bet total per round:
        {{ statistics.maxBetAmount * betLooseMultiplier }}
      </div>
      <div>rounds on min bet: {{ statistics.roundsOnMinBet }}</div>
      <div>cash: {{ cash }}</div>
      <div>
        win/loose:
        <span
          :class="{
            'text-green': getWinLoose > 0,
            'text-red': getWinLoose < 0,
          }"
        >
          {{ getWinLoose }}
        </span>
      </div>
    </div>
    <div v-if="isBroke" class="text-xxxl text-red">You went broke</div>
    <LineChart v-if="!isSimulating" :series-data="getSeriesDataChart1" />
    <LineChart v-if="!isSimulating" :series-data="getSeriesDataChart2" />
    <LineChart v-if="!isSimulating" :series-data="getSeriesDataChart3" />
    <LineChart v-if="!isSimulating" :series-data="getSeriesDataChart4" />
    <LineChart v-if="!isSimulating" :series-data="getSeriesDataChart5" />
    <LineChart v-if="!isSimulating" :series-data="getSeriesDataChart6" />
  </div>
</template>

<script>
import ROUNDS from '../../data/1000/parts-0.json'
import SafeReturn1_3_STRATEGY from '@/strategies/SafeReturn1_3'
import SafeReturn2_3_STRATEGY from '@/strategies/SafeReturn2_3'
import SafeReturn1_6_STRATEGY from '@/strategies/SafeReturn1_6'
import SafeReturn5_6_STRATEGY from '@/strategies/SafeReturn5_6'
import SafeReturn1_12_STRATEGY from '@/strategies/SafeReturn1_12'
import SafeReturn11_12_STRATEGY from '@/strategies/SafeReturn11_12'
import SafeReturn35_36_STRATEGY from '@/strategies/SafeReturn35_36'
import Rotating1_6_STRATEGY from '@/strategies/Rotating1_6'
import LineChart from '@/components/LineChart.vue'

export default {
  name: 'Simulator',
  components: { LineChart },
  data() {
    return {
      isSimulating: true,
      initialCash: 100000,
      minBetAmount: 5,
      betAmount: 0,
      betLooseMultiplier: 5,
      betWinMultiplier: 1,
      betQueue: [],
      cash: 0,
      isBroke: false,
      rounds: [],
      statistics: {
        maxBetQueueLength: 0,
        totalWins: 0,
        totalLosses: 0,
        winsInARow: 0,
        lossesInARow: 0,
        lostCashOnLossStreak: 0,
        maxBetAmount: 0,
        roundsOnMinBet: 0,
        totalLoss: 0,
        cashPerGameList: [],
        betAmountPerGameList: [],
        totalBetAmountPerGameList: [],
        winsInARowPerGameList: [],
        lossesInARowPerGameList: [],
        lostCashOnLossStreakPerGameList: [],
        winStreakMap: {},
        lossStreakMap: {},
        totalLossList: [],
      },
      strategy: null,
      selectedStrategy: null,
      strategies: [
        SafeReturn1_3_STRATEGY,
        SafeReturn2_3_STRATEGY,
        SafeReturn1_6_STRATEGY,
        SafeReturn5_6_STRATEGY,
        SafeReturn1_12_STRATEGY,
        SafeReturn11_12_STRATEGY,
        SafeReturn35_36_STRATEGY,
        Rotating1_6_STRATEGY,
      ],
    }
  },
  computed: {
    selectedItems() {
      return this.$store.state.simulator.selectedItems
    },
    getWinLoose() {
      return this.cash - this.initialCash
    },
    getSeriesDataChart1() {
      return [
        {
          name: 'cash',
          data: this.statistics.cashPerGameList,
        },
        {
          name: 'single bet amount',
          data: this.statistics.betAmountPerGameList,
        },
        {
          name: 'total bet amount',
          data: this.statistics.totalBetAmountPerGameList,
        },
        {
          name: 'total loss',
          data: this.statistics.totalLossList,
        },
      ]
    },
    getSeriesDataChart2() {
      return [
        {
          name: 'losses in a row',
          data: this.statistics.lossesInARowPerGameList,
        },
      ]
    },
    getSeriesDataChart3() {
      return [
        {
          name: 'wins in a row',
          data: this.statistics.winsInARowPerGameList,
        },
      ]
    },
    getSeriesDataChart4() {
      return [
        {
          name: 'lost cash on loss streak',
          data: this.statistics.lostCashOnLossStreakPerGameList,
        },
      ]
    },
    getSeriesDataChart5() {
      const lossData = Object.keys(this.statistics.lossStreakMap)
        .sort((a, b) => a - b)
        .map(key => {
          return this.statistics.lossStreakMap[key]
        })
      return [
        {
          name: 'lost streak map',
          data: lossData,
        },
      ]
    },
    getSeriesDataChart6() {
      const winData = Object.keys(this.statistics.winStreakMap)
        .sort((a, b) => a - b)
        .map(key => {
          return this.statistics.winStreakMap[key]
        })
      return [
        {
          name: 'win streak map',
          data: winData,
        },
      ]
    },
  },
  mounted() {
    this.loadRounds()
    this.initSimulation()
    this.simulate()
  },
  methods: {
    initSimulation() {
      this.isSimulating = true

      let defaultStrategy = SafeReturn1_12_STRATEGY
      defaultStrategy = this.getDefaultStrategy() || defaultStrategy
      this.loadStrategy(defaultStrategy)

      this.selectedStrategy = this.strategy

      this.initializeData()

      this.isBroke = false
    },
    simulate() {
      this.rounds.some((round, roundNumber) => {
        this.updateBet()

        this.updateStatistics()

        const selectedItems = this.strategy?.runningSelectedItemsAmount
          ? this.getNextSelection(
              roundNumber,
              this.strategy?.runningSelectedItemsAmount
            )
          : this.selectedItems

        const isWin = selectedItems.includes(round)
        !isWin && this.onLoose()
        isWin && this.onWin()
        this.evaluateResult(isWin)

        return this.isBroke
      })
      this.isSimulating = false
    },
    updateBet() {
      this.betAmount = this.betQueue.length
        ? this.betQueue.shift()
        : this.minBetAmount
    },
    onLoose() {
      this.statistics.totalLosses++
      this.statistics.lossesInARow++
      this.statistics.winStreakMap[this.statistics.winsInARow] = this.statistics
        .winStreakMap[this.statistics.winsInARow]
        ? this.statistics.winStreakMap[this.statistics.winsInARow] + 1
        : 1
      this.statistics.winsInARow = 0

      const lostAmount = JSON.parse(
        JSON.stringify(this.betAmount * this.betLooseMultiplier)
      )
      this.cash -= lostAmount
      this.statistics.totalLoss += lostAmount

      const result = this.strategy.onLoose(
        this.betAmount,
        this.minBetAmount,
        this.betQueue,
        {
          ...this.statistics,
        },
        this.betWinMultiplier,
        this.betLooseMultiplier
      )
      // this.betAmount = result.betAmount
      this.statistics.lostCashOnLossStreak =
        result.statistics.lostCashOnLossStreak
    },
    onWin() {
      this.statistics.totalWins++
      this.statistics.winsInARow++
      this.statistics.lossStreakMap[this.statistics.lossesInARow] = this
        .statistics.lossStreakMap[this.statistics.lossesInARow]
        ? this.statistics.lossStreakMap[this.statistics.lossesInARow] + 1
        : 1

      this.statistics.lossesInARow = 0
      this.statistics.lostCashOnLossStreak = 0

      const winAmount = JSON.parse(
        JSON.stringify(this.betAmount * this.betWinMultiplier)
      )
      this.cash += winAmount

      this.statistics.totalLoss = 0

      this.strategy.onWin(
        this.betAmount,
        this.minBetAmount,
        this.betQueue,
        {
          ...this.statistics,
        },
        this.betWinMultiplier,
        this.betLooseMultiplier
      )
    },
    evaluateResult(/*isWin*/) {
      this.statistics.winsInARowPerGameList.push(
        JSON.parse(JSON.stringify(this.statistics.winsInARow))
      )
      this.statistics.lossesInARowPerGameList.push(
        JSON.parse(JSON.stringify(this.statistics.lossesInARow))
      )
      this.statistics.lostCashOnLossStreakPerGameList.push(
        JSON.parse(JSON.stringify(this.statistics.lostCashOnLossStreak))
      )
      this.isBroke = this.betAmount * this.betLooseMultiplier > this.cash
    },
    updateStatistics() {
      this.statistics.maxBetAmount =
        this.betAmount > this.statistics.maxBetAmount
          ? this.betAmount
          : this.statistics.maxBetAmount

      this.statistics.maxBetQueueLength =
        this.betQueue.length > this.statistics.maxBetQueueLength
          ? this.betQueue.length
          : this.statistics.maxBetQueueLength

      if (this.betAmount === this.minBetAmount) {
        this.statistics.roundsOnMinBet++
      }

      this.statistics.cashPerGameList.push(this.cash)
      this.statistics.betAmountPerGameList.push(this.betAmount)
      this.statistics.totalBetAmountPerGameList.push(
        this.betAmount * this.betLooseMultiplier
      )
      this.statistics.totalLossList.push(this.statistics.totalLoss)
    },
    loadRounds() {
      let rounds = localStorage.getItem('ROUNDS_ONE')
      let isSmallRound = localStorage.getItem('isSmallRound')

      if (isSmallRound && JSON.parse(isSmallRound)) {
        rounds = ROUNDS.rounds
        localStorage.setItem('ROUNDS_ONE', JSON.stringify(ROUNDS.rounds))
      } else if (rounds && JSON.parse(rounds).length > 1000) {
        rounds = JSON.parse(rounds)
        // console.log('loaded rounds from localStorage: ', rounds)
      } else {
        const folder = require.context('../../data/100', false, /\.json$/)
        const files = folder.keys().map(x => folder(x))
        rounds = files.reduce((sum, file) => {
          sum = sum.concat(file.rounds)
          return sum
        }, [])
        localStorage.setItem('ROUNDS_ONE', JSON.stringify(rounds))
        // console.log('loaded rounds from files: ', rounds)
      }
      this.rounds = rounds
    },
    loadStrategy(strategy) {
      this.strategy = strategy

      this.strategy?.selectedItems?.length &&
        this.$store.commit(
          'simulator/setSelectedItems',
          this.strategy.selectedItems
        )

      this.minBetAmount = this.strategy?.minBetAmount
        ? this.strategy.minBetAmount
        : this.minBetAmount

      this.betLooseMultiplier = this.strategy?.betLooseMultiplier
        ? this.strategy.betLooseMultiplier
        : this.betLooseMultiplier
      this.betWinMultiplier = this.strategy?.betWinMultiplier
        ? this.strategy.betWinMultiplier
        : this.betWinMultiplier
    },
    onStrategyChanged() {
      this.isSimulating = true
      this.loadStrategy(this.selectedStrategy)

      this.statistics = this.initializeStatistics()
      this.initializeData()

      this.isBroke = false

      this.simulate()
    },
    initializeStatistics() {
      return {
        maxBetQueueLength: 0,
        totalWins: 0,
        totalLosses: 0,
        maxBetAmount: 0,
        roundsOnMinBet: 0,
        totalLoss: 0,
        cashPerGameList: [],
        betAmountPerGameList: [],
        totalBetAmountPerGameList: [],
        totalLossList: [],
      }
    },
    initializeData() {
      this.betAmount = this.minBetAmount
      this.cash = this.initialCash
      this.betQueue = []
    },
    getDefaultStrategy() {
      const DEFAULT_STRATEGY_NAME = localStorage.getItem('DEFAULT_STRATEGY')
      if (DEFAULT_STRATEGY_NAME) {
        return this.strategies.find(
          strat => strat.name === DEFAULT_STRATEGY_NAME
        )
      }
    },
    getNextSelection(roundNumber, runningSelectedItemsAmount) {
      const allNumbers = [...Array(37).keys()].map(item => item)
      const slices = Math.floor(37 / runningSelectedItemsAmount)

      const startIndex = (roundNumber % slices) * runningSelectedItemsAmount
      if (startIndex > 36 - runningSelectedItemsAmount) {
        return allNumbers.slice(0, runningSelectedItemsAmount)
      }
      return allNumbers.slice(
        startIndex,
        startIndex + runningSelectedItemsAmount
      )
    },
  },
}
</script>
