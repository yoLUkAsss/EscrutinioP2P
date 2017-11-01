pragma solidity ^0.4.11;

import "./Mesa.sol";

contract Escuela {
  uint lastId;
  uint[] mesaIds;
  bytes32 delegadoDeEscuelaAsignado;
  struct MesaStruct {
    uint id;
    address mesaAddress;
    uint index;
    bool isMesa;
  }
  mapping (uint => MesaStruct) mesaMapping;
  function createMesa(bytes32[] inputCandidates) public{
    lastId += 1;
    mesaMapping[lastId] = MesaStruct(lastId, new Mesa(inputCandidates), mesaIds.length, true);
    mesaIds.push(lastId);
  }
  function existsMesa(uint id) public constant returns(bool){
    return mesaIds.length != 0 && mesaMapping[id].isMesa;
  }
  function getMesa(uint id) public constant returns(address){
    if(!existsMesa(id)) revert();
    return mesaMapping[id].mesaAddress;
  }
  function getMesas() public constant returns(uint[]){
    return mesaIds;
  }
  /////////////////////////////////////////////////////
  function setFiscal(uint mesaId, bytes32 fiscalEmail) public {
    require(existsMesa(mesaId));
    Mesa(mesaMapping[mesaId].mesaAddress).setFiscal(fiscalEmail);
  }
  function setPresidenteDeMesa(bytes32 delegadoEscuela, uint mesaId, bytes32 presidenteDeMesaEmail) public {
    require(existsMesa(mesaId));
    require(delegadoDeEscuelaAsignado == delegadoEscuela);
    Mesa(mesaMapping[mesaId].mesaAddress).setPresidenteDeMesa(presidenteDeMesaEmail);
  }
  function setVicepresidenteDeMesa(bytes32 delegadoEscuela, uint mesaId, bytes32 presidenteDeMesaEmail) public {
    require(existsMesa(mesaId));
    require(delegadoDeEscuelaAsignado == delegadoEscuela);
    Mesa(mesaMapping[mesaId].mesaAddress).setVicepresidenteDeMesa(presidenteDeMesaEmail);
  }
  function setDelegadoDeEscuela(bytes32 newDelegadoDeEscuela) public {
    require(delegadoDeEscuelaAsignado == "");
    delegadoDeEscuelaAsignado = newDelegadoDeEscuela;
  }
  /////////////////////////////////////////////////////
  function getCounts(bytes32 candidate) public constant returns(bytes32, uint){
    return (candidate, 0);
  }
  ////////////////////////////////////////////////////////////////////
  /*function createMesaByCSV(uint idMesa, bytes32[] candidates) public {
    require(!existsMesa(idMesa));
    mesaMapping[idMesa] = MesaStruct(idMesa, new Mesa(candidates), mesaIds.length, true);
    mesaIds.push(idMesa);
  }*/

}
