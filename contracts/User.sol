pragma solidity ^0.4.11;

contract User{
    // enum UserCategory {AutoridadElectoral, DelegadoDistrito, DelegadoEscolar, PresidenteMesa, VicepresidenteMesa, ApoderadoPartido, Fiscal}
  //AutoridadElectoral 0
  //DelegadoDistrito 1
  //DelegadoEscolar 2
  //ApoderadoPartido 3
  //PresidenteMesa 4
  //VicepresidenteMesa 5
  //Fiscal 6

    bytes32 public email;
    bytes32 public password;
    bool public isLogged;
    uint category;

    function User(bytes32 e, bytes32 pass, uint cat) public {
        email = e;
        password = pass;
        category = cat;
    }

    function getUser() public constant returns(address, bytes32, uint){
      return (this, email, category);
    }

    function login(bytes32 pass) public{
        if(password != pass) revert();
        isLogged = true;
    }
    function logout() public {
        isLogged = false;
    }
    function isAutoridadElectoral() public constant returns(bool){
        return category == 0;
    }
    function isPresidenteDeMesa() public constant returns(bool){
        return category == 4;
    }
    function isFiscal() public constant returns(bool){
        return category == 6;
    }
    function destroy(address parent) public {
        selfdestruct(parent);
    }
    function setCategory(uint cat) public {
      category = cat;
    }
}
