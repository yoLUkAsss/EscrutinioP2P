pragma solidity ^0.4.11;

contract Mesa {

    struct ParticipantData {
        uint8 counts;
        bool finished;
        mapping (bytes32 => uint8) votes;
    }

    address owner;
    uint8 total;
    bytes32[] candidateList;
    bytes32[] participantList;
    mapping (bytes32 => ParticipantData) participantMap;

    // Constructor... msg.sender es duenio de mesa
    function Mesa(bytes32[] inputParticipants, bytes32[] inputCandidates, uint8 inputTotalVotes){
        owner = msg.sender;
        total = inputTotalVotes;
        participantList = inputParticipants;
        candidateList = inputCandidates;
        candidateList.push("Votos en Blanco");
        candidateList.push("Votos Inpugnados");
        candidateList.push("Votos Nulos");
        //para cada participante
        for(uint i=0; i<participantList.length; i++){
          participantMap[participantList[i]] = ParticipantData(0, false);
          //para cada candidato
          for(uint j=0; j<candidateList.length; j++){
            participantMap[participantList[i]].votes[candidateList[j]] = 0;
          }
        }
    }

    function getCandidates() constant returns (bytes32[]){
        return candidateList;
    }
    function getParticipantList() constant returns (bytes32[]){
        return participantList;
    }

    function getParticipantDataCounts(bytes32 participant) constant returns (uint8){
        return participantMap[participant].counts;
    }

    function getParticipantVotes(bytes32 participant) constant returns (bytes32[], uint8[]){
      uint8[] memory vls = new uint8[](candidateList.length);
      for(uint i=0; i<candidateList.length; i++){
        vls[i] = participantMap[participant].votes[candidateList[i]];
      }
      return (candidateList, vls);
    }

    function isValidParticipant(bytes32 participant) constant returns (bool){
      for(uint i=0; i < participantList.length; i++){
        if(participant == participantList[i]){
          return true;
        }
      }
      return false;
    }

    function loadVotesForParticipant(bytes32 participant, bytes32 candidato, uint8 votos) returns (bool){
      if(isValidParticipant(participant)){
        participantMap[participant].votes[candidato] = votos;
        return true;
      } else {
        return false;
      }
    }

}
