pragma solidity ^0.5.0;

contract Carbon {
  
  mapping (bytes32 => uint) public carbon;
  
  bytes32[] public countryList;

  constructor(bytes32[] memory countries) public {
    countryList = countries;
    for(uint i = 0;i < countryList.length;i++){
      carbon[countryList[i]] = 2000;
    }
  }

  function totalCarbon(bytes32 country) view public returns (uint) {
    return carbon[country];
  }

  function buyCarbonFor(bytes32 country) public {
    require(validBuy(country));
    carbon[country] -= 1;
  }

  function validBuy(bytes32 country) view public returns(bool){
    for(uint i = 0; i < countryList.length;i++){
      if (countryList[i] == country && carbon[country] >= 1){
        return true;
      }
    }
    return false;
  }
}

