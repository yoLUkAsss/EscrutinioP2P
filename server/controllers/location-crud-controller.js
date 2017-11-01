import { fromObject, distritoCRUDInstance, electionInstance, web3 } from '../utils/web3-utils.js'

export class LocationController {
  /*    returns locationsId : [int]   */
  getLocations(req, res){
    try{
      distritoCRUDInstance.then((currentInstance) => {
        currentInstance.getDistritos.call(fromObject).then((result) => {
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
      distritoCRUDInstance.then((currentInstance) => {
        currentInstance.getDistrito.call(req.params.locationId, fromObject).then((result) => {
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
      console.log(req.body)
      electionInstance.then(async (currentInstance) => {
        let existsDistrito = false
        distritoCRUDInstance.then(async (crudInstance) => {
          existsDistrito = await crudInstance.existsDistrito.call(req.body.distritoId)
        }).catch(error => {
          res.status(400).json(error.message)
        })
        if(existsDistrito) throw new Error("distrito already exists")
        await currentInstance.createDistrito.sendTransaction(req.body.email, req.body.distritoId, fromObject)
        let promises = []
        for(let i = 0; i < req.body.escuelas; i++){
          promises.push(currentInstance.createEscuela.sendTransaction(req.body.email, req.body.distritoId, fromObject))
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
      console.log(req.body)
      electionInstance.then((currentInstance) => {
        // await currentInstance.createEscuela.sendTransaction(req.body.autoridadElectoral, req.body.distritoId, fromObject)
        let promises = []
        for(let i = 0; i < req.body.mesas; i++){
          promises.push(currentInstance.createMesa.sendTransaction(req.body.email, req.body.distritoId, req.body.escuelaId, fromObject))
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
}
