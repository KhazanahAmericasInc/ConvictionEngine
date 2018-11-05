var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var CEngine = artifacts.require("./CEngine.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(CEngine,1500);
};
