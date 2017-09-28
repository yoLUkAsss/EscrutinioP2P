pragma solidity ^0.4.11;

import "./MesaCRUD.sol";
import "./Mesa.sol";

contract MesaElectionCRUD is MesaCRUD{

  function setFiscal(uint id, bytes32 fiscal) public {
    if(!existsMesa(id)) revert();
    Mesa m = Mesa(mesasMapping[id].mesaAddress);
    m.setFiscal(fiscal);
  }

  function setPresidenteDeMesa(uint id, bytes32 pdm) public {
    if(!existsMesa(id)) revert();
    Mesa m = Mesa(mesasMapping[id].mesaAddress);
    m.setPresidenteDeMesa(pdm);
  }

  function setVicepresidenteDeMesa(uint id, bytes32 vpdm) public {
    if(!existsMesa(id)) revert();
    Mesa m = Mesa(mesasMapping[id].mesaAddress);
    m.setVicePresidenteDeMesa(vpdm);
  }

}
