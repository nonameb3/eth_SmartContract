const path = require('path')
const fs = require('fs')
const solc = require('solc')

const LotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol')
const sorce = fs.readFileSync(LotteryPath, 'utf8')
module.exports = solc.compile(sorce, 1).contracts[':Lottery']
