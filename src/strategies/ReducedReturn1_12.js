export default {
  name: 'reduced return 1/12',
  minBetAmount: 1,
  betLooseMultiplier: 1,
  betWinMultiplier: 11,
  /* eslint-disable */
  // selectedItems: [0, 1, 2, 3],
  // selectedItems: [33, 34, 35, 36],
  // selectedItems: [31, 33, 34, 30],
  // selectedItems: [27, 28, 29, 0],
  runningSelectedItemsAmount: 3,
  runningSelectedItemsOffset: 0,
  /* eslint-enable */
  onLoose(betAmount, minBetAmount, betQueue, statistics, that) {
    const newBetAmount = Math.ceil(
      statistics.lostCashOnLossStreak / this.betWinMultiplier + 3
    )
    const increasedBetAmount =
      this.betWinMultiplier * betAmount < statistics.lostCashOnLossStreak
        ? newBetAmount
        : betAmount

    if (increasedBetAmount * this.betLooseMultiplier > that.cash / 2) {
      betQueue.unshift(JSON.parse(JSON.stringify(minBetAmount)))
      return { betAmount, minBetAmount, betQueue, statistics }
    }

    betQueue.unshift(JSON.parse(JSON.stringify(increasedBetAmount)))
    return { betAmount, minBetAmount, betQueue, statistics }
  },
  onWin(/*betAmount, minBetAmount, betQueue*/) {
    // console.log('onWin: ')
  },
  simulationHook(that) {

  },
}
