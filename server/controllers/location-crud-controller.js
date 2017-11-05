import { fromObject, distritoCRUD, election, distrito, escuela, mesa, web3 } from '../utils/web3-utils.js'

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
    res.status(400).json("Endpoint en proceso");
  }


  //params :- distritoId : int, escuelaId : int, mesaId : int
  //body :- candidate : string
  //return :- candidates : [{name : string, counts : int}]
  async getMesaTotal(req, res){
    distritoCRUD.deployed()
    .then(async distritoCRUDInstance => {
      let distritoAddress = await distritoCRUDInstance.getDistrito.call(parseInt(req.params.distritoId), fromObject)
      let distritoInstance = await distrito.at(distritoAddress)
      let escuelaAddress = await distritoInstance.getEscuela.call(parseInt(req.params.escuelaId), fromObject)
      let escuelaInstance = await escuela.at(escuelaAddress)
      let mesaAddress = await escuelaInstance.getMesa.call(parseInt(req.params.mesaId), fromObject)
      let mesaInstance = await mesa.at(mesaAddress)
      let candidatesList = await mesaInstance.getCandidatesList.call(fromObject)
      let promises
      let candidates
      promises = candidatesList.map(c => {
        // return mesaInstance.getParticipantVotesForACandidate.call(req.body.email, web3.toAscii(c), fromObject)
        return mesaInstance.getTotal.call(c, fromObject)
      })
      Promise.all(promises).then((results) => {
        candidates = results.map(r => { return {"name" : web3.toAscii(r[0]), "counts" : r[1].toNumber()}})
        res.status(200).json(candidates)
      }).catch(error => {
        res.status(400).json(error.message)
      })
    })
    .catch(error => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }
  async getMesaUser(req, res){
    distritoCRUD.deployed()
    .then(async distritoCRUDInstance => {
      let distritoAddress = await distritoCRUDInstance.getDistrito.call(parseInt(req.params.distritoId), fromObject)
      let distritoInstance = await distrito.at(distritoAddress)
      let escuelaAddress = await distritoInstance.getEscuela.call(parseInt(req.params.escuelaId), fromObject)
      let escuelaInstance = await escuela.at(escuelaAddress)
      let mesaAddress = await escuelaInstance.getMesa.call(parseInt(req.params.mesaId), fromObject)
      let mesaInstance = await mesa.at(mesaAddress)
      let candidatesList = await mesaInstance.getCandidatesList.call(fromObject)
      let promises
      let candidates
      promises = candidatesList.map(c => {
        // return mesaInstance.getParticipantVotesForACandidate.call(req.body.email, web3.toAscii(c), fromObject)
        return mesaInstance.getParticipantVotesForACandidate.call(req.body.email, c, fromObject)
      })
      Promise.all(promises).then((results) => {
        candidates = results.map(r => { return {"name" : web3.toAscii(r[0]), "counts" : r[1].toNumber()}})
        res.status(200).json(candidates)
      }).catch(error => {
        res.status(400).json(error.message)
      })
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
        let distritoAddress = await distritoCRUDInstance.getDistrito.call(parseInt(req.params.distritoId), fromObject)
        let distritoInstance = await distrito.at(distritoAddress)
        let escuelaAddress = await distritoInstance.getEscuela.call(parseInt(req.params.escuelaId), fromObject)
        let escuelaInstance = await escuela.at(escuelaAddress)
        let newMesaAddress = await escuelaInstance.getMesa.call(parseInt(req.params.mesaId), fromObject)
        let mesaInstance = await mesa.at(newMesaAddress)
        await mesaInstance.check.sendTransaction(req.body.email, fromObject)
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
      let distritoAddress = await distritoCRUDInstance.getDistrito.call(parseInt(req.params.distritoId), fromObject)
      let distritoInstance = await distrito.at(distritoAddress)
      let escuelaAddress = await distritoInstance.getEscuela.call(parseInt(req.params.escuelaId), fromObject)
      let escuelaInstance = await escuela.at(escuelaAddress)
      let newMesaAddress = await escuelaInstance.getMesa.call(parseInt(req.params.mesaId), fromObject)
      let mesaInstance = await mesa.at(newMesaAddress)
      req.body.candidates.map( async candidate => {
        let canLoad = await mesaInstance.loadVotesForParticipantVerify.call(req.body.email, candidate.name, candidate.counts, fromObject)
        if (canLoad[0]) {
          res.status(400).json( web3.toAscii(canLoad[1]) )
        } 
      })
      let promises = req.body.candidates.map( async candidate => {
        return await mesaInstance.loadVotesForParticipant.sendTransaction(req.body.email, candidate.name, candidate.counts, fromObject)
      })
      Promise.all(promises).then(() => {
        res.status(200).json("Los datos se han cargado correctamente")
      })
    })
    .catch(error => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }
}
