pragma solidity ^0.4.11;

import "./MesaCRUD.sol";
import "./Mesa.sol";

contract MesaElectionCRUD is MesaCRUD{

  bool initialized;

  mapping (bytes32 => uint) partialCount;
  bytes32[] candidates;


  /*funciones para manejar el estado de la eleccion sobre las mesas*/
  function getCandidates() public constant returns(bytes32[]){
    require(initialized);
    return candidates;
  }
  function setCandidates(bytes32[] newCandidates) public {
    require(!initialized);
    candidates = newCandidates;
    initialized = true;
  }
  function getCounts(bytes32 candidate) public constant returns(bytes32, uint){
    require(initialized);
    return (candidate, partialCount[candidate]);
  }
  function createMesaElection() public {
    require(initialized);
    MesaCRUD.createMesa(candidates, this);
  }

  /*funciones para manejar a los participantes de las mesas*/
  function setFiscal(uint id, bytes32 fiscal) public{
    Mesa(getMesa(id)).setFiscal(fiscal);
    SetUserToMesa(msg.sender, id, fiscal);
  }

  function setPresidenteDeMesa(uint id, bytes32 pdm) public {
    Mesa(getMesa(id)).setPresidenteDeMesa(pdm);
    SetUserToMesa(msg.sender, id, pdm);
  }

  function setVicepresidenteDeMesa(uint id, bytes32 vpdm) public {
    Mesa(getMesa(id)).setVicePresidenteDeMesa(vpdm);
    SetUserToMesa(msg.sender, id, vpdm);
  }

  event SetUserToMesa(address indexed userAddress, uint mesaId, bytes32 user);

}
