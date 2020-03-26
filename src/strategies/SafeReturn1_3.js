export default {
  name: 'safe return 1/3',
  minBetAmount: 5,
  betLooseMultiplier: 1,
  betWinMultiplier: 2,
  /* eslint-disable */
  // selectedItems: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  selectedItems: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  // selectedItems: [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12],
  /* eslint-enable */
  onLoose(betAmount, minBetAmount, betQueue, statistics) {
    const increasedBetAmount =
      statistics.totalLoss > betAmount * this.betWinMultiplier - minBetAmount
        ? betAmount + minBetAmount
        : betAmount
    betQueue.unshift(JSON.parse(JSON.stringify(increasedBetAmount)))
  },
  // eslint-disable-next-line no-unused-vars
  onWin(betAmount, minBetAmount, betQueue, statistics) {
    statistics.totalLoss = 0
  },
}
