import { web3 } from '../utils/web3-utils.js'

const defaultCandidates = ['Votos en Blanco', 'Votos Nulos', 'Votos Impugnados']

function fromSolidity2String(bytes32){
  return bytes32toString(web3.toAscii(bytes32))
}

function bytes32toString(toParse){
  return toParse.slice(0, toParse.indexOf("\u0000"))
}

function bytes32ListToStringList( listOfStrings ) {
  return listOfStrings.map( element => { return fromSolidity2String(element)})
}

function clearDefaultCandidates(list){
  return list.filter(x => { return !defaultCandidates.includes(x)})
}

export { fromSolidity2String, bytes32toString, clearDefaultCandidates, bytes32ListToStringList, defaultCandidates}
