pragma solidity ^0.4.11;

contract Mesa {

    enum ParticipantCategory {Fiscal, PresidenteMesa, VicepresidenteMesa}

    struct ParticipantData {
      bool isValidParticipant;
      ParticipantCategory category;
      mapping (bytes32 => uint8) votes;
    }

    address owner;
    bytes32[] candidateList;
    bytes32[] participantList;
    mapping (bytes32 => ParticipantData) participantMap;
    bytes32 presidenteMesa;
    bytes32 vicepresidenteMesa;
    uint total;

    function Mesa(bytes32[] inputCandidates, uint totalvotes) public{
      owner = msg.sender;
      candidateList = inputCandidates;
      total = totalvotes;
    }

    function addParticipant(bytes32 p, ParticipantData pd) internal {
      participantMap[p] = pd;
      participantList.push(p);
      AddParticipant(msg.sender, p);
    }

    function getCandidatesList() public constant returns (bytes32[]){
        return candidateList;
    }
    function getParticipantList() public constant returns (bytes32[]){
        return participantList;
    }

    function getParticipantVotesForACandidate(bytes32 participant, bytes32 candidate) public constant returns (bytes32, uint8) {
      if(!isValidParticipant(participant) || !isValidCandidate(candidate)) revert();
      return (candidate, participantMap[participant].votes[candidate]);
    }

    function loadVotesForParticipant(bytes32 participant, bytes32 candidato, uint8 votos) public {
      if(!isValidParticipant(participant) || !isValidCandidate(candidato)) revert();
      participantMap[participant].votes[candidato] = votos;
    }

    function isValidCandidate(bytes32 candidate) public constant returns (bool){
      for(uint i=0; i < candidateList.length; i++){
        if(candidate == candidateList[i]){
          return true;
        }
      }
      return false;
    }

    function isValidParticipant(bytes32 participant) public constant returns (bool){
      return participantMap[participant].isValidParticipant;
    }

    function isApoderadoDeMesa(bytes32 participant) public constant returns (bool) {
      return isCategory(participant, ParticipantCategory.ApoderadoMesa);
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

    function setPresidenteDeMesa(bytes32 presidente) public{
      presidenteMesa = presidente;
      addParticipant(presidente, ParticipantData(true, ParticipantCategory.PresidenteMesa));
    }
    function setVicePresidenteDeMesa(bytes32 vicepresidente) public{
      vicepresidenteMesa = vicepresidente;
      addParticipant(vicepresidente, ParticipantData(true, ParticipantCategory.VicepresidenteMesa));
    }

    event AddParticipant(address indexed userAddress, bytes32 participant);

}
