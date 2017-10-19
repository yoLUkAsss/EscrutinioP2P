pragma solidity ^0.4.11;

contract Destructor {
  address owner;
  function Destructor() public {
    owner = msg.sender;
  }

  function destroy(address parent) public {
    require(owner == parent);
    selfdestruct(parent);
  }
}
