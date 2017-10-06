pragma solidity ^0.4.11;

import "./MesaCRUD.sol";
import "./Mesa.sol";

contract MesaElectionCRUD is MesaCRUD{

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
