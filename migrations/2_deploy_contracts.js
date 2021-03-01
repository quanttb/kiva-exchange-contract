const KivaExchange = artifacts.require("KivaExchange");

module.exports = function(deployer) {
  deployer.deploy(KivaExchange);
}