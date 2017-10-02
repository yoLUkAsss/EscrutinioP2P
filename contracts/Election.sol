pragma solidity ^0.4.11;

import "./Mesa.sol";
import "./UserElectionCRUD.sol";
import "./MesaElectionCRUD.sol";

contract Election {
    address owner;
    address userCrudAddress;
    address mesaCrudAddress;
    UserElectionCRUD userCrud;
    MesaElectionCRUD mesaCrud;
    bool created;

    function Election () {
      owner = msg.sender;
      created = false;
      // Se crea una instancia de CRUD de usuarios.
      userCrudAddress = new UserElectionCRUD();
      // Se crea una instancia de CRUD de mesas.
      mesaCrudAddress = new MesaElectionCRUD();
    }

    function createElection(
        bytes32 mailDelCreador,
        uint8 nMesas,
        bytes32[] listaDePartidosPoliticos,
        uint8 nPersonasPorMesa
        /*bytes32[] apoderados,*/
        /*bytes32 delegado*/
    ) public {

        /**
                A continuación se dictan validaciones previas a la creación de la elección,
            algunas referentes a la tecnología y otras referentes al dominio de la aplicación.

         */
        // La eleccion no puede haber sido instanciada.
        if ( isCreated() ) { revert(); }
        // Debe existir misma cantidad de apoderados que de partidos politicos.
        /*if (!apoderadosCompletos(apoderados, listaDePartidosPoliticos)) revert();*/
        /**
                Se muestra a continuación la creación de la elección en la red.

         */
        userCrud = UserElectionCRUD(userCrudAddress);
        mesaCrud = MesaElectionCRUD(mesaCrudAddress);

        // Se crea una usuario con categoria Autoridad de Comicio con el correo enviado.
        /*userCrud.createUser(mailDelCreador, "", UserCRUD.AutoridadElectoral);*/
        /*userCrud.createUser(mailDelCreador, "", 0);*/
        createAutoridadElectoral(mailDelCreador);
        // Se genera un usuario para el delegado general
        /*userCrud.createUser(delegado, "", UserCRUD.DelegadoDistrito);*/
        /*userCrud.createUser(delegado, "", 1);*/
        /*userCrud.createDelegadoDeDistrito(delegado, "");*/
        // Se generan usuarios para cada apoderado de partido
        /*for (index = 0; index < apoderados.length; index++) {
          //userCrud.createUser(apoderados[index], "", UserCRUD.ApoderadoDePartido);
          userCrud.createApoderadoDePartido(apoderados[index], "");
        }*/
        // Se generan nMesas
        createNMesas(nMesas, listaDePartidosPoliticos, personaPorMesa);
        created = true;
        CreateElection(msg.sender, mailDelCreador, nMesas, listaDePartidosPoliticos);
    }
    function createAutoridadElectoral(bytes32 email) internal {
      userCrud.createAutoridadElectoral(email, "");
    }
    function createNMesas(uint8 nMesas, bytes32[] lista, uint8 personaPorMesa) internal {
      for(uint index=0; index<nMesas; index++){
        createMesa(lista, personaPorMesa);
      }
    }
    function createMesa(bytes32[] lista, uint8 porMesa) internal {
      mesaCrud.createMesa(lista, porMesa);
    }

    function definirFiscal(bytes32 requester, bytes32 fiscal, uint8 idMesa) public {
      if (!isAutoridadElectoral(requester)) revert();
      mesaCrud.setFiscal(idMesa, fiscal);
    }

    function definirPresidenteDeMesa(bytes32 requester, bytes32 presidente, uint8 idMesa) public {
      if (!isAutoridadElectoral(requester)) revert();
      mesaCrud.setPresidenteDeMesa(idMesa, presidente);
    }

    function definirVicepresidenteDeMesa(bytes32 requester, bytes32 vicepresidente, uint8 idMesa) public {
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
      return userCrud.isApoderadoPartido(correo);
    }

    function isDelegadoGeneral(bytes32 correo) public constant returns (bool) {
      return userCrud.isDelegadoGeneral(correo);
    }

    function isAutoridadElectoral(bytes32 email) public constant returns(bool){
      return userCrud.isAutoridadElectoral(email);
    }

    event CreateElection(address indexed senderAddress, bytes32 creator, uint8 nMesas);

}
