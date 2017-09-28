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

  function createMesa(bytes32 apoderado, bytes32[] fiscales, bytes32[] inputCandidates, uint8 inputTotalVotes) public{
    lastId += 1;
    address mesaAddress = new Mesa(apoderado, fiscales, inputCandidates, inputTotalVotes);
    mesasMapping[lastId] = MesaStruct(lastId, mesaAddress, mesasIds.length, true);
    mesasIds.push(lastId);
    LogCreateMesa(msg.sender, lastId, mesaAddress);
  }

  function isEmpty() internal constant returns(bool){
      return mesasIds.length == 0;
  }

  function existsMesa(uint id) public constant returns(bool){
    return !isEmpty() && mesasMapping[id].isMesa;
  }

  function getMesas() public constant returns(uint[]){
    return mesasIds;
  }

  function getMesa(uint id) public constant returns(uint, address){
    if(!existsMesa(id)) revert();
    return (id, mesasMapping[id].mesaAddress);
  }

  function updateMesa(uint id) public{
    if(!existsMesa(id)) revert();
    LogUpdateMesa(msg.sender, id);
  }

  function deleteMesa(uint id) public{
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

  event LogCreateMesa(address indexed senderAddress, uint mesaId, address mesaAddress);
  event LogUpdateMesa(address indexed senderAddress, uint mesaId);
  event LogDeleteMesa(address indexed senderAddress, uint mesaId);

}
