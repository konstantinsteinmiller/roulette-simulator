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
    <LineChart v-if="!isSimulating" :series-data="getSeriesData" />
  </div>
</template>

<script>
import ROUNDS from '../../data/1000/parts-0.json'
import SafeReturn1_3_STRATEGY from '@/strategies/SafeReturn1_3'
import SafeReturn2_3_STRATEGY from '@/strategies/SafeReturn2_3'
import SafeReturn1_6_STRATEGY from '@/strategies/SafeReturn1_6'
import SafeReturn5_6_STRATEGY from '@/strategies/SafeReturn5_6'
import SafeReturn11_12_STRATEGY from '@/strategies/SafeReturn11_12'
import SafeReturn35_36_STRATEGY from '@/strategies/SafeReturn35_36'
import LineChart from '@/components/LineChart.vue'

export default {
  name: 'Simulator',
  components: { LineChart },
  data() {
    return {
      isSimulating: true,
      initialCash: 10000,
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
        maxBetAmount: 0,
        roundsOnMinBet: 0,
        totalLoss: 0,
        cashPerGameList: [],
        betAmountPerGameList: [],
        totalBetAmountPerGameList: [],
        totalLossList: [],
      },
      strategy: null,
      selectedStrategy: null,
      strategies: [
        SafeReturn1_3_STRATEGY,
        SafeReturn2_3_STRATEGY,
        SafeReturn1_6_STRATEGY,
        SafeReturn5_6_STRATEGY,
        SafeReturn11_12_STRATEGY,
        SafeReturn35_36_STRATEGY,
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
    getSeriesData() {
      return [
        this.statistics.cashPerGameList,
        this.statistics.betAmountPerGameList,
        this.statistics.totalBetAmountPerGameList,
        this.statistics.totalLossList,
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

      let defaultStrategy = SafeReturn35_36_STRATEGY
      defaultStrategy = this.getDefaultStrategy() || defaultStrategy
      this.loadStrategy(defaultStrategy)

      this.selectedStrategy = this.strategy

      this.initializeData()

      this.isBroke = false
    },
    simulate() {
      this.rounds.some(round => {
        this.updateBet()

        this.updateStatistics()

        const isWin = this.selectedItems.includes(round)
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
      const lostAmount = JSON.parse(
        JSON.stringify(this.betAmount * this.betLooseMultiplier)
      )
      this.cash -= lostAmount
      this.statistics.totalLoss += lostAmount

      this.strategy.onLoose(
        this.betAmount,
        this.minBetAmount,
        this.betQueue,
        this.statistics.totalLoss,
        this.betWinMultiplier,
        this.betLooseMultiplier
      )
    },
    onWin() {
      this.statistics.totalWins++
      const winAmount = JSON.parse(
        JSON.stringify(this.betAmount * this.betWinMultiplier)
      )
      this.cash += winAmount

      this.statistics.totalLoss = 0

      this.strategy.onWin(
        this.betAmount,
        this.minBetAmount,
        this.betQueue,
        this.statistics.totalLoss,
        this.betWinMultiplier,
        this.betLooseMultiplier
      )
    },
    evaluateResult(/*isWin*/) {
      // console.log('isWin: ', isWin)
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
  },
}
</script>
