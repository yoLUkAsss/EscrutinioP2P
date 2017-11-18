import { fromObject, countsCRUD, counts, web3 } from '../utils/web3-utils.js'

export class CountsController {
  //req.query.candidato : string
  getTotal(req, res){
    countsCRUD.deployed()
    .then( async countsCRUDInstance => {
      let countsAddress = await countsCRUDInstance.getCountsByName.call(req.query.candidato, fromObject)
      let countsInstance = await counts.at(countsAddress)
      let result = await countsInstance.getTotal.call(fromObject)
      if (result[1].length == 0) {
        res.status(400).json("No existen datos iniciales")
      } else {
        res.status(200).json({
          "candidates" : result[0].map(x => {return web3.toAscii(x)}),
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
    countsCRUD.deployed()
    .then( async countsCRUDInstance => {
      let countsAddress = await countsCRUDInstance.getCountsByName.call(req.query.candidato, fromObject)
      let countsInstance = await counts.at(countsAddress)
      let result = await countsInstance.getBySchool.call(parseInt(req.params.distritoId), parseInt(req.params.escuelaId), fromObject)
      if (result[1].length == 0) {
        res.status(400).json("No existen datos iniciales")
      } else {
        res.status(200).json({
          "candidates" : result[0].map(x => {return web3.toAscii(x)}),
          "counts" : result[1].map(x => {return x.toNumber()})
        })
      }
    })
    .catch(err => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }
  //params :- distritoId : int, candidato : string
  //query :- candidato : string
  //return :- candidates : [{name : string, counts : int}]
  getDistritoTotal(req, res) {
    countsCRUD.deployed()
    .then( async countsCRUDInstance => {
      let countsAddress = await countsCRUDInstance.getCountsByName.call(req.query.candidato, fromObject)
      let countsInstance = await counts.at(countsAddress)
      let result = await countsInstance.getByDistrict.call(req.params.distritoId, fromObject)
      if (result[1].length == 0) {
        res.status(400).json("No existen datos iniciales")
      } else {
        res.status(200).json({
          "candidates" : result[0].map(x => {return web3.toAscii(x)}),
          "counts" : result[1].map(x => {return x.toNumber()})
        })
      }
    })
    .catch(err => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }
  //params :- distritoId : int, escuelaId : int, mesaId : int
  //query : candidato : string
  //return :- candidates : [{name : string, counts : int}]
  getMesaTotal(req, res){
    countsCRUD.deployed()
    .then( async countsCRUDInstance => {
      let countsAddress = await countsCRUDInstance.getCountsByName.call(req.query.candidato, fromObject)
      let countsInstance = await counts.at(countsAddress)
      let result = await countsInstance.getByMesa.call(parseInt(req.params.distritoId), parseInt(req.params.escuelaId), parseInt(req.params.mesaId), fromObject)
      if (result[1].length == 0) {
        res.status(400).json("No existen datos cargados sobre esta mesa")
      } else {
        let parsedResult = [];
        for (var index = 0; index < result[0].length; index++) {
          parsedResult.push({ 'name':web3.toAscii(result[0][index]), 'counts':result[1][index].toNumber() })
        }
        res.status(200).json(parsedResult)
      }
    }).catch(error => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }
}
