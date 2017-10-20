pragma solidity ^0.4.11;

import "./UserCRUD.sol";
import "./User.sol";

contract UserElectionCRUD is UserCRUD{

  /*functions defined to be used for election contract*/
    mapping (bytes32 => uint) public emailMap;



    function signup(bytes32 email, bytes32 pass) public {
        createUserByEmail(email, pass, 7);
    }


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

    function getUserByEmail(bytes32 email) public constant returns(address){
      if(!existsUserByEmail(email)) revert();
      return getUser(emailMap[email]);
    }

    /*
    FUNCIONALIDAD: setear roles,
    quizas para mantener la transaccionabilidad y seguridad sobre los unicos usuarios q puedan realizar
    esta operacion, sea mejor dejar el conjunto de funciones q esta conlleva en election
    */
    //setear roles
    function setUserCategory(bytes32 email, uint cat) internal {
      User(getUserByEmail(email)).setCategory(cat);
    }
    function setPresidenteDeMesa(bytes32 email) public {
      User(getUserByEmail(email)).setCategory(4);
    }
    function setFiscal(bytes32 email) public {
      User(getUserByEmail(email)).setCategory(6);
    }
    function setAutoridadElectoral(bytes32 email) public {
      User(getUserByEmail(email)).setCategory(0);
    }
    function setApoderado(bytes32 email) public {
      User(getUserByEmail(email)).setCategory(3);
    }
}
