pragma solidity ^0.4.11;

import "./Mesa.sol";
import "./UserElectionCRUD.sol";
import "./MesaElectionCRUD.sol";

contract Election {
    address owner;
    address userCrudAddress;
    address mesaCrudAddress;
    /*UserElectionCRUD userCrud;*/
    /*MesaElectionCRUD mesaCrud;*/
    bool created;

    function Election () {
      owner = msg.sender;
      // Se crea una instancia de CRUD de usuarios.
      /*userCrudAddress = new UserElectionCRUD();
      Logguear(userCrudAddress);
      // Se crea una instancia de CRUD de mesas.
      mesaCrudAddress = new MesaElectionCRUD();
      Logguear(mesaCrudAddress);*/
      userCrudAddress = new UserElectionCRUD();
      mesaCrudAddress = new MesaElectionCRUD();
    }

    function createElection(
        bytes32 mailDelCreador,
        uint nMesas,
        bytes32[] listaDePartidosPoliticos,
        uint nPersonasPorMesa
    ) public {
        /*if (isCreated()) revert();*/
        createAutoridadElectoral(mailDelCreador);
        createNMesas(nMesas, listaDePartidosPoliticos, nPersonasPorMesa);
        created = true;
        CreateElection(msg.sender, mailDelCreador, nMesas);
    }
    function createAutoridadElectoral(bytes32 email) internal {
      UserElectionCRUD userCrud = UserElectionCRUD(userCrudAddress);
      userCrud.createAutoridadElectoral(email, "");
    }
    function createNMesas(uint nMesas, bytes32[] lista, uint personaPorMesa) internal {
      MesaElectionCRUD mesaCrud = MesaElectionCRUD(mesaCrudAddress);
      for(uint index=0; index<nMesas; index++){
          /*mesaCrud.createMesa(lista, personaPorMesa);*/
      }
    }

    function definirFiscal(bytes32 requester, bytes32 fiscal, uint8 idMesa) public {
      MesaElectionCRUD mesaCrud = MesaElectionCRUD(mesaCrudAddress);
      if (!isAutoridadElectoral(requester)) revert();
      mesaCrud.setFiscal(idMesa, fiscal);
    }

    function definirPresidenteDeMesa(bytes32 requester, bytes32 presidente, uint8 idMesa) public {
      MesaElectionCRUD mesaCrud = MesaElectionCRUD(mesaCrudAddress);
      if (!isAutoridadElectoral(requester)) revert();
      mesaCrud.setPresidenteDeMesa(idMesa, presidente);
    }

    function definirVicepresidenteDeMesa(bytes32 requester, bytes32 vicepresidente, uint8 idMesa) public {
      MesaElectionCRUD mesaCrud = MesaElectionCRUD(mesaCrudAddress);
      if (!isAutoridadElectoral(requester)) revert();
      mesaCrud.setVicepresidenteDeMesa(idMesa, vicepresidente);
    }
    /**
            Funciones utilizadas para validar ciertos comportamientos.

     */
    function isCreated() public constant returns (bool) {
        return created;
    }

    function apoderadosCompletos( bytes32[] listaApoderados, bytes32[] listaPartidos ) public constant returns (bool) {
        return listaApoderados.length == listaPartidos.length;
    }

    function isApoderadoDePartido(bytes32 correo) public constant returns (bool) {
      UserElectionCRUD userCrud = UserElectionCRUD(userCrudAddress);
      return userCrud.isApoderadoPartido(correo);
    }

    function isDelegadoGeneral(bytes32 correo) public constant returns (bool) {
      UserElectionCRUD userCrud = UserElectionCRUD(userCrudAddress);
      return userCrud.isDelegadoGeneral(correo);
    }

    function isAutoridadElectoral(bytes32 email) public constant returns(bool){
      UserElectionCRUD userCrud = UserElectionCRUD(userCrudAddress);
      return userCrud.isAutoridadElectoral(email);
    }

    event CreateElection(address indexed senderAddress, bytes32 creator, uint nMesas);

    event Logguear(address created);

}
