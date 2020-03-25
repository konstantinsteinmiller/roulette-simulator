export default {
  name: 'safe return 1/12',
  minBetAmount: 1,
  betLooseMultiplier: 1,
  betWinMultiplier: 8,
  /* eslint-disable */
  // selectedItems: [0, 1, 2, 3],
  // selectedItems: [33, 34, 35, 36],
  // selectedItems: [31, 33, 34, 30],
  selectedItems: [27, 28, 29, 0],
  runningSelectedItemsAmount: 4,
  /* eslint-enable */
  onLoose(betAmount, minBetAmount, betQueue, statistics) {
    statistics.lostCashOnLossStreak += betAmount
    const newBetAmount = Math.ceil(
      statistics.lostCashOnLossStreak / this.betWinMultiplier
    )
    // console.log(
    //   'isIncreasedRound: ',
    //   statistics.lossesInARow % 8 === 6,
    //   betAmount,
    //   newBetAmount,
    //   JSON.stringify(statistics.lostCashOnLossStreak)
    // )
    const increasedBetAmount =
      this.betWinMultiplier * betAmount < statistics.lostCashOnLossStreak
        ? newBetAmount
        : betAmount
    statistics.lossesInARow =
      statistics.lossesInARow % 8 === 6 ? 0 : statistics.lossesInARow
    betQueue.unshift(JSON.parse(JSON.stringify(increasedBetAmount)))
    return { betAmount, minBetAmount, betQueue, statistics }
  },
  onWin(/*betAmount, minBetAmount, betQueue*/) {
    // console.log('onWin: ')
  },
}
