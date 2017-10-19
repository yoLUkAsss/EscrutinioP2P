pragma solidity ^0.4.11;

import "./Mesa.sol";

contract MesaCRUD {
  address owner;
  uint[] mesaIds;
  uint lastId;
  struct MesaStruct {
    uint id;
    address mesaAddress;
    uint index;
    bool isMesa;
  }
  mapping (uint => MesaStruct) mesaMapping;
  function MesaCRUD() public{
    owner = msg.sender;
  }
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
  function deleteMesa(uint id) public{
    if(!existsMesa(id)) revert();
    uint toDeleteIndex = mesaMapping[id].index;
    uint toMoveIndex = mesaIds[mesaIds.length - 1];
    mesaIds[toDeleteIndex] = toMoveIndex;
    mesaMapping[toMoveIndex].index = toDeleteIndex;
    Mesa(mesaMapping[id].mesaAddress).destroy(owner);
    delete mesaMapping[id];
    mesaIds.length--;
  }
  function destroy(address parent) public {
    require(owner == parent);
    selfdestruct(parent);
  }
  /////////////////////////////////////////////////////
  function setFiscal(uint mesaId, bytes32 fiscalEmail) public {
    require(existsMesa(mesaId));
    Mesa(mesaMapping[mesaId].mesaAddress).setFiscal(fiscalEmail);
  }
  function setPresidenteDeMesa(uint mesaId, bytes32 presidenteDeMesaEmail) public {
    require(existsMesa(mesaId));
    Mesa(mesaMapping[mesaId].mesaAddress).setPresidenteDeMesa(presidenteDeMesaEmail);
  }

}
