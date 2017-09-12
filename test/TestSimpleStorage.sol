pragma solidity ^0.4.2;

import "truffle/Assert.sol";

contract TestSimpleStorage {
    uint a = 46;
    uint b = 46;


  function testSimpleTest() {
    Assert.equal(a, b, "It should store the value 89.");
  }

}
