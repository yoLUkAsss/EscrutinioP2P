import { fromObject, electionInstance, web3 } from '../utils/web3-utils.js'

export class ElectionController {
  getHome(req, res){
    console.log(electionInstance)
    res.json("HOLA HOME")
  }
  getCandidates(req, res){
    try{
      electionInstance.then((currentInstance) => {
        currentInstance.getCandidates.call(fromObject).then((candidates) => {
          res.json(candidates)
        }).catch(error => {
          res.status(400).json({ message : error.message })
        })
      }).catch(error => {
        res.status(400).json({ message : error.message })
      })
    } catch(error){
      res.status(400).json({ message : error.message })
    }
  }
  getInitializedElection(req, res){
    try{
      electionInstance.then((currentInstance) => {
        currentInstance.created.call(fromObject).then((result) => {
          res.status(200).json(result)
        }).catch(error => {
          res.status(400).json({ message : error.message })
        })
      }).catch(error => {
        res.status(400).json({ message : error.message })
      })
    } catch(error){
      res.status(400).json({ message : error.message })
    }
  }
  /* body should have
    email: string,
    candidates : [string] */
  initElection(req, res){
    try{
      electionInstance.then((currentInstance) => {
        currentInstance.createElection.sendTransaction(req.body.email, req.body.candidates, fromObject).then((result) => {
          res.status(200).json(result)
        }).catch(error => {
          res.status(400).json({ message : error.message })
        })
      }).catch(error => {
        res.status(400).json({ message : error.message })
      })
    } catch(error){
      res.status(400).json({ message : error.message })
    }
  }
  /* body should have
    email: string*/
  setAutoridadElectoral(req, res){
    try{
      electionInstance.then((currentInstance) => {
        currentInstance.setAutoridadElectoral.sendTransaction(req.body.email, fromObject).then((result) => {
          res.status(200).json(result)
        }).catch(error => {
          res.status(400).json({ message : error.message })
        })
      }).catch(error => {
        res.status(400).json({ message : error.message })
      })
    } catch(error){
      res.status(400).json({ message : error.message })
    }
  }
  /* body should have
    autoridadElectoralEmail : string,
    apoderadoDePartidoEmail: string,
    candidate : string */
  setApoderadoDePartido(req, res){
    try{
      electionInstance.then((currentInstance) => {
        currentInstance.setApoderado.sendTransaction(req.body.autoridadElectoralEmail, req.body.apoderadoDePartidoEmail, req.body.candidate, fromObject).then((result) => {
          res.status(200).json(result)
        }).catch(error => {
          res.status(400).json({ message : error.message })
        })
      }).catch(error => {
        res.status(400).json({ message : error.message })
      })
    } catch(error){
      res.status(400).json({ message : error.message })
    }
  }
  /* body:
      autoridadElectoralEmail : string,
      delegadoDeDistritoEmail : string,
      distritoId : int
  */
  setDelegadoDeDistrito(req, res){
    try{
      electionInstance.then((currentInstance) => {
        currentInstance.setDelegadoDeDistrito.sendTransaction(req.body.autoridadElectoralEmail, req.body.delegadoDeDistritoEmail, req.body.distritoId, fromObject).then((result) => {
          res.status(200).json(result)
        }).catch(error => {
          res.status(400).json({ message : error.message })
        })
      }).catch(error => {
        res.status(400).json({ message : error.message })
      })
    } catch(error){
      res.status(400).json({ message : error.message })
    }
  }
  /* body:
      delegadoDeDistritoEmail : string,
      delegadoDeEscuelaEmail : string,
      distritoId : int,
      escuelaId : int
  */
  setDelegadoDeEscuela(req, res){
    try{
      electionInstance.then((currentInstance) => {
        currentInstance.setDelegadoDeEscuela.sendTransaction(req.body.delegadoDeDistritoEmail, req.body.delegadoDeEscuelaEmail, req.body.distritoId, req.body.escuelaId, fromObject).then((result) => {
          res.status(200).json(result)
        }).catch(error => {
          res.status(400).json({ message : error.message })
        })
      }).catch(error => {
        res.status(400).json({ message : error.message })
      })
    } catch(error){
      res.status(400).json({ message : error.message })
    }
  }
  /* body:
      delegadoDeEscuelaEmail : string,
      presidenteDeMesaEmail : string,
      distritoId : int,
      escuelaId : int,
      mesaId : int
  */
  setPresidenteDeMesa(req, res){
    try{
      electionInstance.then((currentInstance) => {
        currentInstance.setPresidenteDeMesa.sendTransaction(req.delegadoDeEscuelaEmail, req.presidenteDeMesaEmail, req.distritoId, req.escuelaId, req.mesaId, fromObject).then((result) => {
          res.status(200).json(result)
        }).catch(error => {
          res.status(400).json({ message : error.message })
        })
      }).catch(error => {
        res.status(400).json({ message : error.message })
      })
    } catch(error){
      res.status(400).json({ message : error.message })
    }
  }
  /* body:
      delegadoDeEscuelaEmail : string,
      vicepresidenteDeMesaEmail : string,
      distritoId : int,
      escuelaId : int,
      mesaId : int
  */
  setVicepresidenteDeMesa(req, res){
    try{
      electionInstance.then((currentInstance) => {
        currentInstance.setVicepresidenteDeMesa.sendTransaction(req.delegadoDeEscuelaEmail, req.vicepresidenteDeMesaEmail, req.distritoId, req.escuelaId, req.mesaId, fromObject).then((result) => {
          res.status(200).json(result)
        }).catch(error => {
          res.status(400).json({ message : error.message })
        })
      }).catch(error => {
        res.status(400).json({ message : error.message })
      })
    } catch(error){
      res.status(400).json({ message : error.message })
    }
  }
  /* body:
      apoderadoDePartidoEmail : string,
      fiscalEmail : string,
      distritoId : int,
      escuelaId : int,
      mesaId : int
  */
  setFiscal(req, res){
    try{
      electionInstance.then((currentInstance) => {
        currentInstance.setFiscal.sendTransaction(req.body.apoderadoDePartidoEmail, req.body.fiscalEmail, req.body.distritoId, req.body.escuelaId, req.body.mesaId, fromObject).then((result) => {
          res.status(200).json(result)
        }).catch(error => {
          res.status(400).json({ message : error.message })
        })
      }).catch(error => {
        res.status(400).json({ message : error.message })
      })
    } catch(error){
      res.status(400).json({ message : error.message })
    }
  }
}
