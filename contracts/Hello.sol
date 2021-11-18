// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Hello is Ownable {
  // Everything in contract is public

  // constructor() public {
  // }

  // use _variable for internal variables
  string private _greeting = "Hello, ";
  string private _greetie = "World!";
  // view => read
  function greet() external view returns (string memory){
    return string(abi.encodePacked(_greeting, _greetie)); // combine two strings to one string value
  }

  function setGreetie(string calldata _newGreetie) external onlyOwner{
    _greetie = _newGreetie;
  }  
  
  // Ensure function only called by ownwer
  

}
