const path = require('path')
const fs = require('fs-extra')
const solc = require('solc')

// remove build folder
const buildPath = path.resolve(__dirname, 'build')
fs.removeSync(buildPath)

// memory source from contract
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol')
const source = fs.readFileSync(campaignPath, 'utf8')
const output = solc.compile(source, 1).contracts

// create build folder form source
fs.ensureDirSync(buildPath)
for(let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.split(':').join('') + '.json'),
    output[contract]
  )
}
