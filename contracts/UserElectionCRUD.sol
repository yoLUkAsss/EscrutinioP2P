pragma solidity ^0.4.11;

import "./UserCRUD.sol";
import "./User.sol";

contract UserElectionCRUD is UserCRUD{

  /*functions defined to be used for election contract*/
    mapping (bytes32 => uint) public emailMap;

    function createUserByEmail(bytes32 email, bytes32 password, uint category) internal {
        if(existsUser(emailMap[email])) revert();
        createUser(email, password, category);
        emailMap[email] = lastId;
    }
    function deleteUserByEmail(bytes32 email) public {
        if(!existsUser(emailMap[email])) revert();
        deleteUser(emailMap[email]);
        delete emailMap[email];
    }
    function existsUserByEmail(bytes32 email) public constant returns(bool){
        return emailMap[email] != 0;
    }
    function createAutoridadElectoral(bytes32 email, bytes32 password) public {
        createUserByEmail(email, password, 0);
    }
    function createPresidenteDeMesa(bytes32 email, bytes32 password) public {
        createUserByEmail(email, password, 4);
    }
    function createFiscal(bytes32 email, bytes32 password) public {
        createUserByEmail(email, password, 6);
    }
    function signup(bytes32 email, bytes32 pass) public {
        createFiscal(email, pass);
    }
    function getUserByEmail(bytes32 email) public constant returns(address){
      if(!existsUserByEmail(email)) revert();
      return getUser(emailMap[email]);
    }
}
