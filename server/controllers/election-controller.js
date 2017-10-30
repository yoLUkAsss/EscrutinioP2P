import { fromObject, electionInstance, web3 } from '../utils/web3-utils.js'

export class ElectionController {
  getHome(req, res){
    console.log(currentElection)
    res.json("HOLA HOME")
  }
  getCandidates(req, res){
    try{
      electionInstance.then((currentInstance) => {
        currentInstance.getCandidates.call(fromObject).then((candidates) => {
          res.json(candidates)
        }).catch(err => {
          res.json("failed")
        })
      }).catch(err => {
        res.json("failed")
      })
    } catch(err){
      res.json("failed")
    }
  }
  getInitializedElection(req, res){
    try{
      electionInstance.then((currentInstance) => {
        currentInstance.created.call(fromObject).then((result) => {
          res.json(result)
        }).catch(err => {
          res.json("failed")
        })
      }).catch(err => {
        res.json("failed")
      })
    } catch(err){
      res.json("failed")
    }
  }
  /* body should have
    email: string,
    candidates : [string] */
  initElection(req, res){
    try{
      electionInstance.then((currentInstance) => {
        currentInstance.createElection.sendTransaction(req.body.email, req.body.candidates, fromObject).then((idTx) => {
          res.json("work")
        }).catch(err => {
          res.json("failed")
        })
      }).catch(err => {
        res.json("failed")
      })
    } catch(err){
      res.json("failed")
    }
  }
  /* body should have
    email: string*/
  setAutoridadElectoral(req, res){
    try{
      electionInstance.then((currentInstance) => {
        currentInstance.setAutoridadElectoral.sendTransaction(req.body.email, fromObject).then((idTx) => {
          res.json("work")
        }).catch(err => {
          res.json("failed")
        })
      }).catch(err => {
        res.json("failed")
      })
    } catch(err){
      res.json("failed")
    }
  }
  /* body should have
    autoridadElectoralEmail : string,
    apoderadoDePartidoEmail: string,
    candidate : string */
  setApoderadoDePartido(req, res){
    try{
      electionInstance.then((currentInstance) => {
        currentInstance.setApoderado.sendTransaction(req.body.autoridadElectoralEmail, req.body.apoderadoDePartidoEmail, req.body.candidate, fromObject).then((idTx) => {
          res.json("work")
        }).catch(err => {
          res.json("failed")
        })
      }).catch(err => {
        res.json("failed")
      })
    } catch(err){
      res.json("failed")
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
        currentInstance.setDelegadoDeDistrito.sendTransaction(req.body.autoridadElectoralEmail, req.body.delegadoDeDistritoEmail, req.body.distritoId, fromObject).then((idTx) => {
          res.json("work")
        }).catch(err => {
          res.json("failed")
        })
      }).catch(err => {
        res.json("failed")
      })
    } catch(err){
      res.json("failed")
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
        currentInstance.setDelegadoDeEscuela.sendTransaction(req.body.delegadoDeDistritoEmail, req.body.delegadoDeEscuelaEmail, req.body.distritoId, req.body.escuelaId, fromObject).then((idTx) => {
          res.json("work")
        }).catch(err => {
          res.json("failed")
        })
      }).catch(err => {
        res.json("failed")
      })
    } catch(err){
      res.json("failed")
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
        currentInstance.setPresidenteDeMesa.sendTransaction(req.delegadoDeEscuelaEmail, req.presidenteDeMesaEmail, req.distritoId, req.escuelaId, req.mesaId, fromObject).then((idTx) => {
          res.json("work")
        }).catch(err => {
          res.json("failed")
        })
      }).catch(err => {
        res.json("failed")
      })
    } catch(err){
      res.json("failed")
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
        currentInstance.setVicepresidenteDeMesa.sendTransaction(req.delegadoDeEscuelaEmail, req.vicepresidenteDeMesaEmail, req.distritoId, req.escuelaId, req.mesaId, fromObject).then((idTx) => {
          res.json("work")
        }).catch(err => {
          res.json("failed")
        })
      }).catch(err => {
        res.json("failed")
      })
    } catch(err){
      res.json("failed")
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
        currentInstance.setFiscal.sendTransaction(req.body.apoderadoDePartidoEmail, req.body.fiscalEmail, req.body.distritoId, req.body.escuelaId, req.body.mesaId, fromObject).then((idTx) => {
          res.json("work")
        }).catch(err => {
          res.json("failed")
        })
      }).catch(err => {
        res.json("failed")
      })
    } catch(err){
      res.json("failed")
    }
  }
}
