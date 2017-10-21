pragma solidity ^0.4.11;

import "./Distrito.sol";

contract DistritoCRUD {
  address owner;
  uint[] distritoIds;
  uint public lastDistritoId;
  mapping (uint => DistritoStruct) distritoMapping;
  struct DistritoStruct {
    uint id;
    address distritoAddress;
    uint index;
    bool isDistrito;
  }
  function DistritoCRUD() public {
    owner = msg.sender;
  }
  function createDistrito() public {
    lastDistritoId += 1;
    distritoMapping[lastDistritoId] = DistritoStruct(lastDistritoId, new Distrito(), distritoIds.length, true);
    distritoIds.push(lastDistritoId);
  }
  function getDistrito(uint id) public constant returns(address){
    require(existsDistrito(id));
    return distritoMapping[id].distritoAddress;
  }
  function existsDistrito(uint id) public constant returns(bool){
    return distritoIds.length != 0 && distritoMapping[id].isDistrito;
  }
  function getDistritos() public constant returns(uint[]){
    return distritoIds;
  }
  function deleteDistrito(uint id) public{
    require(existsDistrito(id));
    uint toDeleteIndex = distritoMapping[id].index;
    uint toMoveIndex = distritoIds[distritoIds.length - 1];
    distritoIds[toDeleteIndex] = toMoveIndex;
    distritoMapping[toMoveIndex].index = toDeleteIndex;
    Distrito(distritoMapping[id].distritoAddress).destroy(owner);
    delete distritoMapping[id];
    delete distritoIds[distritoIds.length - 1];
    distritoIds.length--;
  }

  ///////////////////////////////////////////////
  function createEscuela(uint distritoId) public {
    require(existsDistrito(distritoId));
    Distrito(distritoMapping[distritoId].distritoAddress).createMesaCRUD();
  }

  function createMesa(uint distritoId, uint escuelaId, bytes32[] candidates) public {
    require(existsDistrito(distritoId));
    Distrito(distritoMapping[distritoId].distritoAddress).createMesa(escuelaId, candidates);
  }
  ///////////////////////////////////////////////
  function setFiscal(uint distritoId, uint escuelaId, uint mesaId, bytes32 fiscalEmail) public {
    require(existsDistrito(distritoId));
    Distrito(distritoMapping[distritoId].distritoAddress).setFiscal(escuelaId, mesaId, fiscalEmail);
  }

  function setDelegadoDeDistrito(bytes32 delegadoDeDistrito, uint distritoId) public {
    require(existsDistrito(distritoId));
    Distrito(distritoMapping[distritoId].distritoAddress).setDelegadoDeDistrito(delegadoDeDistrito);
  }

  function setDelegadoDeEscuela(bytes32 delegadoDistrito, bytes32 delegadoEscuela, uint distritoId, uint idEscuela) public {
    require(existsDistrito(distritoId));
    Distrito(distritoMapping[distritoId].distritoAddress).setDelegadoDeEscuela(delegadoDistrito, delegadoEscuela, idEscuela);
  }
  
  function setPresidenteDeMesa(bytes32 delegadoEscuela, uint distritoId, uint escuelaId, uint mesaId, bytes32 presidenteDeMesaEmail) public {
    require(existsDistrito(distritoId));
    Distrito(distritoMapping[distritoId].distritoAddress).setPresidenteDeMesa(delegadoEscuela, escuelaId, mesaId, presidenteDeMesaEmail);
  }

  function setVicepresidenteDeMesa(bytes32 delegadoEscuela, uint distritoId, uint escuelaId, uint mesaId, bytes32 presidenteDeMesaEmail) public {
    require(existsDistrito(distritoId));
    Distrito(distritoMapping[distritoId].distritoAddress).setVicepresidenteDeMesa(delegadoEscuela, escuelaId, mesaId, presidenteDeMesaEmail);
  }

}
