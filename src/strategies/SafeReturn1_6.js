export default {
  name: 'safe return 1/6',
  minBetAmount: 1,
  betLooseMultiplier: 1,
  betWinMultiplier: 5,
  /* eslint-disable */
  // selectedItems: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  // selectedItems: [1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 , 13 , 14 , 15 , 16 , 17 , 18 , 19 , 20 , 21 , 22 , 23 , 24 , 25 , 26 , 27 , 28 , 29 , 30],
  selectedItems: [1 , 2 , 3 , 4 , 5 , 6],
  /* eslint-enable */
  onLoose(betAmount, minBetAmount, betQueue, totalLoss, betWinMultiplier) {
    const increasedBetAmount =
      totalLoss > betAmount * betWinMultiplier
        ? betAmount + minBetAmount
        : betAmount
    betQueue.unshift(JSON.parse(JSON.stringify(increasedBetAmount)))
  },
  // eslint-disable-next-line no-unused-vars
  onWin(betAmount, minBetAmount, betQueue, totalLoss) {
    totalLoss = 0
  },
}
