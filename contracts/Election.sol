pragma solidity ^0.4.11;

import "./Mesa.sol";

contract Election {

  address owner;
  bytes32 electionName;
  address[] mesas;

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
    return new Mesa(participantList, candidateList, totalVotes);
    /*address depAddress = new Mesa(participantList, candidateList, totalVotes);
    deployedContracts.push(depAddress);
    return depAddress;*/
  }

  function createNMesas(bytes32[] participantList, bytes32[] candidateList, uint8 totalVotes, uint cantidadDeMesas) returns (address[]){
    for(uint8 i=0; i<cantidadDeMesas; i++){
      mesas.push(createMesa(participantList, candidateList, totalVotes));
    }
    return mesas;
  }

  function getMesas() constant returns (address[]){
    return mesas;
  }
}
