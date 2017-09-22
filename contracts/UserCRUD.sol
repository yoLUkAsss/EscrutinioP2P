pragma solidity ^0.4.11;

contract UserCRUD {
  enum UserCategory {AutoridadElectoral, DelegadoDistrito, DelegadoEscolar, PresidenteMesa, VicepresidenteMesa, ApoderadoPartido, FiscalMesa}

  struct User{
      uint id;
      bytes32 email;
      bytes32 password;
      UserCategory category;
      uint index;
      bool isUser;
  }

  address owner;
  uint[] userIds;
  uint lastId;
  mapping (uint => User) userMapping;

  function UserCRUD () {
      owner = msg.sender;
  }

  //falta usar sha3 o keccak256 dentro de solidity o por web3
  function createUser(bytes32 email, bytes32 password, UserCategory category){
    /*validarCreacion(mail, password, categoria);*/
    /*if(existsUser(id)) revert();*/
    userMapping[userIds.length] = User(lastId, email, password, category, userIds.length, true);
    userIds.push(userIds.length);
    LogCreateUser(msg.sender, lastId, email, password, category);
    lastId += 1;
  }

  function existsUser(uint id) constant returns(bool){
    return userIds.length > 0 && userMapping[id].isUser;
  }

  /*Devuelve la lista con los id de todos los usuarios*/
  function getUsers() constant returns(uint[]){
    return userIds;
  }

  function getUser(uint id) constant returns(uint, bytes32, bytes32, UserCategory){
    /*if(existsUser(id)) revert();*/
    return (id, userMapping[id].email, userMapping[id].password, userMapping[id].category);
  }

  //falta usar sha3 o keccak256 dentro de solidity o por web3
  function updateUser(uint id, bytes32 email, bytes32 password, UserCategory category){
    /*if(existsUser(id)) revert();*/
    userMapping[id].email = email;
    userMapping[id].password = password;
    userMapping[id].category = category;
    LogUpdateUser(msg.sender, id, email, password, category);
  }

  function deleteUser(uint id){
    /*if(existsUser(id)) revert();*/
    uint toDelete = userMapping[id].index;
    uint idToMove = userIds[userIds.length - 1];
    userIds[toDelete] = idToMove;
    userMapping[idToMove].index = toDelete;
    userIds.length--;

    LogDeleteUser(msg.sender, id);
  }

  /*Geerate a event function for each function that modify the blockchain
  * ex: createUser
  */

  event LogCreateUser(address indexed userAddress, uint userId, bytes32 userEmail, bytes32 userPassword, UserCategory userCategory);
  event LogUpdateUser(address indexed userAddress, uint userId, bytes32 userEmail, bytes32 userPassword, UserCategory userCategory);
  event LogDeleteUser(address indexed userAddress, uint userId);

}
