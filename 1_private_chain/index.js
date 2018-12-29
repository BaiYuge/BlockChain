web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"country","type":"bytes32"}],"name":"totalCarbon","outputs":[{"name":"","type":"uint"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"country","type":"bytes32"}],"name":"validBuy","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"carbon","outputs":[{"name":"","type":"uint"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"countryList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"country","type":"bytes32"}],"name":"buyCarbonFor","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"countries","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
VotingContract = web3.eth.contract(abi);
contractInstance = VotingContract.at('0xd517c0aade01439212d4fc5c871f3fb92c0376c7');
candidates = {"Japan": "country-1", "America": "country-2", "China": "country-3"};
var account;
function buyCarbonFor() {
  let candidateName = $("#candidate").val();
  let icons = parseInt($("#icons").val());
  if(icons < 1){
    alert("You boutght too much!");
    return;
  };
  contractInstance.buyCarbonFor(candidateName, {from: account}, function() {
    let div_id = candidates[candidateName];
    let val = contractInstance.totalCarbon.call(candidateName).toString();
    console.log(val);
    $("#" + div_id).html(val);
    res = icons - 1;
    console.log(res);
    document.getElementById('icons').value = res;
  });
}

$(document).ready(function() {
  account = web3.eth.accounts[0];

  candidateNames = Object.keys(candidates);
  console.log(candidateNames)
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalCarbon.call(name).toString();
    console.log(candidateNames[i] + val);
    $("#" + candidates[name]).html(val);
    document.getElementById('icons').value = 200;
  }
});

