pragma solidity ^0.4.11;

import "./MesaCRUD.sol";

contract Distrito {
  address owner;
  uint[] mesaCRUDIds;
  uint lastMesaCRUDId;
  mapping (uint => MesaCRUDStruct) mesaCRUDMapping;
  struct MesaCRUDStruct {
    uint id;
    address mesaCRUDAddress;
    uint index;
    bool isMesaCRUD;
  }
  function Distrito() public {
    owner = msg.sender;
  }
  function createMesaCRUD() public {
    lastMesaCRUDId += 1;
    mesaCRUDMapping[lastMesaCRUDId] = MesaCRUDStruct(lastMesaCRUDId, new MesaCRUD(), mesaCRUDIds.length, true);
    mesaCRUDIds.push(lastMesaCRUDId);
  }
  function getMesaCRUD(uint id) public constant returns(address){
    require(existsMesaCRUD(id));
    return mesaCRUDMapping[id].mesaCRUDAddress;
  }
  function existsMesaCRUD(uint id) public constant returns(bool){
    return mesaCRUDIds.length != 0 && mesaCRUDMapping[id].isMesaCRUD;
  }
  function getMesasCRUD() public constant returns(uint[]){
    return mesaCRUDIds;
  }
  function deleteMesaCRUD(uint id) public{
    require(existsMesaCRUD(id));
    uint toDeleteIndex = mesaCRUDMapping[id].index;
    uint toMoveIndex = mesaCRUDIds[mesaCRUDIds.length - 1];
    mesaCRUDIds[toDeleteIndex] = toMoveIndex;
    mesaCRUDMapping[toMoveIndex].index = toDeleteIndex;
    MesaCRUD(mesaCRUDMapping[id].mesaCRUDAddress).destroy(owner);
    delete mesaCRUDMapping[id];
    delete mesaCRUDIds[mesaCRUDIds.length - 1];
    mesaCRUDIds.length--;
  }
  function destroy(address parent) public {
    require(owner == parent);
    selfdestruct(parent);
  }
  //////////////////////////////////////////////////
  function createMesa(uint escuelaId, bytes32[] candidates) public {
    require(existsMesaCRUD(escuelaId));
    MesaCRUD(mesaCRUDMapping[escuelaId].mesaCRUDAddress).createMesa(candidates);
  }

  //////////////////////////////////////////////////
  function setFiscal(uint escuelaId, uint mesaId, bytes32 fiscalEmail) public {
    require(existsMesaCRUD(escuelaId));
    MesaCRUD(mesaCRUDMapping[escuelaId].mesaCRUDAddress).setFiscal(mesaId, fiscalEmail);
  }

  function setPresidenteDeMesa(uint escuelaId, uint mesaId, bytes32 presidenteDeMesaEmail) public {
    require(existsMesaCRUD(escuelaId));
    MesaCRUD(mesaCRUDMapping[escuelaId].mesaCRUDAddress).setPresidenteDeMesa(mesaId, presidenteDeMesaEmail);
  }

}
