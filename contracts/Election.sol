pragma solidity ^0.4.11;

import "./UserElectionCRUD.sol";
import "./DistritoCRUD.sol";

contract Election {
    address owner;
    address distritoCRUDaddress;
    address userCRUDaddress;
    bool public created;
    bytes32 autoridadElectoral;
    bytes32[] candidates;
    function Election (address newUserCRUDaddress, address newDistritoCRUDaddress) public {
      owner = msg.sender;
      userCRUDaddress = newUserCRUDaddress;
      distritoCRUDaddress = newDistritoCRUDaddress;
    }
    function createAutoridadElectoral(bytes32 email, bytes32 password) external {
      require(!created && autoridadElectoral == "");
      UserElectionCRUD(userCRUDaddress).createAutoridadElectoral(email, password);
      autoridadElectoral = email;
    }
    function createElection(bytes32 email, bytes32[] newCandidates) external {
      require(!created && autoridadElectoral == email);
      candidates = newCandidates;
      created = true;
    }
    function createDistrito(bytes32 ae) public {
      require(created && autoridadElectoral == ae);
      DistritoCRUD(distritoCRUDaddress).createDistrito();
    }
    function createEscuela(bytes32 ae, uint distritoId) public {
        require(created && autoridadElectoral == ae);
        DistritoCRUD(distritoCRUDaddress).createEscuela(distritoId);
    }
    function createMesa(bytes32 ae, uint distritoId, uint escuelaId) public {
        require(created && autoridadElectoral == ae);
        DistritoCRUD(distritoCRUDaddress).createMesa(distritoId, escuelaId, candidates);
    }

    ////////////////////////////////////////////////////////////////////
    function setFiscal(bytes32 ae, uint distritoId, uint escuelaId, uint mesaId, bytes32 fiscalEmail) public {
      require(created && autoridadElectoral == ae);
      DistritoCRUD(distritoCRUDaddress).setFiscal(distritoId, escuelaId, mesaId, fiscalEmail);
    }

    function setPresidenteDeMesa(bytes32 ae, uint distritoId, uint escuelaId, uint mesaId, bytes32 presidenteDeMesaEmail) public {
      require(created && autoridadElectoral == ae);
      DistritoCRUD(distritoCRUDaddress).setPresidenteDeMesa(distritoId, escuelaId, mesaId, presidenteDeMesaEmail);
    }

    function getCandidates() public constant returns(bytes32[]){
      return candidates;
    }

}
