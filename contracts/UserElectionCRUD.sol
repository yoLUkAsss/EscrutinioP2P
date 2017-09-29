pragma solidity ^0.4.11;

import "./UserCRUD.sol";

contract UserElectionCRUD is UserCRUD{
  /*functions defined to be used for election contract*/

    // functions defined to be used in election user
    mapping (bytes32 => uint) userMailMapping;

    function createUserByEmail(bytes32 email, bytes32 password, UserCategory category) public{
        if(existsUserByEmail(email)) revert();
        createUser(email, password, category);
        userMailMapping[email] = lastId;
    }

    function existsUserByEmail(bytes32 email) public constant returns(bool){
        return existsUser(userMailMapping[email]);
    }

    function deleteUserByEmail(bytes32 email) public{
        if(!existsUserByEmail(email)) revert();
        deleteUser(userMailMapping[email]);
        delete userMailMapping[email];
    }

  function createApoderadoDePartido(bytes32 email, bytes32 password) public{
    createUserByEmail(email, password, UserCategory.ApoderadoPartido);
  }
  function createDelegadoDeDistrito(bytes32 email, bytes32 password) public{
    createUserByEmail(email, password, UserCategory.DelegadoDistrito);
  }
  function createAutoridadElectoral(bytes32 email, bytes32 password) public{
    createUserByEmail(email, password, UserCategory.AutoridadElectoral);
  }

  function isUser(bytes32 email, UserCategory category) internal constant returns(bool){
      return existsUserByEmail(email) && userMapping[userMailMapping[email]].category == category;
  }

  function isApoderadoPartido(bytes32 email) public constant returns(bool){
    return isUser(email, UserCategory.ApoderadoPartido);
  }

  function isDelegadoGeneral(bytes32 email) public constant returns(bool){
    return isUser(email, UserCategory.DelegadoDistrito);
  }

  function isAutoridadElectoral(bytes32 email) public constant returns(bool){
    return isUser(email, UserCategory.AutoridadElectoral);
  }

}
