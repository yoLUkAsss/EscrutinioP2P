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
    function setAutoridadElectoral(bytes32 email) external {
      require(!created && autoridadElectoralAsignada == "");
      UserElectionCRUD(userCRUDaddress).setAutoridadElectoral(email);
      autoridadElectoralAsignada = email;
    }
    function createElection(bytes32 email, bytes32[] newCandidates) external {
      require(!created && autoridadElectoralAsignada == email);
      candidates = newCandidates;
      candidates.push("votos en blanco");
      candidates.push("votos impugnados");
      candidates.push("votos nulos");
      for (uint8 index = 0; index<candidates.length; index++ ) {
          apoderados[candidates[index]] = "";
      }
      created = true;
    }
    function createDistrito(bytes32 autoridadElectoral) public {
      require(created && autoridadElectoralAsignada == autoridadElectoral);
      DistritoCRUD(distritoCRUDaddress).createDistrito();
    }
    function createEscuela(bytes32 autoridadElectoral, uint distritoId) public {
        require(created && autoridadElectoralAsignada == autoridadElectoral);
        DistritoCRUD(distritoCRUDaddress).createEscuela(distritoId);
    }
    function createMesa(bytes32 autoridadElectoral, uint distritoId, uint escuelaId) public {
        require(created && autoridadElectoralAsignada == autoridadElectoral);
        DistritoCRUD(distritoCRUDaddress).createMesa(distritoId, escuelaId, candidates);
    }

    ////////////////////////////////////////////////////////////////////
    function setFiscal(bytes32 apoderadoDePartido, bytes32 candidato, bytes32 fiscalEmail, uint distritoId, uint escuelaId, uint mesaId) public {
      require(apoderados[candidato] == apoderadoDePartido);
      UserElectionCRUD(userCRUDaddress).setFiscal(fiscalEmail);
      DistritoCRUD(distritoCRUDaddress).setFiscal(distritoId, escuelaId, mesaId, fiscalEmail);
    }

    function getCandidates() public constant returns(bytes32[]){
      return candidates;
    }

    function setApoderado(bytes32 autoridadElectoral, bytes32 apoderado, bytes32 candidato) public {
        require(autoridadElectoralAsignada == autoridadElectoral && apoderados[candidato] == "");
        apoderados[candidato] = apoderado;
        UserElectionCRUD(userCRUDaddress).setApoderado(apoderado);
    }

    function setDelegadoDeDistrito(bytes32 autoridadElectoral, bytes32 delegadoDistrito, uint8 idDistrito) public {
        require(autoridadElectoralAsignada == autoridadElectoral);
        UserElectionCRUD(userCRUDaddress).setDelegadoDeDistrito(delegadoDistrito);
        DistritoCRUD(distritoCRUDaddress).setDelegadoDeDistrito(delegadoDistrito, idDistrito);
    }

    function setDelegadoDeEscuela(bytes32 delegadoDistrito, bytes32 delegadoEscuela, uint8 idDistrito, uint8 idEscuela) public {
        UserElectionCRUD(userCRUDaddress).setDelegadoDeEscuela(delegadoEscuela);
        DistritoCRUD(distritoCRUDaddress).setDelegadoDeEscuela(delegadoDistrito, delegadoEscuela, idDistrito, idEscuela);
    }

    function setPresidenteDeMesa(bytes32 delegadoEscuela, uint distritoId, uint escuelaId, uint mesaId, bytes32 presidenteDeMesaEmail) public {
      UserElectionCRUD(userCRUDaddress).setPresidenteDeMesa(presidenteDeMesaEmail);
      DistritoCRUD(distritoCRUDaddress).setPresidenteDeMesa(delegadoEscuela, distritoId, escuelaId, mesaId, presidenteDeMesaEmail);
    }

    function setVicepresidenteDeMesa(bytes32 delegadoEscuela, uint distritoId, uint escuelaId, uint mesaId, bytes32 presidenteDeMesaEmail) public {
      UserElectionCRUD(userCRUDaddress).setVicepresidenteDeMesa(presidenteDeMesaEmail);
      DistritoCRUD(distritoCRUDaddress).setVicepresidenteDeMesa(delegadoEscuela, distritoId, escuelaId, mesaId, presidenteDeMesaEmail);
    }
    ////////////////////////////////////////////////////////////////////
    function createElectionByCSV(uint idDistrito, uint idEscuela, uint idMesa) public {
      DistritoCRUD(distritoCRUDaddress).createDistritoByCSV(idDistrito, idEscuela, idMesa, candidates);
    }
}
