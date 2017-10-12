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

  function MesaCRUD() public{
    owner = msg.sender;
  }

  function createMesa(bytes32[] inputCandidates, address crud) public{
    lastId += 1;
    address mesaAddress = new Mesa(inputCandidates, crud);
    mesasMapping[lastId] = MesaStruct(lastId, mesaAddress, mesasIds.length, true);
    mesasIds.push(lastId);
    LogCreateMesa(msg.sender, lastId, mesaAddress);
  }

  function existsMesa(uint id) public constant returns(bool){
    return mesasIds.length != 0 && mesasMapping[id].isMesa;
  }

  function getMesa(uint id) public constant returns(address){
    if(!existsMesa(id)) revert();
    return mesasMapping[id].mesaAddress;
  }

  function getMesas() public constant returns(uint[]){
    return mesasIds;
  }

  function deleteMesa(uint id) public{
    if(!existsMesa(id)) revert();
    uint toDeleteIndex = mesasMapping[id].index;
    uint toMoveIndex = mesasIds[mesasIds.length - 1];
    mesasIds[toDeleteIndex] = toMoveIndex;
    mesasMapping[toMoveIndex].index = toDeleteIndex;
    Mesa(mesasMapping[id].mesaAddress).destroy(owner);
    delete mesasMapping[id];
    mesasIds.length--;

    LogDeleteMesa(msg.sender, id);
  }

  /*Generate an event function for each function that modify the blockchain
  * ex: createMesa
  */

  event LogCreateMesa(address indexed senderAddress, uint mesaId, address mesaAddress);
  event LogUpdateMesa(address indexed senderAddress, uint mesaId);
  event LogDeleteMesa(address indexed senderAddress, uint mesaId);

}
