export default {
  name: 'safe return 2/36',
  minBetAmount: 1,
  betLooseMultiplier: 1,
  betWinMultiplier: 17,
  /* eslint-disable */
  // selectedItems: [0, 1, 2, 3],
  runningSelectedItemsAmount: 2,
  runningSelectedItemsOffset: 10,
  /* eslint-enable */
  onLoose(betAmount, minBetAmount, betQueue, statistics) {
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
