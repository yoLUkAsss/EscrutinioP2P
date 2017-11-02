import { fromObject, distritoCRUD, election, distrito, escuela, mesa, web3 } from '../utils/web3-utils.js'

export class LocationController {
  /*    returns locationsId : [int]   */
  getLocations(req, res){
    try{
      distritoCRUD.deployed().then((distritoCRUDInstance) => {
        distritoCRUDInstance.getDistritos.call(fromObject).then((result) => {
          res.status(200).json(result)
        }).catch(error => {
          res.status(400).json(error.message)
        })
      })
    } catch(error){
      res.status(400).json(error.message)
    }
  }
  /*    params: locationId : int  */
  /*    returns locationAddress : string   */
  getLocation(req, res){
    try{
      distritoCRUD.deployed().then((distritoCRUDInstance) => {
        distritoCRUDInstance.getDistrito.call(req.params.locationId, fromObject).then((result) => {
          res.status(200).json(result)
        }).catch(error => {
          res.status(400).json(error.message)
        })
      })
    } catch(error){
      res.status(400).json(error.message)
    }
  }
  /*
    agregar un input para el id del distrito en create election
    body:
    email : string,
    distritoId : int
    escuelas : int
  */
  async initDistrito(req, res){
    try {
      election.deployed().then(async (electionInstance) => {
        let existsDistrito = false
        distritoCRUD.deployed().then(async (distritoCRUDInstance) => {
          existsDistrito = await distritoCRUDInstance.existsDistrito.call(req.body.distritoId, fromObject)
        }).catch(error => {
          res.status(400).json(error.message)
        })
        if(existsDistrito) throw new Error("distrito already exists")
        await electionInstance.createDistrito.sendTransaction(req.body.email, req.body.distritoId, fromObject)
        let promises = []
        for(let i = 0; i < req.body.escuelas; i++){
          promises.push(electionInstance.createEscuela.sendTransaction(req.body.email, req.body.distritoId, fromObject))
        }
        Promise.all(promises).then(() => {
          res.status(200).json("distrito inicializado")
        }).catch(error => {
          res.status(400).json(error.message)
        })
      }).catch(error => {
        res.status(400).json(error.message)
      })
    } catch(error){
      res.status(400).json(error.message)
    }
  }
  /*
    body:
    email : string,
    distritoId : int,
    escuelaId : int,
    mesas : int
  */
  initEscuela(req, res){
    try {
      election.deployed().then((electionInstance) => {
        // await currentInstance.createEscuela.sendTransaction(req.body.autoridadElectoral, req.body.distritoId, fromObject)
        let promises = []
        for(let i = 0; i < req.body.mesas; i++){
          promises.push(electionInstance.createMesa.sendTransaction(req.body.email, req.body.distritoId, req.body.escuelaId, fromObject))
        }
        Promise.all(promises).then(() => {
          res.status(200).json("escuela inicializada")
        }).catch(error => {
          console.log(error)
          res.status(400).json(error.message)
        })
      }).catch(error => {
        res.status(400).json(error.message)
      })
    } catch(error){
      res.status(400).json(error.message)
    }
  }
  //params :- distritoId : int, escuelaId : int, mesaId : int
  //body :- candidate : string
  //return :- candidates : [{name : string, counts : int}]
  async getMesaTotal(req, res){
    try{
      distritoCRUD.deployed().then(async distritoCRUDInstance => {
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
      }).catch(error => {
        res.status(400).json(error.message)
      })
    } catch(error){
      res.status(400).json(error.message)
    }
  }
  async getMesaUser(req, res){
    try{
      distritoCRUD.deployed().then(async distritoCRUDInstance => {
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
      }).catch(error => {
        res.status(400).json(error.message)
      })
    } catch(error){
      res.status(400).json(error.message)
    }
  }

  //params :- distritoId : int, escuelaId : int, mesaId : int
  //body: email : string
  async isValidParticipant(req, res){
    try{
      distritoCRUD.deployed().then(async distritoCRUDInstance => {
        let distritoAddress = await distritoCRUDInstance.getDistrito.call(parseInt(req.params.distritoId), fromObject)
        let distritoInstance = await distrito.at(distritoAddress)
        let escuelaAddress = await distritoInstance.getEscuela.call(parseInt(req.params.escuelaId), fromObject)
        let escuelaInstance = await escuela.at(escuelaAddress)
        let newMesaAddress = await escuelaInstance.getMesa.call(parseInt(req.params.mesaId), fromObject)
        let mesaInstance = await mesa.at(newMesaAddress)
        let candidatesList = await mesaInstance.getCandidatesList.call(fromObject)
        let isValidParticipant = await mesaInstance.isValidParticipant.call(req.body.email, fromObject)
        res.status(200).json(isValidParticipant)
      }).catch(error => {
        res.status(400).json(error.message)
      })
    } catch(error){
      res.status(400).json(error.message)
    }
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
    try{
      distritoCRUD.deployed().then(async distritoCRUDInstance => {
        let distritoAddress = await distritoCRUDInstance.getDistrito.call(parseInt(req.params.distritoId), fromObject)
        let distritoInstance = await distrito.at(distritoAddress)
        let escuelaAddress = await distritoInstance.getEscuela.call(parseInt(req.params.escuelaId), fromObject)
        let escuelaInstance = await escuela.at(escuelaAddress)
        let newMesaAddress = await escuelaInstance.getMesa.call(parseInt(req.params.mesaId), fromObject)
        let mesaInstance = await mesa.at(newMesaAddress)
        let promises = req.body.candidates.map(candidate => {
          return mesaInstance.loadVotesForParticipant.sendTransaction(req.body.email, candidate.name, candidate.counts, fromObject)
        })
        Promise.all(promises).then(() => {
          res.status(200).json("Carga de datos correcta")
        }).catch(error => {
          res.status(400).json("Fallo en la carga de datos")
        })
      }).catch(error => {
        res.status(400).json("Fallo en la carga de datos")
      })
    } catch(error){
      res.status(400).json(error.message)
    }
  }

  async existsDistrito(req, res){
    try{
      let distritoCRUDInstance = await distritoCRUD.deployed()
      let exists = await distritoCRUDInstance.existsDistrito(req.params.distritoId, fromObject)
      res.status(200).json(exists)
    } catch(error){
      res.status(400).json(error.message)
    }
  }
  async existsEscuela(req, res){
    try{
      let distritoCRUDInstance = await distritoCRUD.deployed()
      let distritoAddress = await distritoCRUDInstance.getDistrito.call(req.params.distritoId, fromObject)
      let distritoInstance = await distrito.at(distritoAddress)
      let exists = await distritoInstance.existsEscuela.call(req.params.escuelaId, fromObject)
      res.status(200).json(exists)
    } catch(error){
      res.status(400).json(error.message)
    }
  }
  async existsMesa(req, res){
    try{
      let distritoCRUDInstance = await distritoCRUD.deployed()
      let distritoAddress = await distritoCRUDInstance.getDistrito.call(req.params.distritoId, fromObject)
      let distritoInstance = await distrito.at(distritoAddress)
      let escuelaAddress = await distritoInstance.getEscuela.call(req.params.escuelaId, fromObject)
      let escuelaInstance = await escuela.at(escuelaAddress)
      let exists = await escuelaInstance.existsMesa.call(req.params.mesaId, fromObject)
      res.status(200).json(exists)
    } catch(error){
      res.status(400).json(error.message)
    }
  }

}
