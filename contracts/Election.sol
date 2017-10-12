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
      /*if(ae != autoridadElectoral) revert();*/
      return userCRUDaddress;
    }
    function getMesaCRUDaddress(bytes32 ae) external constant returns(address){
      /*if(ae != autoridadElectoral) revert();*/
      return mesaCRUDaddress;
    }

    function createElection(bytes32 email, bytes32 password, bytes32[] candidates) external {
      require(!created);
      UserElectionCRUD(userCRUDaddress).createAutoridadElectoral(email, password);
      MesaElectionCRUD(mesaCRUDaddress).setCandidates(candidates);
      autoridadElectoral = email;
      created = true;
      CreateElection(msg.sender);
    }
    modifier onlyAutoridadElectoral(bytes32 ae) {
      require(ae == autoridadElectoral && created);
      _;
    }

    function setPresidenteDeMesa(bytes32 ae, bytes32 presidente, uint mesaId) public onlyAutoridadElectoral(ae) {
        /*require(sha3(ae) == sha3(autoridadElectoral));*/
        UserElectionCRUD(userCRUDaddress).setPresidenteDeMesa(presidente);
        MesaElectionCRUD(mesaCRUDaddress).setPresidenteDeMesa(mesaId, presidente);
    }

    function setFiscal(bytes32 ae, bytes32 fiscal, uint mesaId) public onlyAutoridadElectoral(ae){
        /*require(sha3(ae) == sha3(autoridadElectoral));*/
        UserElectionCRUD(userCRUDaddress).setFiscal(fiscal);
        MesaElectionCRUD(mesaCRUDaddress).setFiscal(mesaId, fiscal);
    }

    function createMesa(bytes32 ae) public onlyAutoridadElectoral(ae){
        /*require(sha3(autoridad) == sha3(autoridadElectoral));*/
      MesaElectionCRUD(mesaCRUDaddress).createMesaElection();
    }

    event CreateElection(address indexed senderAddress);
}
