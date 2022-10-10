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
  // must specify the visiblity e.g public and
  // type - uint, string
  // the return type  and data (memory / storage) location => returns (type memory) 
  // temporary is memory
  // function can modify or readonly => view / pure  : readonly 
  function greet() external view returns (string memory){
    return string(abi.encodePacked(_greeting, _greetie)); // combine two strings to one string value
  }

  // This is transaction 
  // This means a data packet was sent that modifies 
  // the state of the blockchain
  // a transaction receipt is a json that desribes what happens

  function setGreetie(string calldata _newGreetie) external onlyOwner{
    _greetie = _newGreetie;
  }  
  
  // Ensure function only called by ownwer
  

}
