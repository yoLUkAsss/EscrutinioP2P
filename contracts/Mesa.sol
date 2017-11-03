pragma solidity ^0.4.11;

contract Mesa {

    enum ParticipantCategory {Fiscal, PresidenteMesa, VicepresidenteMesa}

    
    ////////////////////////////////////////
    // Total por candidato
    mapping (bytes32 => uint8) total;
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
    
    
    /**
    Conteo de un partipante (fiscal/presidente/vice) para todos los candidatos
     */
    struct ParticipantData {
      bool isValidParticipant;
      ParticipantCategory category;
      mapping (bytes32 => uint8) votes;
    }
    struct CandidateData {
      bool isValidCandidate;
      uint votes;
    }


    function Mesa(bytes32[] inputCandidates) public{
      candidateList = inputCandidates;
      for(uint i=0;i<inputCandidates.length;i++){
        candidateMap[inputCandidates[i]] = CandidateData(true, 0);
      }
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
    }
/////////////////////////////////////////////////////////////////////////////////////////////////



    function getCandidatesList() public constant returns (bytes32[]){
        return candidateList;
    }

    function getParticipantList() public constant returns (bytes32[]){
        return participantList;
    }

    function getParticipantVotesForACandidate(bytes32 participant, bytes32 candidate) external constant returns (bytes32, uint8) {
      if(!isValidParticipant(participant) || !isValidCandidate(candidate)) revert();
      return (candidate, participantMap[participant].votes[candidate]);
    }



/////////////////////////////////////////////////////////////////////////////////////////////////
    function loadVotesForParticipantVerify(bytes32 participant, bytes32 candidate, uint8 votos) external returns (bool, bytes32) {
      if (! isValidCandidate(candidate)) {
        return (true, "Candidato no valido");
      }
      if (! isValidParticipant(participant)) {
        return (true, "Participante no valido");
      } else {
        return (false, "");
      }
    }
    function loadVotesForParticipant(bytes32 participant, bytes32 candidate, uint8 votos) external {
      require(isValidCandidate(candidate) && isValidParticipant(participant));
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
      } else {
        return (false, "");
      }
    }
    function check(bytes32 presi) public {
      require(presidenteDeMesaAsignado == presi);
      checked = true;
      for (uint8 index = 0 ; index < candidateList.length ; index++) {
        total[candidateList[index]] = participantMap[presidenteDeMesaAsignado].votes[candidateList[index]];
      }
    }
/////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////////////////////////////////////////////////
    function getTotal(bytes32 candidate) public constant returns (bytes32, uint8) {
        require(isValidCandidate(candidate));
        return (candidate, total[candidate]);
    }
/////////////////////////////////////////////////////////////////////////////////////////////////

}
