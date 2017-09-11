pragma solidity ^0.4.11;

import "./Mesa.sol";

contract Election {

  address owner;
  bytes32 electionName;
  address[] deployedContracts;

  function Election () {
      owner = msg.sender;
  }

  function setName(bytes32 name){
    electionName = name;
  }

  function getName() constant returns (bytes32){
    return electionName;
  }

  function createMesa(bytes32[] participantList, bytes32[] candidateList, uint8 totalVotes) returns (address){
    address depAddress = new Mesa(participantList, candidateList, totalVotes);
    deployedContracts.push(depAddress);
    return depAddress;
  }

  function getDeployedAddress() constant returns (address[]){
    return deployedContracts;
  }
}
