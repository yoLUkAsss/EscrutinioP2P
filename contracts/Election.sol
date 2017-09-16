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

  /*function createMesa(bytes32[] participantList, bytes32[] candidateList, uint8 totalVotes) {
    return new Mesa(participantList, candidateList, totalVotes);
  }
  */

    function createNMesas(
        bytes32 apoderado, 
        bytes32[] participantList, 
        bytes32[] candidateList, 
        uint8 totalVotes, 
        uint cantidadDeMesas) {
        for ( uint8 i = 0; i<cantidadDeMesas; i++ ) {
            mesas.push(new Mesa(apoderado, participantList, candidateList, totalVotes));
        }
        /*return mesas;*/
    }

  function getMesas() constant returns (address[]){
    return mesas;
  }
}
