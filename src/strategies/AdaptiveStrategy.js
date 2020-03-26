export default {
  name: 'adaptive',
  minBetAmount: 1,
  betLooseMultiplier: 1,
  betWinMultiplier: 8,
  /* eslint-disable */
  runningSelectedItemsAmount: 4,
  runningSelectedItemsOffset: 0,
  /* eslint-enable */
  onLoose(betAmount, minBetAmount, betQueue, statistics, that) {
    statistics.lostCashOnLossStreak += betAmount
    const newBetAmount = Math.ceil(
      statistics.lostCashOnLossStreak / this.betWinMultiplier
    )
    let increasedBetAmount =
      this.betWinMultiplier * betAmount < statistics.lostCashOnLossStreak
        ? newBetAmount
        : betAmount

    if (statistics.lossesInARow > 20 && that.strategy.betWinMultiplier === 8) {
      that.strategy.betWinMultiplier = 1
      that.strategy.betLooseMultiplier = 5
      that.strategy.runningSelectedItemsAmount = 30
      that.betWinMultiplier = 1
      that.betLooseMultiplier = 5
      statistics.lostCashOnLossStreak +=
        betAmount * that.strategy.betLooseMultiplier - 1
      const adaptedBetAmount = Math.ceil(
        (betAmount * that.strategy.betLooseMultiplier) / 2
      )
      increasedBetAmount =
        that.strategy.betLooseMultiplier * betAmount <=
        statistics.lostCashOnLossStreak
          ? adaptedBetAmount
          : betAmount

      betQueue.unshift(JSON.parse(JSON.stringify(increasedBetAmount)))
    }

    betQueue.unshift(JSON.parse(JSON.stringify(increasedBetAmount)))
    return { betAmount, minBetAmount, betQueue, statistics }
  },
  onWin(betAmount, minBetAmount, betQueue, statistics, that) {
    if (statistics.lossesInARow === 0 && that.strategy.betWinMultiplier !== 8) {
      that.strategy.betWinMultiplier = 8
      that.strategy.betLooseMultiplier = 1
      that.strategy.runningSelectedItemsAmount = 4
      that.betWinMultiplier = 8
      that.betLooseMultiplier = 1
    }
  },
}
