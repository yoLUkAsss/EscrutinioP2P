pragma solidity ^0.4.11;

import "./Distrito.sol";

contract DistritoCRUD {
  uint[] distritoIds;
  mapping (uint => DistritoStruct) distritoMapping;
  struct DistritoStruct {
    uint id;
    address distritoAddress;
    uint index;
    bool isDistrito;
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
  ////////////////////////////////////////////////////////////////////
  function createDistritoByCSV(uint idDistrito, uint idEscuela, uint idMesa, bytes32[] candidates) public {
    if(!existsDistrito(idDistrito)){
      distritoMapping[idDistrito] = DistritoStruct(idDistrito, new Distrito(), distritoIds.length, true);
      distritoIds.push(idDistrito);
    }
    Distrito(distritoMapping[idDistrito].distritoAddress).createEscuelaByCSV(idEscuela, idMesa, candidates);
  }

}
