pragma solidity ^0.4.11;

contract UserCRUD {
  enum UserCategory {AutoridadElectoral, DelegadoDistrito, DelegadoEscolar, PresidenteMesa, VicepresidenteMesa, ApoderadoPartido, FiscalMesa}

  struct User{
      uint256 id;
      bytes32 mail;
      bytes32 password;
      UserCategory category;
  }

  address owner;
  bytes32[] userIds;
  mapping (uint256 => User) userMapping;

  function UserCRUD () {
      owner = msg.sender;
  }

  function createUser(bytes32 mail, bytes32 password, UserCategory category){
    /*validarCreacion(mail, password, categoria);*/
    userMapping[userIds.length] = User(userIds.length, mail, password, category);
    userIds.push(mail);
  }

  function existsUser(uint8 id) constant returns(bool){
    return userIds.length > id;
  }

  /*Devuelve la lista con los id de todos los usuarios*/
  function getUsers() constant returns(bytes32[]){
    return userIds;
  }

  function getUser(uint8 id) constant returns(uint256, bytes32, bytes32, UserCategory){
    /*validarExiste(id)*/
    return (id, userMapping[id].mail, userMapping[id].password, userMapping[id].category);
  }

}
