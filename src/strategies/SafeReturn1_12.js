export default {
  name: 'safe return 1/12',
  minBetAmount: 5,
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
  simulationHook(that) {
    const numberOfRoundsList = [...Array(3).keys()]
    numberOfRoundsList.forEach(iteration => {
      that.strategy.runningSelectedItemsOffset = iteration
      that.rounds.some((round, roundNumber) => {
        that.updateBet()

        that.updateStatistics()

        const selectedItems = that.strategy?.runningSelectedItemsAmount
          ? that.getNextSelection(
              roundNumber + (that.strategy?.runningSelectedItemsOffset || 0),
              that.strategy?.runningSelectedItemsAmount
            )
          : that.selectedItems

        const isWin = selectedItems.includes(round)
        !isWin && that.onLoose()
        isWin && that.onWin()
        that.evaluateResult(isWin)

        return false // that.isBroke
      })
      // that.isBroke = false
    })
    that.isSimulating = false
  },
}
