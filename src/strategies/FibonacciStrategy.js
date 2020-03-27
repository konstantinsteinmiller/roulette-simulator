export default {
  name: 'fibonacci',
  minBetAmount: 1,
  betLooseMultiplier: 2,
  betWinMultiplier: 1,
  /* eslint-disable */
  // selectedItems: [1, 4, 5, 8, 9, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  runningSelectedItemsAmount: 24,
  // runningSelectedItemsOffset: 0,
  /* eslint-enable */
  onLoose(betAmount, minBetAmount, betQueue, statistics, that) {
    if (!that.fibonacciQueue.length) {
      that.fibonacciQueue.push(0)
      that.fibonacciQueue.push(JSON.parse(JSON.stringify(that.minBetAmount)))
    }
    // get last 2 bets
    const lastBet = that.fibonacciQueue.pop()
    const secondLastBet = that.fibonacciQueue.pop()

    let increasedBetAmount = Math.ceil(
      ((lastBet || 0) + (secondLastBet || 0)) * 1.1
    )
    secondLastBet &&
      that.fibonacciQueue.push(JSON.parse(JSON.stringify(secondLastBet)))
    lastBet && that.fibonacciQueue.push(JSON.parse(JSON.stringify(lastBet)))

    that.fibonacciQueue.push(increasedBetAmount)
    betQueue.unshift(JSON.parse(JSON.stringify(increasedBetAmount)))
    console.log('that.fibonacciQueue: ', that.fibonacciQueue)
    return { betAmount, minBetAmount, betQueue, statistics }
  },
  onWin(betAmount, minBetAmount, betQueue, statistics, that) {
    if (!that.fibonacciQueue.length) {
      that.fibonacciQueue.push(JSON.parse(JSON.stringify(that.minBetAmount)))
    }
    const newBetAmount = that.fibonacciQueue.pop()
    betQueue.unshift(JSON.parse(JSON.stringify(newBetAmount)))
  },
}
