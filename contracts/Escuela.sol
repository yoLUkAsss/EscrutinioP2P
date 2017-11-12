pragma solidity ^0.4.11;

import "./Mesa.sol";

contract Escuela {


  uint lastId;
  uint[] mesaIds;
  bytes32 delegadoDeEscuelaAsignado;
  bool mesasCreadas;
  mapping (uint => MesaStruct) mesaMapping;


  struct MesaStruct {
    uint id;
    address mesaAddress;
    uint index;
    bool isMesa;
  }

/////////////////////////////////////////////////////////////////////////////////////////////////
  function createMesaVerify(bytes32[] inputCandidates) public returns (bool, bytes32) {
    if (mesasCreadas) {
      return (true, "Ya existen mesas creadas");
    } else {
      return (false, "");
    }
  }
  function createMesa(bytes32[] inputCandidates, address countsAddress) public{
    require(! mesasCreadas);
    lastId += 1;
    mesaMapping[lastId] = MesaStruct(lastId, new Mesa(inputCandidates, countsAddress), mesaIds.length, true);
    mesaIds.push(lastId);
  }
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
  function mesasCreatedVerify() public returns (bool, bytes32) {
    if (mesasCreadas) {
      return (true, "Mesas creadas ya validadas");
    } else {
      return (false, "");
    }
  }
  function mesasCreated() public {
    require (! mesasCreadas);
    mesasCreadas = true;
  }
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
    function completeMesaVerify(uint mesaId, uint personas) public returns (bool, bytes32) {
      if (! mesasCreadas) {
        return (true, "No existen mesas creadas");
      }
      if (! existsMesa(mesaId)) {
        return (true, "ID de mesa inexistente");
      } else {
        return Mesa(mesaMapping[mesaId].mesaAddress).completeMesaVerify(personas);
      }
    }
    function completeMesa(uint mesaId, uint personas) public {
      require (mesasCreadas && existsMesa(mesaId));
      Mesa(mesaMapping[mesaId].mesaAddress).completeMesa(personas);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////



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



/////////////////////////////////////////////////////////////////////////////////////////////////
  function setFiscalVerify(uint mesaId, bytes32 fiscalEmail) public returns (bool, bytes32) {
    if (! existsMesa(mesaId)) {
      return (true, "ID de mesa inexistente");
    } else {
      return Mesa(mesaMapping[mesaId].mesaAddress).setFiscalVerify(fiscalEmail);
    }
  }
  function setFiscal(uint mesaId, bytes32 fiscalEmail) public {
    require(existsMesa(mesaId));
    Mesa(mesaMapping[mesaId].mesaAddress).setFiscal(fiscalEmail);
  }
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
  function setPresidenteDeMesaVerify(bytes32 delegadoEscuela, uint mesaId, bytes32 presidenteDeMesaEmail) public returns (bool, bytes32) {
    if (! existsMesa(mesaId)) {
      return (true, "ID de mesa inexistente");
    }
    if (delegadoDeEscuelaAsignado != delegadoEscuela) {
      return (true, "Debe ser delegado de escuela");
    } else {
      return Mesa(mesaMapping[mesaId].mesaAddress).setPresidenteDeMesaVerify(presidenteDeMesaEmail);
    }
  }
  function setPresidenteDeMesa(bytes32 delegadoEscuela, uint mesaId, bytes32 presidenteDeMesaEmail) public {
    require(existsMesa(mesaId));
    require(delegadoDeEscuelaAsignado == delegadoEscuela);
    Mesa(mesaMapping[mesaId].mesaAddress).setPresidenteDeMesa(presidenteDeMesaEmail);
  }
/////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////////////
  function setVicepresidenteDeMesa(bytes32 delegadoEscuela, uint mesaId, bytes32 presidenteDeMesaEmail) public {
    require(existsMesa(mesaId));
    require(delegadoDeEscuelaAsignado == delegadoEscuela);
    Mesa(mesaMapping[mesaId].mesaAddress).setVicepresidenteDeMesa(presidenteDeMesaEmail);
  }
/////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////////////
  function setDelegadoDeEscuelaVerify(bytes32 newDelegadoDeEscuela) public returns (bool, bytes32) {
    if (delegadoDeEscuelaAsignado != "") {
      return (true, "Ya hay delegado asignado");
    } else {
      return (false, "");
    }
  }
  function setDelegadoDeEscuela(bytes32 newDelegadoDeEscuela) public {
    require(delegadoDeEscuelaAsignado == "");
    delegadoDeEscuelaAsignado = newDelegadoDeEscuela;
  }
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

  /*function getCounts(bytes32 candidate) public constant returns(bytes32, uint){
    return (candidate, 0);
  }
  function check(bytes32 presidente, bytes32[] candidatos, uint[] conteos, uint mesa) public {
    count(candidatos, conteos);
    Mesa(mesaMapping[distrito].mesaAddress).check(presidente, candidatos, conteos);
  }
  function count(bytes32[] candidatos, uint[] conteos) internal {
    for(uint i=0;i<candidatos.length; i++){
      counts[candidatos[i]] = conteos[i];
    }
  }*/

  /*function createMesaByCSV(uint idMesa, bytes32[] candidates) public {
    require(!existsMesa(idMesa));
    mesaMapping[idMesa] = MesaStruct(idMesa, new Mesa(candidates), mesaIds.length, true);
    mesaIds.push(idMesa);
  }*/

}
