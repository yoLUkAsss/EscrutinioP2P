pragma solidity ^0.4.11;

import "./UserCRUD.sol";

contract UserElectionCRUD is UserCRUD{

  /*functions defined to be used for election contract*/
    mapping (bytes32 => uint) public emailMap;

    function createUserByEmail(bytes32 email, bytes32 password, UserCategory category) internal {
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
    function createApoderadoDePartido(bytes32 email, bytes32 password) public {
        createUserByEmail(email, password, UserCategory.ApoderadoPartido);
    }
    function createAutoridadElectoral(bytes32 email, bytes32 password) public {
        createUserByEmail(email, password, UserCategory.AutoridadElectoral);
    }
    function createPresidenteDeMesa(bytes32 email, bytes32 password) public {
        createUserByEmail(email, password, UserCategory.PresidenteMesa);
    }
    function createFiscal(bytes32 email, bytes32 password) public {
        createUserByEmail(email, password, UserCategory.Fiscal);
    }
    function isUser(bytes32 email, UserCategory category) internal constant returns(bool){
        return existsUser(emailMap[email]) && userMapping[emailMap[email]].category == category;
    }
    function isApoderadoPartido(bytes32 email) public constant returns(bool){
        return isUser(email, UserCategory.ApoderadoPartido);
    }
    function isAutoridadElectoral(bytes32 email) public constant returns(bool){
        return isUser(email, UserCategory.AutoridadElectoral);
    }
    function isFiscal(bytes32 email) public constant returns(bool){
        return isUser(email, UserCategory.Fiscal);
    }
    function isPresidenteDeMesa(bytes32 email) public constant returns(bool){
        return isUser(email, UserCategory.PresidenteMesa);
    }

}
