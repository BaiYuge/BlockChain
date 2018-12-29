// Import the page's CSS. Webpack will know what to do with it.
import '../styles/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
import carbon_artifacts from '../../build/contracts/Carbon.json'
var web3;
// MetaCoin is our usable abstraction, which we'll use through the code below.
const Carbon = contract(carbon_artifacts)
let candidates = {"Japan": "country-1", "America": "country-2", "China": "country-3"};
window.buyCarbonFor = function() {
  let candidateName = $("#candidate").val();
  let icons = parseInt($("#icons").val());
  if(icons < 1){
    alert("You boutght too much!");
    return;
  };
  try {
   $("#candidate").val("");
 
   Carbon.deployed().then(function(contractInstance) {
    contractInstance.buyCarbonFor(candidateName, {gas: 140000, from: web3.eth.accounts[0]}).then(function() {
     let div_id = candidates[candidateName];
     return contractInstance.totalCarbon.call(candidateName).then(function(v) {
      $("#" + div_id).html(v.toString());
      res = icons - 1;
      console.log(res);
      document.getElementById('icons').value = res;
     });
    });
   });
  } catch (err) {
   console.log(err);
  }
 }
 
 $( document ).ready(function() {
  if (typeof web3 !== 'undefined') {
   console.warn("Using web3 detected from external source like Metamask");
   // Use Mist/MetaMask's provider
   web3 = new Web3(web3.currentProvider);
  } else {
   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
 
  Carbon.setProvider(web3.currentProvider);
  let candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
   let name = candidateNames[i];
   Carbon.deployed().then(function(contractInstance) {
    contractInstance.totalCarbon.call(name).then(function(v) {
     $("#" + candidates[name]).html(v.toString());
     console.log(name + ":" + v.toString());
     if(name == "America"){
      $("#" + candidates[name]).html(1999);
     }
    });
   })
  }
  document.getElementById('icons').value = 200;
 });
