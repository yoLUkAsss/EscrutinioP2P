pragma solidity ^0.4.11;

contract Counts {
    bytes32[] candidates;
    struct CandidateData {
      uint counts;
      bool isValidCandidate;
    }
    bool created;
    mapping (bytes32 => CandidateData) currentCounting;

    function init(bytes32[] newCandidates) public {
      require(!created);
      candidates = newCandidates;
      for(uint i=0;i<candidates.length;i++){
        currentCounting[candidates[i]] = CandidateData(0, true);
      }
      created = true;
    }
    function setCount(bytes32 candidate, uint counts) public {
      require(currentCounting[candidate].isValidCandidate);
      currentCounting[candidate].counts += counts;
    }
    function getCount(bytes32 candidate) public constant returns(uint){
      require(currentCounting[candidate].isValidCandidate);
      return currentCounting[candidate].counts;
    }

    function getCounts() public constant returns(bytes32[], uint[]){
      bytes32[] memory res1 = new bytes32[](candidates.length);
      uint[] memory res2 = new uint[](candidates.length);
      for(uint i=0; i<candidates.length; i++){
        res1[i] = candidates[i];
        res2[i] = currentCounting[candidates[i]].counts;
      }
      return (res1, res2);
    }

}
