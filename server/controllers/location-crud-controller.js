import { fromObject, distritoCRUD, election, distrito, escuela, mesa, web3, counts } from '../utils/web3-utils.js'

export class LocationController {
  /*    returns locationsId : [int]   */
  getLocations(req, res){
    distritoCRUD.deployed()
    .then( async distritoCRUDInstance => {
      let result = await distritoCRUDInstance.getDistritos.call(fromObject)
      res.status(201).json(result)
    })
    .catch( error => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }


  /*    params: locationId : int  */
  /*    returns locationAddress : string   */
  getLocation(req, res){
    distritoCRUD.deployed()
    .then( async distritoCRUDInstance => {
      let result = await distritoCRUDInstance.getDistrito.call(req.params.locationId, fromObject)
      res.status(201).json(result)
    })
    .catch( error => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }
  /*
    agregar un input para el id del distrito en create election
    body:
    email : string,
    distritoId : int
    escuelas : int
  */
  initDistrito(req, res){
    election.deployed()
    .then( async electionInstance => {
      let result = await electionInstance.createDistritoVerify.call(req.body.email, req.body.distritoId, fromObject)
      if (result[0]) {
        res.status(400).json( web3.toAscii(result[1]) )
      } else {
        await electionInstance.createDistrito.sendTransaction(req.body.email, req.body.distritoId, fromObject)
        let promises = []
        for(let i = 0; i < req.body.escuelas; i++){
          let result2 = await electionInstance.createEscuelaVerify.call(req.body.email, req.body.distritoId, fromObject)
          if (result2[0]) {
            res.status(400).json( web3.toAscii(result2[1]) )
          }
          await promises.push(electionInstance.createEscuela.sendTransaction(req.body.email, req.body.distritoId, fromObject))
        }
        Promise.all(promises)
        .then(() => {
          res.status(200).json("distrito inicializado")
        })
        .catch(error => {
          res.status(400).json(error.message)
        })
      }
    })
    .catch( error => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }



  /*
    body:
    email : string,
    distritoId : int,
    escuelaId : int,
    mesas : int
  */
  initEscuela(req, res){
    election.deployed()
    .then( async (electionInstance) => {
      let promises = []
      for(let i = 0; i < req.body.mesas; i++){
        let result = await electionInstance.createMesaVerify.call(req.body.email, req.body.distritoId, req.body.escuelaId, fromObject)
        if (result[0]) {
          res.status(400).json( web3.toAscii(result[1]) )
        } else {
          await promises.push(electionInstance.createMesa.sendTransaction(req.body.email, req.body.distritoId, req.body.escuelaId, fromObject))
        }
      }
      Promise.all(promises)
      .then( async () => {

        let finalizar = await electionInstance.mesasCreatedVerify.call(req.body.email, req.body.distritoId, req.body.escuelaId, fromObject)
        if (finalizar[0]) {
          res.status(400).json( web3.toAscii(finalizar[1]) )
        } else {
          await electionInstance.mesasCreated.sendTransaction(req.body.email, req.body.distritoId, req.body.escuelaId, fromObject)
          res.status(200).json( "Mesas creadas correctamente" )
        }

      })
    })
    .catch(error => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  completeMesa(req, res) {
    election.deployed()
    .then( async electionInstance => {
      let result = await electionInstance.completeMesaVerify.call(req.body.email, req.params.distritoId, req.params.escuelaId, req.params.mesaId, req.body.cantidadDePersonas, fromObject)
      if (result[0]) {
        res.status(400).json( web3.toAscii(result[1]) )
      } else {
        await electionInstance.completeMesa.sendTransaction(req.body.email, req.params.distritoId, req.params.escuelaId, req.params.mesaId, req.body.cantidadDePersonas, fromObject)
        res.status(200).json("Numero de personas en la mesa, completo")
      }
    })
    .catch(error => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }


  //params :- distritoId : int, escuelaId : int, mesaId : int
  //body :- candidate : string
  //return :- candidates : [{name : string, counts : int}]
  async getMesaTotal(req, res){
    election.deployed().then(async electionInstance => {
      let result = await counts.getTotal.call(parseInt(req.params.distritoId), parseInt(req.params.escuelaId), parseInt(req.params.mesaId), fromObject)
      let parsedResult = [];
      for (var index = 0; index < array.length; index++) {
        parsedResult.push({ 'name':web3.toAscii(result[0][index]), 'counts':result[1][index].toNumber() })
      }
    }).catch(error => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
    // distritoCRUD.deployed()
    // .then(async distritoCRUDInstance => {
    //   let distritoAddress = await distritoCRUDInstance.getDistrito.call(parseInt(req.params.distritoId), fromObject)
    //   let distritoInstance = await distrito.at(distritoAddress)
    //   let escuelaAddress = await distritoInstance.getEscuela.call(parseInt(req.params.escuelaId), fromObject)
    //   let escuelaInstance = await escuela.at(escuelaAddress)
    //   let mesaAddress = await escuelaInstance.getMesa.call(parseInt(req.params.mesaId), fromObject)
    //   let mesaInstance = await mesa.at(mesaAddress)
    //   let candidatesList = await mesaInstance.getCandidatesList.call(fromObject)
    //   let promises
    //   let candidates
    //   promises = candidatesList.map(c => {
    //     // return mesaInstance.getParticipantVotesForACandidate.call(req.body.email, web3.toAscii(c), fromObject)
    //     return mesaInstance.getTotal.call(c, fromObject)
    //   })
    //   Promise.all(promises).then((results) => {
    //     candidates = results.map(r => { return {"name" : web3.toAscii(r[0]), "counts" : r[1].toNumber()}})
    //     res.status(200).json(candidates)
    //   }).catch(error => {
    //     res.status(400).json(error.message)
    //   })
    // })
    // .catch(error => {
    //   res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    // })
  }
  async getMesaParticipants(req, res){
    distritoCRUD.deployed()
    .then(async distritoCRUDInstance => {
      let mesaAddress = await distritoCRUDInstance.getMesa.call(parseInt(req.params.distritoId), parseInt(req.params.escuelaId), parseInt(req.params.mesaId), fromObject)
      // let distritoAddress = await distritoCRUDInstance.getDistrito.call(parseInt(req.params.distritoId), fromObject)
      // let distritoInstance = await distrito.at(distritoAddress)
      // let escuelaAddress = await distritoInstance.getEscuela.call(parseInt(req.params.escuelaId), fromObject)
      // let escuelaInstance = await escuela.at(escuelaAddress)
      // let mesaAddress = await escuelaInstance.getMesa.call(parseInt(req.params.mesaId), fromObject)
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
          response.push(participant)
        })
        res.status(200).json(response)
      }).catch(error => {
        res.status(400).json("error")
      })
    })
    .catch(error => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }
  //req.body : email,
  //req.params : distritoId, escuelaId, mesaId
  async getMesaUser(req, res){
    distritoCRUD.deployed()
    .then(async distritoCRUDInstance => {
      let mesaAddress = await distritoCRUDInstance.getMesa.call(parseInt(req.params.distritoId), parseInt(req.params.escuelaId), parseInt(req.params.mesaId), fromObject)
      // let distritoAddress = await distritoCRUDInstance.getDistrito.call(parseInt(req.params.distritoId), fromObject)
      // let distritoInstance = await distrito.at(distritoAddress)
      // let escuelaAddress = await distritoInstance.getEscuela.call(parseInt(req.params.escuelaId), fromObject)
      // let escuelaInstance = await escuela.at(escuelaAddress)
      // let mesaAddress = await escuelaInstance.getMesa.call(parseInt(req.params.mesaId), fromObject)
      let mesaInstance = await mesa.at(mesaAddress)
      let result = await mesaInstance.getCounting(req.query.email, fromObject)
      let parsedResult = []
      for (var index = 0; index < result[1].length; index++) {
        parsedResult.push({"name" : web3.toAscii(result[1][index]), "counts" : result[2][index].toNumber()})
      }
      res.status(201).json(parsedResult)
    })
    .catch(error => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }


  //params :- distritoId : int, escuelaId : int, mesaId : int
  //body: email : string
  async checkMesa(req, res){
    try{
      distritoCRUD.deployed().then(async distritoCRUDInstance => {
        let mesaAddress = await distritoCRUDInstance.getMesa.call(parseInt(req.params.distritoId), parseInt(req.params.escuelaId), parseInt(req.params.mesaId), fromObject)
        // let distritoAddress = await distritoCRUDInstance.getDistrito.call(parseInt(req.params.distritoId), fromObject)
        // let distritoInstance = await distrito.at(distritoAddress)
        // let escuelaAddress = await distritoInstance.getEscuela.call(parseInt(req.params.escuelaId), fromObject)
        // let escuelaInstance = await escuela.at(escuelaAddress)
        // let newMesaAddress = await escuelaInstance.getMesa.call(parseInt(req.params.mesaId), fromObject)
        let mesaInstance = await mesa.at(mesaAddress)
        await mesaInstance.check.sendTransaction(req.body.email, parseInt(req.params.distritoId), parseInt(req.params.escuelaId), parseInt(req.params.mesaId), fromObject)
        res.status(200).json("checked correctly")
      }).catch(error => {
        res.status(400).json(error.message)
      })
    } catch(error){
      res.status(400).json(error.message)
    }
  }
  //params :- distritoId : int, escuelaId : int, mesaId : int
  //body: email : string, candidates : [{name : string, counts : int}]
  async loadMesa(req, res){
    distritoCRUD.deployed()
    .then( async distritoCRUDInstance => {

      let mesaAddress = await distritoCRUDInstance.getMesa.call(parseInt(req.params.distritoId), parseInt(req.params.escuelaId), parseInt(req.params.mesaId), fromObject)

      // let distritoAddress = await distritoCRUDInstance.getDistrito.call(parseInt(req.params.distritoId), fromObject)
      // let distritoInstance = await distrito.at(distritoAddress)
      //
      // let escuelaAddress = await distritoInstance.getEscuela.call(parseInt(req.params.escuelaId), fromObject)
      // let escuelaInstance = await escuela.at(escuelaAddress)
      //
      // let newMesaAddress = await escuelaInstance.getMesa.call(parseInt(req.params.mesaId), fromObject)
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
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }
}
