pragma solidity ^0.4.11;

import "./Mesa.sol";

contract MesaCRUD {

  address owner;
  uint[] mesasIds;
  uint lastId;

  struct MesaStruct {
    uint id;
    address mesaAddress;
    uint index;
    bool isMesa;
  }

  mapping (uint => MesaStruct) mesasMapping;

  function MesaCRUD(){
    owner = msg.sender;
  }

  function createMesa(bytes32 apoderado, bytes32[] fiscales, bytes32[] inputCandidates, uint8 inputTotalVotes){
    address mesaAddress = new Mesa(apoderado, fiscales, inputCandidates, inputTotalVotes);
    mesasMapping[mesasIds.length] = MesaStruct(lastId, mesaAddress, mesasIds.length, true);
    mesasIds.push(mesasIds.length);
    LogCreateMesa(msg.sender, lastId, mesaAddress);
    lastId += 1;
  }
  function existsMesa(uint id) constant returns(bool){
    return mesasIds.length > 0 && mesasMapping[id].isMesa;
  }
  /*Devuelve la lista con los id de todos los usuarios*/
  function getMesas() constant returns(uint[]){
    return mesasIds;
  }

  function getMesa(uint id) constant returns(address){
    if(!existsMesa(id)) revert();
    return mesasMapping[id].mesaAddress;
  }

  function updateMesa(uint id){
    if(!existsMesa(id)) revert();
    LogUpdateMesa(msg.sender, id);
  }

  function deleteMesa(uint id){
    if(!existsMesa(id)) revert();
    uint toDeleteIndex = mesasMapping[id].index;
    uint toMoveIndex = mesasIds[mesasIds.length - 1];
    mesasIds[toDeleteIndex] = toMoveIndex;
    mesasMapping[toMoveIndex].index = toDeleteIndex;
    var m = Mesa(mesasMapping[id].mesaAddress);
    m.destroy(owner);
    delete mesasMapping[id];
    mesasIds.length--;
    LogDeleteMesa(msg.sender, id);
  }

  /*Generate an event function for each function that modify the blockchain
  * ex: createMesa
  */

  event LogCreateMesa(address indexed userAddress, uint userId, address mesaAddress);
  event LogUpdateMesa(address indexed userAddress, uint userId);
  event LogDeleteMesa(address indexed userAddress, uint userId);

}
