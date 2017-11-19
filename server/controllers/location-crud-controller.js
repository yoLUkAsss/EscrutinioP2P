import { fromObject, distritoCRUD, distrito, escuela, mesa, web3 } from '../utils/web3-utils.js'

export class LocationController {

  /*    returns locationsId : [int]   */
  getDistritos(req, res){
    distritoCRUD.deployed()
    .then( async distritoCRUDInstance => {
      let result = await distritoCRUDInstance.getDistritos.call(fromObject)
      res.status(201).json(result.map(x => {return x.toNumber()}))
    })
    .catch( error => {
      res.status(500).json("Ha ocurrido un error, contacte un administrador")
    })
  }


  getEscuelas(req, res){
    distritoCRUD.deployed()
    .then( async distritoCRUDInstance => {
      let distritoAddress = await distritoCRUDInstance.getDistrito.call(req.params.distritoId, fromObject)
      let distritoInstance = await distrito.at(distritoAddress)
      let result = await distritoInstance.getEscuelas.call(fromObject)
      res.status(201).json(result.map(x => {return x.toNumber()}))
    })
    .catch( error => {
      res.status(500).json("Ha ocurrido un error, contacte un administrador")
    })
  }

  getMesas(req, res){
    distritoCRUD.deployed()
    .then( async distritoCRUDInstance => {
      let escuelaAddress = await distritoCRUDInstance.getEscuela.call(req.params.distritoId, req.params.escuelaId, fromObject)
      let escuelaInstance = await escuela.at(escuelaAddress)
      let result = await escuelaInstance.getMesas.call(fromObject)
      res.status(201).json(result.map(x => {return x.toNumber()}))
    })
    .catch( error => {
      res.status(500).json("Ha ocurrido un error, contacte un administrador")
    })
  }


  /*    params: locationId : int  */
  /*    returns locationAddress : string   */
  getDistrito(req, res){
    distritoCRUD.deployed()
    .then( async distritoCRUDInstance => {
      let existDistrito = await distritoCRUDInstance.existDistrito.call(parseInt(req.params.distritoId), fromObject)
      if (existDistrito) {
        let result = await distritoCRUDInstance.getDistrito.call(parseInt(req.params.distritoId), fromObject)
        res.status(201).json(result)
      } else {
        res.status(400).json("ID: " + req.params.distritoId + " no corresponde un distrito existente")
      }
    })
    .catch( error => {
      res.status(500).json("Ha ocurrido un error, contacte un administrador")
    })
  }

  async getMesaParticipants(req, res){
    distritoCRUD.deployed()
    .then(async distritoCRUDInstance => {
      let mesaAddress = await distritoCRUDInstance.getMesa.call(parseInt(req.params.distritoId), parseInt(req.params.escuelaId), parseInt(req.params.mesaId), fromObject)
      let mesaInstance = await mesa.at(mesaAddress)
      let participantList = await mesaInstance.getParticipantList.call(fromObject)
      let promises = participantList.map(p => {
        return mesaInstance.getCounting.call(p, fromObject)
      })
      Promise.all(promises).then(results => {
        let response = []
        results.forEach(r => {
          let participant = {}
          let candidates = []
          for(let index = 0; index < r[1].length; index++){
            candidates.push({"name" : web3.toAscii(r[1][index]), "counts" : r[2][index].toNumber()})
          }
          participant.name = web3.toAscii(r[0])
          participant.candidates = candidates
          participant.checked = r[3]
          response.push(participant)
        })
        res.status(200).json(response)
      }).catch(error => {
        res.status(500).json("Ha ocurrido un error, contacte un administrador")
      })
    })
    .catch(error => {
      res.status(500).json("Ha ocurrido un error, contacte un administrador")
    })
  }

  //req.query : email,
  //req.params : distritoId, escuelaId, mesaId
  //returns: [{name : string, counts : int}]
  async getMesaUser(req, res){
    distritoCRUD.deployed()
    .then(async distritoCRUDInstance => {
      let mesaAddress = await distritoCRUDInstance.getMesa.call(parseInt(req.params.distritoId), parseInt(req.params.escuelaId), parseInt(req.params.mesaId), fromObject)
      let mesaInstance = await mesa.at(mesaAddress)
      let result = await mesaInstance.getCounting(req.query.email, fromObject)
      let parsedResult = []
      for (var index = 0; index < result[1].length; index++) {
        parsedResult.push({"name" : web3.toAscii(result[1][index]), "counts" : result[2][index].toNumber()})
      }
      res.status(201).json(parsedResult)
    })
    .catch(error => {
      res.status(500).json("Ha ocurrido un error, contacte un administrador")
    })
  }


