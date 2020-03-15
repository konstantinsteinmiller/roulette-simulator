export default {
  name: 'safe return 11/12',
  minBetAmount: 1,
  betLooseMultiplier: 11,
  betWinMultiplier: 1,
  /* eslint-disable */
  selectedItems: [
    4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
    28, 29, 30, 31, 32, 33, 34, 35, 36
  ],
  /* eslint-enable */
  onLoose(betAmount, minBetAmount, betQueue) {
    const increasedBetAmount = betAmount + minBetAmount + minBetAmount
    // console.log('newBetAmount: ', newBetAmount)
    // betQueue.unshift(JSON.parse(JSON.stringify(betAmount)))
    // betQueue.unshift(JSON.parse(JSON.stringify(betAmount)))
    betQueue.unshift(JSON.parse(JSON.stringify(betAmount)))
    betQueue.unshift(JSON.parse(JSON.stringify(betAmount)))
    // betQueue.unshift(JSON.parse(JSON.stringify(betAmount)))
    betQueue.unshift(JSON.parse(JSON.stringify(increasedBetAmount)))
  },
  onWin(/*betAmount, minBetAmount, betQueue*/) {
    console.log('onWin: ')
  },
}
