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
    mapping (bytes32 => ParticipantData) participants;

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
          participants[participantList[i]] = ParticipantData(0, false);
          //para cada candidato
          for(uint j=0; j<candidateList.length; j++){
            participants[participantList[i]].votes[candidateList[j]] = 0;
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
        return participants[participant].counts;
    }
    function getParticipantDataVotesForCandidate(bytes32 participant, bytes32 candidate) constant returns (uint8){
        return participants[participant].votes[candidate];
    }
}
