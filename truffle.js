var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "exhaust soldier vapor thunder unique stamp forest chief income north lake pizza";

module.exports = {
  rpc: {
    host: 'localhost',
    port: '8545'
  },
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      network_id: 4,
      host: '127.0.0.1',
      from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57',
      port: 8545,
      gas: 4000000
    },
    rinkebyInfura: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/b99594e2edae4ea3bf0f1946921074dc")
      },
      network_id: 3,
    }
  }
}