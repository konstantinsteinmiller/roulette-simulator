export default {
  name: 'rotating 1/6',
  minBetAmount: 1,
  betLooseMultiplier: 1,
  betWinMultiplier: 5,
  /* eslint-disable */
  // selectedItems: [2],
  runningSelectedItemsAmount: 6,
  runningSelectedItemsOffset: 0,
  /* eslint-enable */
  onLoose(betAmount, minBetAmount, betQueue, statistics) {
    statistics.lostCashOnLossStreak += betAmount
    const newBetAmount = Math.ceil(
      statistics.lostCashOnLossStreak / this.betWinMultiplier
    )
    const increasedBetAmount =
      this.betWinMultiplier * betAmount < statistics.lostCashOnLossStreak
        ? newBetAmount
        : betAmount

    betQueue.unshift(JSON.parse(JSON.stringify(increasedBetAmount)))
    return { betAmount, minBetAmount, betQueue, statistics }
  },
  onWin(/*betAmount, minBetAmount, betQueue*/) {
    // console.log('onWin: ')
  },
}
