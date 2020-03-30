export default {
  name: 'reduced return 1/36',
  minBetAmount: 1,
  betLooseMultiplier: 1,
  betWinMultiplier: 17,
  /* eslint-disable */
  // selectedItems: [0, 1, 2, 3],
  runningSelectedItemsAmount: 2,
  runningSelectedItemsOffset: 0,
  /* eslint-enable */
  onLoose(betAmount, minBetAmount, betQueue, statistics, that) {
    const newBetAmount = Math.ceil(
      (statistics.lostCashOnLossStreak / this.betWinMultiplier) + minBetAmount
    )
    const increasedBetAmount =
      this.betWinMultiplier * betAmount < statistics.lostCashOnLossStreak
        ? newBetAmount
        : betAmount

    // if (increasedBetAmount * this.betLooseMultiplier > that.cash / 2) {
    //   betQueue.unshift(JSON.parse(JSON.stringify(minBetAmount)))
    //   return { betAmount, minBetAmount, betQueue, statistics }
    // }

    betQueue.unshift(JSON.parse(JSON.stringify(increasedBetAmount)))
    return { betAmount, minBetAmount, betQueue, statistics }
  },
  onWin(/*betAmount, minBetAmount, betQueue*/) {
    // console.log('onWin: ')
  },
  simulationHook(that) {
    const numberOfRoundsList = [...Array(17).keys()]
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
