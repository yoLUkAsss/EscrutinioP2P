pragma solidity ^0.4.11;

import "./Escuela.sol";

contract Distrito {
  uint lastEscuelaId;
  uint[] escuelaIds;
  mapping (uint => EscuelaStruct) escuelaMapping;
  bytes32 delegadoDeDistritoAsignado;
  struct EscuelaStruct {
    uint id;
    address escuelaAddress;
    uint index;
    bool isEscuela;
  }
  function createEscuela() public {
    lastEscuelaId += 1;
    escuelaMapping[lastEscuelaId] = EscuelaStruct(lastEscuelaId, new Escuela(), escuelaIds.length, true);
    escuelaIds.push(lastEscuelaId);
  }
  function createMesa(uint escuelaId, bytes32[] candidates) public {
    require(existsEscuela(escuelaId));
    Escuela(escuelaMapping[escuelaId].escuelaAddress).createMesa(candidates);
  }
  //////////////////////////////////////////////////
  function getEscuela(uint id) public constant returns(address){
    require(existsEscuela(id));
    return escuelaMapping[id].escuelaAddress;
  }
  function existsEscuela(uint id) public constant returns(bool){
    return escuelaIds.length != 0 && escuelaMapping[id].isEscuela;
  }
  function getEscuelas() public constant returns(uint[]){
    return escuelaIds;
  }
  //////////////////////////////////////////////////
  function setFiscal(uint escuelaId, uint mesaId, bytes32 fiscalEmail) public {
    require(existsEscuela(escuelaId));
    Escuela(escuelaMapping[escuelaId].escuelaAddress).setFiscal(mesaId, fiscalEmail);
  }

  function setPresidenteDeMesa(bytes32 delegadoEscuela, uint escuelaId, uint mesaId, bytes32 presidenteDeMesaEmail) public {
    require(existsEscuela(escuelaId));
    Escuela(escuelaMapping[escuelaId].escuelaAddress).setPresidenteDeMesa(delegadoEscuela, mesaId, presidenteDeMesaEmail);
  }

  function setVicepresidenteDeMesa(bytes32 delegadoEscuela, uint escuelaId, uint mesaId, bytes32 presidenteDeMesaEmail) public {
    require(existsEscuela(escuelaId));
    Escuela(escuelaMapping[escuelaId].escuelaAddress).setVicepresidenteDeMesa(delegadoEscuela, mesaId, presidenteDeMesaEmail);
  }

  function setDelegadoDeDistrito(bytes32 newDelegado) public {
    require(delegadoDeDistritoAsignado == "");
    delegadoDeDistritoAsignado = newDelegado;
  }

  function setDelegadoDeEscuela(bytes32 delegadoDistrito, bytes32 delegadoEscuela, uint escuelaId) public {
    require(delegadoDeDistritoAsignado == delegadoDistrito);
    Escuela(escuelaMapping[escuelaId].escuelaAddress).setDelegadoDeEscuela(delegadoEscuela);
  }
  ////////////////////////////////////////////////////////////////////
  /*function createEscuelaByCSV(uint idEscuela, uint idMesa, bytes32[] candidates) public {
    if(!existsEscuela(idEscuela)){
      escuelaMapping[idEscuela] = EscuelaStruct(idEscuela, new Escuela(), escuelaIds.length, true);
      escuelaIds.push(idEscuela);
    }
    Escuela(escuelaMapping[idEscuela].escuelaAddress).createMesaByCSV(idMesa, candidates);
  }*/
}
