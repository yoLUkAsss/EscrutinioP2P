pragma solidity ^0.4.11;

contract Election {

  address owner;
  bytes32 electionName;
  bytes32[] participants;
  bytes32[] candidates;

  function Election () {
      owner = msg.sender;
  }

  function setName(bytes32 name){
    electionName = name;
  }

  function getName() constant returns (bytes32){
    return electionName;
  }

  function setElection(bytes32[] parts, bytes32[] cands) {
    participants = parts;
    candidates = cands;
  }

  function getParticipants() constant returns (bytes32[]){
    return participants;
  }
  function getCandidates() constant returns (bytes32[]){
    return candidates;
  }

}
