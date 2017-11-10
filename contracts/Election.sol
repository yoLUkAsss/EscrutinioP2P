pragma solidity ^0.4.11;

import "./UserElectionCRUD.sol";
import "./DistritoCRUD.sol";

contract Election {


    address owner;
    address distritoCRUDaddress;
    address userCRUDaddress;
    mapping (bytes32 => bytes32) apoderados;
    bool public created;
    bytes32 autoridadElectoralAsignada;
    bytes32[] candidates;



    function Election (address newUserCRUDaddress, address newDistritoCRUDaddress) public {
      owner = msg.sender;
      userCRUDaddress = newUserCRUDaddress;
      distritoCRUDaddress = newDistritoCRUDaddress;
    }


    /*function setAutoridadElectoral(bytes32 email) external {
      require(!created && autoridadElectoralAsignada == "");
      UserElectionCRUD(userCRUDaddress).setAutoridadElectoral(email);
      autoridadElectoralAsignada = email;
    }*/



/////////////////////////////////////////////////////////////////////////////////////////////////
    function createElectionVerify(bytes32 email, bytes32[] newCandidates) external returns (bool, bytes32) {
      if (created) {
        return (true, "La elección se encuentra creada");
      }
      if (autoridadElectoralAsignada != "") {
        return (true, "Ya existe autoridad electoral");
      }
      if (newCandidates.length < 2) {
        return (true, "Los candidatos deben ser 2+");
      } else {
        return (false, "");
      }
    }
    function createElection(bytes32 email, bytes32[] newCandidates) external {
      require(!created && autoridadElectoralAsignada == "");
      candidates = newCandidates;
      /*candidates.push("votos en blanco");
      candidates.push("votos impugnados");
      candidates.push("votos nulos");*/
      for (uint8 index = 0; index<candidates.length; index++ ) {
          apoderados[candidates[index]] = "";
      }
      UserElectionCRUD(userCRUDaddress).setAutoridadElectoral(email);
      autoridadElectoralAsignada = email;
      created = true;
    }
/////////////////////////////////////////////////////////////////////////////////////////////////

    function verifyAutoridadElectoral(bytes32 email) public returns(bool){
      return autoridadElectoralAsignada == email;
    }

    function getCandidates() public constant returns(bytes32[]) {
      return candidates;
    }


    function isValidCandidate(bytes32 candidate) public constant returns(bool){
      for(uint8 index = 0; index < candidates.length; index++){
        if(candidates[index] == candidate){
          return true;
        }
      }
      return false;
    }

/////////////////////////////////////////////////////////////////////////////////////////////////
    /*function createDistritoVerify(bytes32 autoridadElectoral, uint distritoId) public returns (bool, bytes32) {
      if (! created) {
        return (true, "No existe eleccion creada");
      }
      if (autoridadElectoralAsignada != autoridadElectoral) {
        return (true, "Debe ser autoridad electoral");
      } else {
        return DistritoCRUD(distritoCRUDaddress).createDistritoVerify(distritoId);
      }
    }
    function createDistrito(bytes32 autoridadElectoral, uint distritoId) public {
      require(created && autoridadElectoralAsignada == autoridadElectoral);
      DistritoCRUD(distritoCRUDaddress).createDistrito(distritoId);
    }*/
/////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////////////
    /*function createEscuelaVerify(bytes32 autoridadElectoral, uint distritoId) public returns (bool, bytes32) {
      if (! created) {
        return (true, "No existe eleccion creada");
      }
      if (autoridadElectoralAsignada != autoridadElectoral) {
        return (true, "Debe ser autoridad electoral");
      } else {
        return DistritoCRUD(distritoCRUDaddress).createEscuelaVerify(distritoId);
      }
    }
    function createEscuela(bytes32 autoridadElectoral, uint distritoId) public {
      require(created && autoridadElectoralAsignada == autoridadElectoral);
      DistritoCRUD(distritoCRUDaddress).createEscuela(distritoId);
    }*/
/////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////////////
    /*function createMesaVerify(bytes32 autoridadElectoral, uint distritoId, uint escuelaId) public returns (bool, bytes32) {
      if (! created) {
        return (true, "No existe eleccion creada");
      }
      if (autoridadElectoralAsignada != autoridadElectoral) {
        return (true, "Debe ser autoridad electoral");
      } else {
        return DistritoCRUD(distritoCRUDaddress).createMesaVerify(distritoId, escuelaId, candidates);
      }
    }
    function createMesa(bytes32 autoridadElectoral, uint distritoId, uint escuelaId) public {
      require(created && autoridadElectoralAsignada == autoridadElectoral);
      DistritoCRUD(distritoCRUDaddress).createMesa(distritoId, escuelaId, candidates);
    }*/
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
    /*function mesasCreatedVerify (bytes32 autoridadElectoral, uint distritoId, uint escuelaId) public returns (bool, bytes32) {
      if (! created) {
        return (true, "No existe eleccion creada");
      }
      if (autoridadElectoralAsignada != autoridadElectoral) {
        return (true, "Debe ser autoridad electoral");
      } else {
        return DistritoCRUD(distritoCRUDaddress).mesasCreatedVerify(distritoId, escuelaId);
      }
    }
    function mesasCreated(bytes32 autoridadElectoral, uint distritoId, uint escuelaId) public {
      require(created && autoridadElectoralAsignada == autoridadElectoral);
      DistritoCRUD(distritoCRUDaddress).mesasCreated(distritoId, escuelaId);
    }*/
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
    /*function completeMesaVerify (bytes32 autoridadElectoral, uint distritoId, uint escuelaId, uint mesaId, uint personas) public returns (bool, bytes32) {
      if (! created) {
        return (true, "No existe eleccion creada");
      }
      if (autoridadElectoralAsignada != autoridadElectoral) {
        return (true, "Debe ser autoridad electoral");
      } else {
        return DistritoCRUD(distritoCRUDaddress).completeMesaVerify(distritoId, escuelaId, mesaId, personas);
      }
    }
    function completeMesa (bytes32 autoridadElectoral, uint distritoId, uint escuelaId, uint mesaId, uint personas) public {
      require(created && autoridadElectoralAsignada == autoridadElectoral);
      DistritoCRUD(distritoCRUDaddress).completeMesa(distritoId, escuelaId, mesaId, personas);
    }*/
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
    function setApoderadoVerify(bytes32 autoridadElectoral, bytes32 apoderado, bytes32 candidato) public returns (bool, bytes32) {
      if (autoridadElectoralAsignada != autoridadElectoral) {
        return (true, "Debe ser autoridad electoral");
      }
      if (apoderados[candidato] != "") {
        return (true, "Ya existe apoderado asignado");
      }
      if (!isValidCandidate(candidato)) {
        return (true, "Candidato no existe");
      } else {
        return UserElectionCRUD(userCRUDaddress).setApoderadoVerify(apoderado);
      }
    }
    function setApoderado(bytes32 autoridadElectoral, bytes32 apoderado, bytes32 candidato) public {
        require(autoridadElectoralAsignada == autoridadElectoral && apoderados[candidato] == "" && isValidCandidate(candidato));
        apoderados[candidato] = apoderado;
        UserElectionCRUD(userCRUDaddress).setApoderado(apoderado);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
    function setDelegadoDeDistritoVerify(bytes32 autoridadElectoral, bytes32 delegadoDistrito, uint8 idDistrito) public returns (bool, bytes32) {
      if (autoridadElectoralAsignada != autoridadElectoral) {
        return (true, "Debe ser autoridad electoral");
      } else {
        bool huboError;
        bytes32 mensaje;
        (huboError, mensaje) = UserElectionCRUD(userCRUDaddress).setDelegadoDeDistritoVerify(delegadoDistrito, idDistrito);
        if (huboError) {
          return (huboError, mensaje);
        } else {
          return DistritoCRUD(distritoCRUDaddress).setDelegadoDeDistritoVerify(delegadoDistrito, idDistrito);
        }
      }
    }
    function setDelegadoDeDistrito(bytes32 autoridadElectoral, bytes32 delegadoDistrito, uint8 idDistrito) public {
        require(autoridadElectoralAsignada == autoridadElectoral);
        UserElectionCRUD(userCRUDaddress).setDelegadoDeDistrito(delegadoDistrito, idDistrito);
        DistritoCRUD(distritoCRUDaddress).setDelegadoDeDistrito(delegadoDistrito, idDistrito);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
    function setDelegadoDeEscuelaVerify(bytes32 delegadoDistrito, bytes32 delegadoEscuela, uint8 idDistrito, uint8 idEscuela) public returns (bool, bytes32) {
      bool huboError;
      bytes32 mensaje;
      (huboError, mensaje) = UserElectionCRUD(userCRUDaddress).setDelegadoDeEscuelaVerify(delegadoEscuela, idDistrito, idEscuela);
      if (huboError) {
        return (huboError, mensaje);
      } else {
        return DistritoCRUD(distritoCRUDaddress).setDelegadoDeEscuelaVerify(delegadoDistrito, delegadoEscuela, idDistrito, idEscuela);
      }
    }
    function setDelegadoDeEscuela(bytes32 delegadoDistrito, bytes32 delegadoEscuela, uint8 idDistrito, uint8 idEscuela) public {
        UserElectionCRUD(userCRUDaddress).setDelegadoDeEscuela(delegadoEscuela, idDistrito, idEscuela);
        DistritoCRUD(distritoCRUDaddress).setDelegadoDeEscuela(delegadoDistrito, delegadoEscuela, idDistrito, idEscuela);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////////////
    function setPresidenteDeMesaVerify(bytes32 delegadoEscuela, uint distritoId, uint escuelaId, uint mesaId, bytes32 presidenteDeMesaEmail) public returns (bool, bytes32) {
      bool huboError;
      bytes32 mensaje;
      (huboError, mensaje) = UserElectionCRUD(userCRUDaddress).setPresidenteDeMesaVerify(presidenteDeMesaEmail, distritoId, escuelaId, mesaId);
      if (huboError) {
        return (huboError, mensaje);
      } else {
        return DistritoCRUD(distritoCRUDaddress).setPresidenteDeMesaVerify(delegadoEscuela, distritoId, escuelaId, mesaId, presidenteDeMesaEmail);
      }
    }
    function setPresidenteDeMesa(bytes32 delegadoEscuela, uint distritoId, uint escuelaId, uint mesaId, bytes32 presidenteDeMesaEmail) public {
      UserElectionCRUD(userCRUDaddress).setPresidenteDeMesa(presidenteDeMesaEmail, distritoId, escuelaId, mesaId);
      DistritoCRUD(distritoCRUDaddress).setPresidenteDeMesa(delegadoEscuela, distritoId, escuelaId, mesaId, presidenteDeMesaEmail);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////////////
    function setVicepresidenteDeMesa(bytes32 delegadoEscuela, uint distritoId, uint escuelaId, uint mesaId, bytes32 presidenteDeMesaEmail) public {
      UserElectionCRUD(userCRUDaddress).setVicepresidenteDeMesa(presidenteDeMesaEmail, distritoId, escuelaId, mesaId);
      DistritoCRUD(distritoCRUDaddress).setVicepresidenteDeMesa(delegadoEscuela, distritoId, escuelaId, mesaId, presidenteDeMesaEmail);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////////////
    function setFiscalVerify(bytes32 apoderadoDePartido, bytes32 candidato, bytes32 fiscalEmail, uint distritoId, uint escuelaId, uint mesaId) public returns (bool, bytes32) {
      if (apoderados[candidato] != apoderadoDePartido) {
        return (true, "Debe ser apoderado del partido");
      } else {
        bool huboError;
        bytes32 mensaje;
        (huboError, mensaje) = UserElectionCRUD(userCRUDaddress).setFiscalVerify(fiscalEmail, distritoId, escuelaId, mesaId);
        if (huboError) {
          return (huboError, mensaje);
        } else {
          return DistritoCRUD(distritoCRUDaddress).setFiscalVerify(distritoId, escuelaId, mesaId, fiscalEmail);
        }
      }
    }
    function setFiscal(bytes32 apoderadoDePartido, bytes32 candidato, bytes32 fiscalEmail, uint distritoId, uint escuelaId, uint mesaId) public {
      require(apoderados[candidato] == apoderadoDePartido);
      UserElectionCRUD(userCRUDaddress).setFiscal(fiscalEmail, distritoId, escuelaId, mesaId);
      DistritoCRUD(distritoCRUDaddress).setFiscal(distritoId, escuelaId, mesaId, fiscalEmail);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////
    /*function createElectionByCSV(bytes32 autoridadElectoral, uint idDistrito, uint idEscuela, uint idMesa) public {
      require(created && autoridadElectoralAsignada == autoridadElectoral);
      DistritoCRUD(distritoCRUDaddress).createDistritoByCSV(idDistrito, idEscuela, idMesa, candidates);
    }*/
}
