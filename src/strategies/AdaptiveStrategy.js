export default {
  name: 'adaptive',
  minBetAmount: 1,
  betLooseMultiplier: 1,
  betWinMultiplier: 1,
  /* eslint-disable */
  // selectedItems: [3],
  runningSelectedItemsAmount: 18,
  runningSelectedItemsOffset: 9,
  /* eslint-enable */
  onLoose(betAmount, minBetAmount, betQueue, statistics /*, that*/) {
    const newBetAmount = Math.ceil(
      statistics.lostCashOnLossStreak / this.betWinMultiplier
    )
    let increasedBetAmount =
      this.betWinMultiplier * betAmount < statistics.lostCashOnLossStreak
        ? newBetAmount
        : betAmount

    // if (statistics.lossesInARow > 10 && that.strategy.betWinMultiplier === 35) {
    //   console.log('statistics.lossesInARow: ', statistics.lossesInARow)
    //   that.strategy.betWinMultiplier = 8
    //   that.strategy.betLooseMultiplier = 1
    //   that.strategy.runningSelectedItemsAmount = 4
    //   that.betWinMultiplier = 8
    //   that.betLooseMultiplier = 1
    //   const newBetAmount = Math.ceil(
    //     statistics.lostCashOnLossStreak / this.betWinMultiplier
    //   )
    //   increasedBetAmount =
    //     this.betWinMultiplier * betAmount < statistics.lostCashOnLossStreak
    //       ? newBetAmount
    //       : betAmount
    // }

    betQueue.unshift(JSON.parse(JSON.stringify(increasedBetAmount)))
    return { betAmount, minBetAmount, betQueue, statistics }
  },
  onWin(betAmount, minBetAmount, betQueue, statistics, that) {
    if (statistics.lossesInARow === 0 && that.strategy.betWinMultiplier === 8) {
      that.strategy.betWinMultiplier = 35
      that.strategy.betLooseMultiplier = 1
      that.strategy.runningSelectedItemsAmount = 1
      that.betWinMultiplier = 35
      that.betLooseMultiplier = 1
    }
  },
}
