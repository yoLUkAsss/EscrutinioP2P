pragma solidity ^0.4.11;

import "./MesaCRUD.sol";
import "./Mesa.sol";

contract MesaElectionCRUD is MesaCRUD{


  function MesaElectionCRUD () {

  }

  function setFiscal(uint id, bytes32 fiscal) public {
    if(!existsMesa(id)) revert();
    Mesa m = Mesa(mesasMapping[id].mesaAddress);
    m.setFiscal(fiscal);
    SetUserToMesa(msg.sender, id, fiscal);
  }

  function setPresidenteDeMesa(uint id, bytes32 pdm) public {
    if(!existsMesa(id)) revert();
    Mesa m = Mesa(mesasMapping[id].mesaAddress);
    m.setPresidenteDeMesa(pdm);
    SetUserToMesa(msg.sender, id, pdm);
  }

  function setVicepresidenteDeMesa(uint id, bytes32 vpdm) public {
    if(!existsMesa(id)) revert();
    Mesa m = Mesa(mesasMapping[id].mesaAddress);
    m.setVicePresidenteDeMesa(vpdm);
    SetUserToMesa(msg.sender, id, vpdm);
  }

  event SetUserToMesa(address indexed userAddress, uint mesaId, bytes32 user);

}
