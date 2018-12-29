var Carbon = artifacts.require("./Carbon.sol");

module.exports = function (deployer) {
  deployer.deploy(Carbon,["0x4a6170616e","0x416d65726963610d0a","0x4368696e61"],{gas:6700000});

}