  //params :- distritoId : int, escuelaId : int, mesaId : int
  //body: email : string
  //returns message : string
  async checkMesa(req, res){
    distritoCRUD.deployed()
    .then(async distritoCRUDInstance => {
      let mesaAddress = await distritoCRUDInstance.getMesa.call(parseInt(req.params.distritoId), parseInt(req.params.escuelaId), parseInt(req.params.mesaId), fromObject)
      let mesaInstance = await mesa.at(mesaAddress)
      let result = await mesaInstance.checkVerify.call(req.body.email, parseInt(req.params.distritoId), parseInt(req.params.escuelaId), parseInt(req.params.mesaId), fromObject)
      if (result[0]) {
        res.status(400).json( web3.toAscii(result[1]) )
      } else {
        await mesaInstance.check.sendTransaction(req.body.email, parseInt(req.params.distritoId), parseInt(req.params.escuelaId), parseInt(req.params.mesaId), fromObject)
        res.status(200).json("Verificacion del usuario: " + req.body.email+ " para la mesa: "+parseInt(req.params.mesaId)+", escuela: "+parseInt(req.params.escuelaId)+", mesa: "+parseInt(req.params.distritoId)+" realizada correctamente")
      }
    }).catch(error => {
      res.status(500).json("Ha ocurrido un error, contacte un administrador")
    })
  }

  //params :- distritoId : int, escuelaId : int, mesaId : int
  //body: email : string
  //return message : string
  async checkMesaFiscal(req, res){
    distritoCRUD.deployed()
    .then(async distritoCRUDInstance => {
      let mesaAddress = await distritoCRUDInstance.getMesa.call(parseInt(req.params.distritoId), parseInt(req.params.escuelaId), parseInt(req.params.mesaId), fromObject)
      let mesaInstance = await mesa.at(mesaAddress)
      let result = await mesaInstance.checkFiscalVerify.call(req.body.email, fromObject)
      if (result[0]) {
        res.status(400).json( web3.toAscii(result[1]) )
      } else {
        await mesaInstance.checkFiscal.sendTransaction(req.body.email, fromObject)
        res.status(200).json("Verificacion del usuario: " + req.body.email+ " para la mesa: "+parseInt(req.params.mesaId)+", escuela: "+parseInt(req.params.escuelaId)+", mesa: "+parseInt(req.params.distritoId)+" realizada correctamente")
      }
    }).catch(error => {
      res.status(500).json("Ha ocurrido un error, contacte un administrador")
    })
  }

  //params :- distritoId : int, escuelaId : int, mesaId : int
  //body: email : string, candidates : [{name : string, counts : int}]
  //returns message : string
  async loadMesa(req, res){
    distritoCRUD.deployed()
    .then( async distritoCRUDInstance => {
      let mesaAddress = await distritoCRUDInstance.getMesa.call(parseInt(req.params.distritoId), parseInt(req.params.escuelaId), parseInt(req.params.mesaId), fromObject)
      let mesaInstance = await mesa.at(mesaAddress)
      let parsedCandidates = []
      let parsedCountings = []
      req.body.candidates.map( candidate => {
        parsedCandidates.push(candidate.name)
        parsedCountings.push(parseInt(candidate.counts))
      })
      let canLoad = await mesaInstance.loadMesaVerify.call(req.body.email, parsedCandidates, parsedCountings, fromObject)
      if (canLoad[0]) {
        res.status(400).json( web3.toAscii(canLoad[1]) )
      } else {
        await mesaInstance.loadMesa.sendTransaction(req.body.email, parsedCandidates, parsedCountings, fromObject)
        res.status(200).json( "Mesa: " + req.params.mesaId + " - Escuela: " + req.params.escuelaId + " - Distrito: " + req.params.distritoId + " cargada correctamente")
      }
    })
    .catch(error => {
      res.status(500).json("Ha ocurrido un error, contacte un administrador")
    })
  }
}
