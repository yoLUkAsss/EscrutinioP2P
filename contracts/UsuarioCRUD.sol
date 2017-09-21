pragma solidity ^0.4.11;

contract UsuarioCRUD {
  enum CategoriaUsuario {AutoridadElectoral, DelegadoDistrito, DelegadoEscolar, PresidenteMesa, VicepresidenteMesa, ApoderadoPartido, FiscalMesa}

  struct Usuario{
      uint256 id;
      bytes32 mail;
      bytes32 password;
      CategoriaUsuario categoria;
  }

  address owner;
  bytes32[] usuariosIds;
  mapping (uint256 => Usuario) usuariosMapping;

  function UsuarioCRUD () {
      owner = msg.sender;
  }

  function crearUsuario(bytes32 mail, bytes32 password, CategoriaUsuario categoria){
    /*validarCreacion(mail, password, categoria);*/
    usuariosMapping[usuariosIds.length] = Usuario(usuariosIds.length, mail, sha3(mail, password), categoria);
    usuariosIds.push(mail);
  }

  function existeUsuario(uint8 id) constant returns(bool){
    return usuariosIds.length > id;
  }

  /*Devuelve la lista con los id de todos los usuarios*/
  function getUsuarios() constant returns(bytes32[]){
    return usuariosIds;
  }

}
