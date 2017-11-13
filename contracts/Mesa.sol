pragma solidity ^0.4.11;

import "./Counts.sol";

contract Mesa {

    enum ParticipantCategory {Fiscal, PresidenteMesa, VicepresidenteMesa}


    ////////////////////////////////////////
    // Total por candidato
    mapping (bytes32 => uint) total;
    ////////////////////////////////////////
    bytes32[] candidateList;
    bytes32[] participantList;
    mapping (bytes32 => ParticipantData) participantMap;
    bytes32 public presidenteDeMesaAsignado;
    bool private existPresidenteMesa;
    bytes32 public vicepresidenteDeMesaAsignado;
    bool private existVicepresidenteMesa;
    mapping (bytes32 => CandidateData) candidateMap;
    /**
    Datos cargados y validados al sistema
     */
    bool public checked;
    address countsAddress;
    uint cantidadDePersonas;
    /**
    Conteo de un partipante (fiscal/presidente/vice) para todos los candidatos
     */
    struct ParticipantData {
      bool isValidParticipant;
      ParticipantCategory category;
      mapping (bytes32 => uint) votes;
    }
    mapping(bytes32 => bool) participanteValidoConteo;

    struct CandidateData {
      bool isValidCandidate;
      uint votes;
    }


    function Mesa(bytes32[] inputCandidates, address newCountsAddress) public{
      countsAddress = newCountsAddress;
      candidateList = inputCandidates;
      for(uint i=0;i<inputCandidates.length;i++){
        candidateMap[inputCandidates[i]] = CandidateData(true, 0);
      }
      cantidadDePersonas = 0;
    }



/////////////////////////////////////////////////////////////////////////////////////////////////
    function addParticipantVerify(bytes32 p, ParticipantData pd) internal returns (bool, bytes32) {
      if(participantMap[p].isValidParticipant) {
        return (true, "Participante ya asignado");
      } else {
        return (false, "");
      }
    }
    function addParticipant(bytes32 p, ParticipantData pd) internal {
      if(participantMap[p].isValidParticipant) revert();
      participantMap[p] = pd;
      participantList.push(p);
      participanteValidoConteo[p] = false;
    }
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
    function completeMesaVerify(uint personas) public returns (bool, bytes32) {
      if (cantidadDePersonas != 0){
        return (true, "Total de personas ya cargadas");
      } else {
        return (false, "");
      }
    }
    function completeMesa(uint personas) public {
      require(cantidadDePersonas == 0);
      cantidadDePersonas = personas;
    }
/////////////////////////////////////////////////////////////////////////////////////////////////



    function getCandidatesList() public constant returns (bytes32[]){
        return candidateList;
    }

    function getParticipantList() public constant returns (bytes32[]){
        return participantList;
    }

    function getCounting ( bytes32 participant ) public constant returns (bytes32, bytes32[], uint[]) {
      require(isValidParticipant(participant));
      bytes32[] memory resultCandidatos = new bytes32[](candidateList.length);
      uint[] memory resultConteos = new uint[](candidateList.length);
      for (uint i=0 ; i<candidateList.length ; i++) {
        resultCandidatos[i] = candidateList[i];
        resultConteos[i] = participantMap[participant].votes[candidateList[i]];
      }
      return (participant, resultCandidatos, resultConteos);
    }


/////////////////////////////////////////////////////////////////////////////////////////////////
    function loadVotesForParticipantVerify(bytes32 participant, bytes32 candidate, uint votos) public returns (bool, bytes32) {
      if (! isValidCandidate(candidate)) {
        return (true, "Candidato no valido");
      }
      if (! isValidParticipant(participant)) {
        return (true, "Participante no valido");
      }
      if (cantidadDePersonas == 0) {
        return (true, "Falta asignar total de personas");
      } else {
        return (false, "");
      }
    }
    function loadVotesForParticipant(bytes32 participant, bytes32 candidate, uint votos) private {
      require(isValidCandidate(candidate) && isValidParticipant(participant) && cantidadDePersonas > 0);
      participantMap[participant].votes[candidate] = votos;
    }
/////////////////////////////////////////////////////////////////////////////////////////////////



    function isValidCandidate(bytes32 candidate) public constant returns (bool){
        return candidateMap[candidate].isValidCandidate;
    }

    function isValidParticipant(bytes32 participant) public constant returns (bool){
      return participantMap[participant].isValidParticipant;
    }

    function isFiscal(bytes32 participant) public constant returns (bool) {
      return isCategory(participant, ParticipantCategory.Fiscal);
    }

    function isCategory(bytes32 participant, ParticipantCategory category) internal constant returns (bool) {
      return isValidParticipant(participant) && participantMap[participant].category == category;
    }

    function isPresidenteDeMesa(bytes32 participant) public constant returns(bool){
      return presidenteDeMesaAsignado == participant;
    }


/////////////////////////////////////////////////////////////////////////////////////////////////
    function setFiscalVerify(bytes32 fiscal) public returns (bool, bytes32) {
      return addParticipantVerify(fiscal, ParticipantData(true, ParticipantCategory.Fiscal));
    }
    function setFiscal(bytes32 fiscal) public {
      addParticipant(fiscal, ParticipantData(true, ParticipantCategory.Fiscal));
    }
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
    function setPresidenteDeMesaVerify(bytes32 presidente) public returns (bool, bytes32) {
      if (existPresidenteMesa) {
        return (true, "Ya existe presidente asignado");
      } else {
        return addParticipantVerify(presidente, ParticipantData(true, ParticipantCategory.PresidenteMesa));
      }
    }
    function setPresidenteDeMesa(bytes32 presidente) public{
      require(! existPresidenteMesa);
      addParticipant(presidente, ParticipantData(true, ParticipantCategory.PresidenteMesa));
      presidenteDeMesaAsignado = presidente;
      existPresidenteMesa = true;
    }
/////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////////////
    function setVicepresidenteDeMesa(bytes32 vicepresidente) public{
      require(! existVicepresidenteMesa);
      vicepresidenteDeMesaAsignado = vicepresidente;
      existVicepresidenteMesa = true;
      addParticipant(vicepresidente, ParticipantData(true, ParticipantCategory.VicepresidenteMesa));
    }
/////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////////////
    function checkVerify(bytes32 presi) public returns (bool, bytes32) {
      if (presidenteDeMesaAsignado != presi) {
        return (true, "Debe ser presidente de mesa");
      } else if(checked){
        return (true, "La mesa ya fue verificada");
      } else{
        return (false, "");
      }
    }
    function check(bytes32 presi) public {
      require(presidenteDeMesaAsignado == presi && !checked);
      checked = true;
      Counts countsCopy = Counts(countsAddress);
      for (uint8 index = 0 ; index < candidateList.length ; index++) {
        total[candidateList[index]] = participantMap[presidenteDeMesaAsignado].votes[candidateList[index]];
        countsCopy.setCount(candidateList[index], total[candidateList[index]]);
      }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////////////
    function checkFiscalVerify(bytes32 participant) public returns (bool, bytes32) {
      if (! isValidParticipant(participant)) {
        return (true, "Debe ser fiscal en la mesa");
      }
      if (participanteValidoConteo[participant] == true) {
        return (true, "Planilla ya validada");
      } else {
        return (false, "");
      }
    }
    function checkFiscal(bytes32 participant) public {
      require(isValidParticipant(participant) && participanteValidoConteo[participant] == false);
      participanteValidoConteo[participant] = true;
    }
/////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////////////
    function getTotal(bytes32 candidate) public constant returns (bytes32, uint) {
        require(isValidCandidate(candidate));
        return (candidate, total[candidate]);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////





/////////////////////////////////////////////////////////////////////////////////////////////////
    function loadMesaVerify(bytes32 participante, bytes32[] candidatos, uint[] conteos) public returns (bool, bytes32) {
      if (candidatos.length != conteos.length) {
        return (true, "Planilla incorrecta");
      }
      if (! isValidParticipant(participante)) {
        return (true, "Participante no valido");
      }
      /*if (! conteoValido(conteos)) {
        return (true, "Valores en el conteo invalidos");
      }*/
      for (uint i=0 ; i<candidatos.length ; i++) {
        bool huboError;
        bytes32 mensaje;
        (huboError, mensaje) = loadVotesForParticipantVerify(participante, candidatos[i], conteos[i]);
        if (huboError) {
          return (huboError, mensaje);
        }
      }
      return (false, "");
    }
    function loadMesa(bytes32 participante, bytes32[] candidatos, uint[] conteos) public {
      require(candidatos.length == conteos.length && isValidParticipant(participante) && conteoValido(conteos));
      for (uint i=0 ; i<candidatos.length ; i++) {
        loadVotesForParticipant(participante, candidatos[i], conteos[i]);
      }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////


    function conteoValido(uint[] conteos) private constant returns (bool) {
      uint resultados = 0;
      for (uint i=0 ; i<conteos.length ; i++) {
        resultados = resultados + conteos[i];
      }
      if (resultados == cantidadDePersonas) {
        return true;
      } else {
        return false;
      }
    }

}
