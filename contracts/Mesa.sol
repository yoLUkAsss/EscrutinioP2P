pragma solidity ^0.4.11;

contract Mesa {

    enum ParticipantCategory {Fiscal, PresidenteMesa, VicepresidenteMesa}

    /**

    Conteo de un partipante (fiscal/presidente/vice) para todos los candidatos

     */
    struct ParticipantData {
      bool isValidParticipant;
      ParticipantCategory category;
      mapping (bytes32 => uint8) votes;
    }

    /**

     */
    struct CandidateData {
      bool isValidCandidate;
      uint votes;
    }

    ////////////////////////////////////////
    // Total por candidato
    mapping (bytes32 => uint8) total;
    ////////////////////////////////////////

    address owner;
    bytes32[] candidateList;
    bytes32[] participantList;
    mapping (bytes32 => ParticipantData) participantMap;
    bytes32 public presidenteMesa;
    bool private existPresidenteMesa;
    bytes32 public vicepresidenteMesa;
    bool private existVicepresidenteMesa;

    mapping (bytes32 => CandidateData) candidateMap;

    /**
    Datos cargados y validados al sistema
     */
    bool public checked;

    function Mesa(bytes32[] inputCandidates) public{
      owner = msg.sender;
      candidateList = inputCandidates;
      for(uint i=0;i<inputCandidates.length;i++){
        candidateMap[inputCandidates[i]] = CandidateData(true, 0);
      }
    }

    function addParticipant(bytes32 p, ParticipantData pd) internal {
      if(participantMap[p].isValidParticipant) revert();
      participantMap[p] = pd;
      participantList.push(p);
    }

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

    function loadVotesForParticipant(bytes32 participant, bytes32 candidate, uint8 votos) external {
      require(isValidCandidate(candidate) && isValidParticipant(participant));
      participantMap[participant].votes[candidate] = votos;
    }

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
      return presidenteMesa == participant;
    }

    function destroy(address parent) public {
      selfdestruct(parent);
    }

    function setFiscal(bytes32 fiscal) public {
      addParticipant(fiscal, ParticipantData(true, ParticipantCategory.Fiscal));
    }

    /**
    Requiere que no se haya seteado un presidente de mesa
     */
    function setPresidenteDeMesa(bytes32 presidente) public{
      require(! existPresidenteMesa);
      presidenteMesa = presidente;
      existPresidenteMesa = true;
      addParticipant(presidente, ParticipantData(true, ParticipantCategory.PresidenteMesa));
    }

    /**
    Requiere que no se haya seteado un vicepresidente de mesa
     */
    function setVicePresidenteDeMesa(bytes32 vicepresidente) public{
      require(! existVicepresidenteMesa);
      vicepresidenteMesa = vicepresidente;
      existVicepresidenteMesa = true;
      addParticipant(vicepresidente, ParticipantData(true, ParticipantCategory.VicepresidenteMesa));
    }

    /**
    Primera version de validar una mesa..

    Solo el presidente de mesa puede validar.
     */
    function check(bytes32 presi) public {
      require(presidenteMesa == presi);
      checked = true;
      for (uint8 index = 0 ; index < candidateList.length ; index++) {
        total[candidateList[index]] = participantMap[presidenteMesa].votes[candidateList[index]];
      }
    }
    function getTotal(bytes32 candidate) constant returns (bytes32, uint8) {
        require(isValidCandidate(candidate));
        return (candidate, total[candidate]);
    }

}
