pragma solidity ^0.4.11;

import "./Mesa.sol";
import "./UserElectionCRUD.sol";
import "./MesaElectionCRUD.sol";

contract Election {
    address owner;
    address userCRUDaddress;
    address mesaCRUDaddress;

    bool public created;
    bytes32 autoridadElectoral;

    function Election (address uecrud, address mcrud) public {
      owner = msg.sender;
      userCRUDaddress = uecrud;
      mesaCRUDaddress = mcrud;
    }

    function getUserCRUDaddress(bytes32 ae) external constant returns(address){
        // if(!created || ae != autoridadElectoral) revert();
        return userCRUDaddress;
    }
    function getMesaCRUDaddress(bytes32 ae) external constant returns(address){
        // if(!created || ae != autoridadElectoral) revert();
        return mesaCRUDaddress;
    }

    function createElection(bytes32 email) external {
        /*if (created) revert();*/
        require(!created);
        UserElectionCRUD(userCRUDaddress).createAutoridadElectoral(email, "");
        autoridadElectoral = email;
        created = true;
        CreateElection(msg.sender);
    }

    function addPresidenteDeMesa(bytes32 ae, bytes32 presidente, bytes32 password, uint mesaId) public {
        /*if(ae != autoridadElectoral) revert();*/
        /*require(sha3(ae) == sha3(autoridadElectoral));*/
        UserElectionCRUD(userCRUDaddress).createPresidenteDeMesa(presidente, password);
        MesaElectionCRUD(mesaCRUDaddress).setPresidenteDeMesa(mesaId, presidente);
    }

    function addFiscal(bytes32 ae, bytes32 fiscal, bytes32 password, uint mesaId) public {
        /*if(ae != autoridadElectoral) revert();*/
        /*require(sha3(ae) == sha3(autoridadElectoral));*/
        UserElectionCRUD(userCRUDaddress).createFiscal(fiscal, password);
        MesaElectionCRUD(mesaCRUDaddress).setFiscal(mesaId, fiscal);
    }

    function addApoderadoDePartido(bytes32 ae, bytes32 fiscal, bytes32 password) public {
      /*require(sha3(ae) == sha3(autoridadElectoral));*/
      UserElectionCRUD(userCRUDaddress).createFiscal(fiscal, password);
    }

    function createMesa(bytes32 autoridad, bytes32[] candidates) public {
        /*require(sha3(autoridad) == sha3(autoridadElectoral));*/
      MesaElectionCRUD(mesaCRUDaddress).createMesa(candidates);
    }

    event CreateElection(address indexed senderAddress);
}
