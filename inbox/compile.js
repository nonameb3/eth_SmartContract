const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const sorce = fs.readFileSync(inboxPath, 'utf8')
module.exports = solc.compile(sorce, 1).contracts[':Index']