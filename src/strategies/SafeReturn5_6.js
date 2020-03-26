export default {
  name: 'safe return 5/6',
  minBetAmount: 1,
  betLooseMultiplier: 5,
  betWinMultiplier: 1,
  /* eslint-disable */
  // selectedItems: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  // selectedItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  selectedItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  // selectedItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  // selectedItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 31, 32, 33, 34, 35, 36],
  // selectedItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
  // runningSelectedItemsAmount: 30,
  /* eslint-enable */
  onLoose(betAmount, minBetAmount, betQueue, statistics) {
    statistics.lostCashOnLossStreak += betAmount * this.betLooseMultiplier
    const newBetAmount = Math.ceil((betAmount * this.betLooseMultiplier) / 2)
    const increasedBetAmount =
      this.betLooseMultiplier * betAmount <= statistics.lostCashOnLossStreak
        ? newBetAmount
        : betAmount

    statistics.lostCashOnLossStreak > 1000 &&
      console.log(
        'increasedBetAmount: ',
        newBetAmount,
        betAmount,
        statistics.lostCashOnLossStreak
      )
    betQueue.unshift(JSON.parse(JSON.stringify(increasedBetAmount)))
    betQueue.unshift(JSON.parse(JSON.stringify(increasedBetAmount)))
    return { betAmount, minBetAmount, betQueue, statistics }
  },
  onWin(/*betAmount, minBetAmount, betQueue*/) {},
}
