export default {
  name: 'reduced return 1/36',
  minBetAmount: 1,
  betLooseMultiplier: 2,
  betWinMultiplier: 17,
  /* eslint-disable */
  // selectedItems: [0, 1, 2, 3],
  runningSelectedItemsAmount: 2,
  runningSelectedItemsOffset: 2,
  /* eslint-enable */
  onLoose(betAmount, minBetAmount, betQueue, statistics, that) {
    const newBetAmount = Math.ceil(
      (statistics.lostCashOnLossStreak / this.betWinMultiplier) * 0.8
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
}
