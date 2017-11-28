import { fromObject, counts } from '../utils/web3-utils.js'
import {fromSolidity2String, bytes32ListToStringList} from '../utils/utils.js'

export class CountsController {
  //req.query.candidato : string
  //req.query: distrito, escuela, mesa
  getTotal(req, res){
    counts.deployed()
    .then( async countsInstance => {
      let result = await countsInstance.getTotal.call(fromObject)
      if (result[1].length === 0) {
        res.status(400).json("No existen datos iniciales")
      } else {
        res.status(200).json({
          "candidates" : result[0].map(x => {return fromSolidity2String(x)}),
          "counts" : result[1].map(x => {return x.toNumber()})
        })
      }
    })
    .catch(err => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }
  // //params :- distritoId : int, candidato : string
  // //query :- candidato : string
  // //return :- candidates : [{name : string, counts : int}]
  getDistritoTotal(req, res) {
    counts.deployed()
    .then( async countsInstance => {
      let result = await countsInstance.getByDistrict.call(req.params.distritoId, fromObject)
      if (result[1].length == 0) {
        res.status(400).json("No existen datos iniciales")
      } else {
        res.status(200).json({
          "candidates" : result[0].map(x => {return fromSolidity2String(x)}),
          "counts" : result[1].map(x => {return x.toNumber()})
        })
      }
    })
    .catch(err => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }
  //params :- distritoId : int, escuelaId : int
  //query :- candidato : string
  //return :- candidates : [{name : string, counts : int}]
  getEscuelaTotal(req, res){
    counts.deployed()
    .then( async countsInstance => {
      let result = await countsInstance.getBySchool.call(parseInt(req.params.distritoId), parseInt(req.params.escuelaId), fromObject)
      if (result[1].length == 0) {
        res.status(400).json("No existen datos iniciales")
      } else {
        res.status(200).json({
          "candidates" : result[0].map(x => {return fromSolidity2String(x)}),
          "counts" : result[1].map(x => {return x.toNumber()})
        })
      }
    })
    .catch(err => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }
  // //params :- distritoId : int, escuelaId : int, mesaId : int
  // //query : candidato : string
  // //return :- candidates : [{name : string, counts : int}]
  getMesaTotal(req, res){
    counts.deployed()
    .then( async countsInstance => {
      let result = await countsInstance.getByMesa.call(parseInt(req.params.distritoId), parseInt(req.params.escuelaId), parseInt(req.params.mesaId), fromObject)
      if (result[1].length === 0) {
        res.status(400).json("No existen datos iniciales")
      } else {
        res.status(200).json({
          "candidates" : result[0].map(x => {return fromSolidity2String(x)}),
          "counts" : result[1].map(x => {return x.toNumber()})
        })
      }
    }).catch(error => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }
}
