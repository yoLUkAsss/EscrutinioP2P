pragma solidity ^0.4.11;

import "./Escuela.sol";

contract Distrito {


  uint lastEscuelaId;
  uint[] escuelaIds;
  mapping (uint => EscuelaStruct) escuelaMapping;
  bytes32 delegadoDeDistritoAsignado;


  struct EscuelaStruct {
    uint id;
    address escuelaAddress;
    uint index;
    bool isEscuela;
  }



/////////////////////////////////////////////////////////////////////////////////////////////////
  function createEscuela(uint escuelaId) public {
    /*lastEscuelaId += 1;*/
    escuelaMapping[escuelaId] = EscuelaStruct(escuelaId, new Escuela(), escuelaIds.length, true);
    escuelaIds.push(escuelaId);
  }
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
  /*function createMesaVerify(uint escuelaId, bytes32[] candidates) public returns (bool, bytes32) {
    if (! existsEscuela(escuelaId)) {
      return (true, "ID de escuela inexistente");
    } else {
      return Escuela(escuelaMapping[escuelaId].escuelaAddress).createMesaVerify(candidates);
    }
  }
  function createMesa(uint escuelaId, bytes32[] candidates) public {
    require(existsEscuela(escuelaId));
    Escuela(escuelaMapping[escuelaId].escuelaAddress).createMesa(candidates);
  }*/
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
    /*function mesasCreatedVerify(uint escuelaId) public returns (bool, bytes32) {
      if (! existsEscuela(escuelaId)) {
        return (true, "ID de escuela inexistente");
      } else {
        return Escuela(escuelaMapping[escuelaId].escuelaAddress).mesasCreatedVerify();
      }
    }
    function mesasCreated(uint escuelaId) public {
      require(existsEscuela(escuelaId));
      Escuela(escuelaMapping[escuelaId].escuelaAddress).mesasCreated();
    }*/
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
    /*function completeMesaVerify(uint escuelaId, uint mesaId, uint personas) public returns (bool, bytes32) {
      if (! existsEscuela(escuelaId)) {
        return (true, "ID de escuela inexistente");
      } else {
        return Escuela(escuelaMapping[escuelaId].escuelaAddress).completeMesaVerify(mesaId, personas);
      }
    }
    function completeMesa(uint escuelaId, uint mesaId, uint personas) public {
      require(existsEscuela(escuelaId));
      Escuela(escuelaMapping[escuelaId].escuelaAddress).completeMesa(mesaId, personas);
    }*/
/////////////////////////////////////////////////////////////////////////////////////////////////




  //////////////////////////////////////////////////
  function getEscuela(uint id) public constant returns(address){
    require(existsEscuela(id));
    return escuelaMapping[id].escuelaAddress;
  }
  function existsEscuela(uint id) public constant returns(bool){
    return escuelaIds.length != 0 && escuelaMapping[id].isEscuela;
  }
  function getEscuelas() public constant returns(uint[]){
    return escuelaIds;
  }



/////////////////////////////////////////////////////////////////////////////////////////////////
  function setFiscalVerify(uint escuelaId, uint mesaId, bytes32 fiscalEmail) public returns (bool, bytes32) {
    if (! existsEscuela(escuelaId)) {
      return (true, "ID de escuela inexistente");
    } else {
      return Escuela(escuelaMapping[escuelaId].escuelaAddress).setFiscalVerify(mesaId, fiscalEmail);
    }
  }
  function setFiscal(uint escuelaId, uint mesaId, bytes32 fiscalEmail) public {
    require(existsEscuela(escuelaId));
    Escuela(escuelaMapping[escuelaId].escuelaAddress).setFiscal(mesaId, fiscalEmail);
  }
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
  function setPresidenteDeMesaVerify(bytes32 delegadoEscuela, uint escuelaId, uint mesaId, bytes32 presidenteDeMesaEmail) public returns (bool, bytes32) {
    if (! existsEscuela(escuelaId)) {
      return (true, "ID de escuela inexistente");
    } else {
      return Escuela(escuelaMapping[escuelaId].escuelaAddress).setPresidenteDeMesaVerify(delegadoEscuela, mesaId, presidenteDeMesaEmail);
    }
  }
  function setPresidenteDeMesa(bytes32 delegadoEscuela, uint escuelaId, uint mesaId, bytes32 presidenteDeMesaEmail) public {
    require(existsEscuela(escuelaId));
    Escuela(escuelaMapping[escuelaId].escuelaAddress).setPresidenteDeMesa(delegadoEscuela, mesaId, presidenteDeMesaEmail);
  }
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
  function setVicepresidenteDeMesa(bytes32 delegadoEscuela, uint escuelaId, uint mesaId, bytes32 presidenteDeMesaEmail) public {
    require(existsEscuela(escuelaId));
    Escuela(escuelaMapping[escuelaId].escuelaAddress).setVicepresidenteDeMesa(delegadoEscuela, mesaId, presidenteDeMesaEmail);
  }
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
  function setDelegadoDeDistritoVerify(bytes32 newDelegado) public returns (bool, bytes32) {
    if (delegadoDeDistritoAsignado != "") {
      return (true, "Ya existe delegado asignado");
    } else {
      return (false, "");
    }
  }
  function setDelegadoDeDistrito(bytes32 newDelegado) public {
    require(delegadoDeDistritoAsignado == "");
    delegadoDeDistritoAsignado = newDelegado;
  }
/////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////////////
  function setDelegadoDeEscuelaVerify(bytes32 delegadoDistrito, bytes32 delegadoEscuela, uint escuelaId) public returns (bool, bytes32) {
    if (delegadoDeDistritoAsignado != delegadoDistrito) {
      return (true, "Debe ser delegado de distrito");
    } else {
      return Escuela(escuelaMapping[escuelaId].escuelaAddress).setDelegadoDeEscuelaVerify(delegadoEscuela);
    }
  }
  function setDelegadoDeEscuela(bytes32 delegadoDistrito, bytes32 delegadoEscuela, uint escuelaId) public {
    require(delegadoDeDistritoAsignado == delegadoDistrito);
    Escuela(escuelaMapping[escuelaId].escuelaAddress).setDelegadoDeEscuela(delegadoEscuela);
  }
/////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////
  /*function createEscuelaByCSV(uint idEscuela, uint idMesa, bytes32[] candidates) public {
    if(!existsEscuela(idEscuela)){
      escuelaMapping[idEscuela] = EscuelaStruct(idEscuela, new Escuela(), escuelaIds.length, true);
      escuelaIds.push(idEscuela);
    }
    Escuela(escuelaMapping[idEscuela].escuelaAddress).createMesaByCSV(idMesa, candidates);
  }*/
}
