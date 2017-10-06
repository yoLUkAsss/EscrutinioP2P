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
        /*if(!created || ae != autoridadElectoral) revert();*/
        return userCRUDaddress;
    }
    function getMesaCRUDaddress(bytes32 ae) external constant returns(address){
        /*if(!created || ae != autoridadElectoral) revert();*/
        return mesaCRUDaddress;
    }

    function createElection(bytes32 email) external {
        if (created) revert();
        UserElectionCRUD(userCRUDaddress).createAutoridadElectoral(email, "");
        autoridadElectoral = email;
        created = true;
        CreateElection(msg.sender, email);
    }

    event CreateElection(address indexed senderAddress, bytes32 autoridadElectoral);
}
