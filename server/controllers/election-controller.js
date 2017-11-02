import { fromObject, election, web3 } from '../utils/web3-utils.js'

export class ElectionController {
  getHome(req, res){
    console.log(electionInstance)
    res.json("HOLA HOME")
  }
  getCandidates(req, res){
    try{
      election.deployed().then((electionInstance) => {
        electionInstance.getCandidates.call(fromObject).then((candidates) => {
          res.json(candidates.map(x => {return web3.toAscii(x)}))
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
      election.deployed().then((electionInstance) => {
        electionInstance.created.call(fromObject).then((result) => {
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
      election.deployed().then((electionInstance) => {
        electionInstance.createElection.sendTransaction(req.body.email, req.body.candidates, fromObject).then((result) => {
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
      election.deployed().then((electionInstance) => {
        electionInstance.setAutoridadElectoral.sendTransaction(req.body.email, fromObject).then((result) => {
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
      election.deployed().then((electionInstance) => {
        electionInstance.setApoderado.sendTransaction(req.body.autoridadElectoralEmail, req.body.apoderadoDePartidoEmail, req.body.candidate, fromObject).then((result) => {
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
      election.deployed().then((electionInstance) => {
        electionInstance.setDelegadoDeDistrito.sendTransaction(req.body.autoridadElectoralEmail, req.body.delegadoDeDistritoEmail, req.body.distritoId, fromObject).then((result) => {
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
      election.deployed().then((electionInstance) => {
        electionInstance.setDelegadoDeEscuela.sendTransaction(req.body.delegadoDeDistritoEmail, req.body.delegadoDeEscuelaEmail, req.body.distritoId, req.body.escuelaId, fromObject).then((result) => {
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
      election.deployed().then((electionInstance) => {
        electionInstance.setPresidenteDeMesa.sendTransaction(req.body.delegadoDeEscuelaEmail, req.body.distritoId, req.body.escuelaId, req.body.mesaId, req.body.presidenteDeMesaEmail, fromObject).then((result) => {
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
      election.deployed().then((electionInstance) => {
        electionInstance.setVicepresidenteDeMesa.sendTransaction(req.body.delegadoDeEscuelaEmail, req.body.distritoId, req.body.escuelaId, req.body.mesaId, req.body.vicepresidenteDeMesaEmail, fromObject).then((result) => {
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
      candidate : string,
      distritoId : int,
      escuelaId : int,
      mesaId : int
  */
  setFiscal(req, res){
    try{
      election.deployed().then((electionInstance) => {
        electionInstance.setFiscal.sendTransaction(req.body.apoderadoDePartidoEmail, req.body.candidate, req.body.fiscalEmail, req.body.distritoId, req.body.escuelaId, req.body.mesaId, fromObject).then((result) => {
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
