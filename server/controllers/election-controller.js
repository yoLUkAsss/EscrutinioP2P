import { fromObject, election, web3, distritoCRUD, distrito, escuela, mesa} from '../utils/web3-utils.js'
const csv = require('csvtojson')


function getElectionMap(csv){
  let distritos = new Map()
  let currDistrito, currEscuela, currMesa
  let line2
  let totalMesas = 0
  let totalEscuelas = 0
  let totalDistritos = 0
  csv.map(line => {return line.split(',')}).forEach(line => {
    if(line.length === 4){
      line2 = line.map(x => { return parseInt(x)})
      if(!distritos.has(line2[0])){
        distritos.set(line2[0], new Map())
        totalDistritos += 1
      }
      currDistrito = distritos.get(line2[0])
      if(!currDistrito.has(line2[1])){
        currDistrito.set(line2[1], new Map())
        totalEscuelas += 1
      }
      currEscuela = currDistrito.get(line2[1])
      if(!currEscuela.has(line2[2])){
        currEscuela.set(line2[2], line2[3])
        totalMesas += 1
      }
    }
  })
  return {election : distritos, total : { distritos : totalDistritos, escuelas : totalEscuelas, mesas : totalMesas}}
}

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
  // initElection(req, res){
  //   election.deployed()
  //   .then( async electionInstance => {
  //     let result = await electionInstance.createElectionVerify.call(req.body.email, req.body.candidates, fromObject)
  //     if (result[0]) {
  //       res.status(400).json( web3.toAscii(result[1]) )
  //     } else {
  //       await electionInstance.createElection.sendTransaction(req.body.email, req.body.candidates, fromObject)
  //       res.status(200).json( "Elección creada correctamente" )
  //     }
  //   })
  //   .catch( error => {
  //     res.status(500).json( "Error desconocido, por favor contacte un administrador" )
  //   })
  // }

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
        let result = electionInstance.setApoderadoVerify.call(req.body.autoridadElectoralEmail, req.body.apoderadoDePartidoEmail, req.body.candidate, fromObject)
        if(result[0]){
          res.status(400).json( web3.toAscii(result[1]) )
        } else{
          electionInstance.setApoderado.sendTransaction(req.body.autoridadElectoralEmail, req.body.apoderadoDePartidoEmail, req.body.candidate, fromObject).then((result) => {
            res.status(200).json(result)
          }).catch(error => {
            res.status(400).json({ message : error.message })
          })
        }
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
        let result = electionInstance.setDelegadoDeDistritoVerify.call(req.body.autoridadElectoralEmail, req.body.delegadoDeDistritoEmail, req.body.distritoId, fromObject)
        if(result[0]){
          res.status(400).json( web3.toAscii(result[1]) )
        } else {
          electionInstance.setDelegadoDeDistrito.sendTransaction(req.body.autoridadElectoralEmail, req.body.delegadoDeDistritoEmail, req.body.distritoId, fromObject).then((result) => {
            res.status(200).json(result)
          }).catch(error => {
            res.status(400).json({ message : error.message })
          })
        }
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
        let result = electionInstance.setDelegadoDeEscuelaVerify.call(req.body.delegadoDeDistritoEmail, req.body.delegadoDeEscuelaEmail, req.body.distritoId, req.body.escuelaId, fromObject)
        if(result[0]){
          res.status(400).json( web3.toAscii(result[1]) )
        } else {
          electionInstance.setDelegadoDeEscuela.sendTransaction(req.body.delegadoDeDistritoEmail, req.body.delegadoDeEscuelaEmail, req.body.distritoId, req.body.escuelaId, fromObject).then((result) => {
            res.status(200).json(result)
          }).catch(error => {
            res.status(400).json({ message : error.message })
          })
        }
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
        let result = electionInstance.setPresidenteDeMesaVerify.call(req.body.delegadoDeEscuelaEmail, req.body.distritoId, req.body.escuelaId, req.body.mesaId, req.body.presidenteDeMesaEmail, fromObject)
        if(result[0]){
          res.status(400).json( web3.toAscii(result[1]) )
        } else {
          electionInstance.setPresidenteDeMesa.sendTransaction(req.body.delegadoDeEscuelaEmail, req.body.distritoId, req.body.escuelaId, req.body.mesaId, req.body.presidenteDeMesaEmail, fromObject).then((result) => {
            res.status(200).json(result)
          }).catch(error => {
            res.status(400).json({ message : error.message })
          })
        }
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
        let result = electionInstance.setFiscalVerify.call(req.body.apoderadoDePartidoEmail, req.body.candidate, req.body.fiscalEmail, req.body.distritoId, req.body.escuelaId, req.body.mesaId, fromObject)
        if(result[0]){
          res.status(400).json( web3.toAscii(result[1]) )
        } else {
          electionInstance.setFiscal.sendTransaction(req.body.apoderadoDePartidoEmail, req.body.candidate, req.body.fiscalEmail, req.body.distritoId, req.body.escuelaId, req.body.mesaId, fromObject).then((result) => {
            res.status(200).json(result)
          }).catch(error => {
            res.status(400).json({ message : error.message })
          })
        }
      }).catch(error => {
        res.status(400).json({ message : error.message })
      })
    } catch(error){
      res.status(400).json({ message : error.message })
    }
  }

  /*
    req.body:
      csv de la forma
      email : string
      locations : [[int, int, id]]
      [{idDistrito : int, idEscuela : int, idMesa : int, personas : int]]
  */
  async initByCSV(req, res){
    try{
      let electionInstance = await election.deployed()
      let candidates = req.body.candidates.split(',')
      let result = await electionInstance.createElectionVerify.call(req.body.email, candidates, fromObject)
      if (result[0]) {
        res.status(400).json( web3.toAscii(result[1]) )
      } else {
        await electionInstance.createElection.sendTransaction(req.body.email, candidates, fromObject)
        if(!req.file){
          res.status(400).send('No files were uploaded.')
        } else {
          let electionMap = getElectionMap(req.file.buffer.toString('utf8').split('\n'))
          let finished = electionMap.total.mesas
          let distritoCRUDInstance = await distritoCRUD.deployed()
          electionMap.election.forEach((escuelasMap, distritoId) => {
            distritoCRUDInstance.createDistrito.sendTransaction(distritoId, fromObject).then(idTx1 => {
              distritoCRUDInstance.getDistrito.call(distritoId, fromObject).then(distritoAddress => {
                distrito.at(distritoAddress).then(currentDistritoInstance => {
                  escuelasMap.forEach((mesas, escuelaId) => {
                    currentDistritoInstance.createEscuela.sendTransaction(escuelaId, fromObject).then(idTx2 => {
                      currentDistritoInstance.getEscuela.call(escuelaId, fromObject).then(escuelaAddress => {
                        escuela.at(escuelaAddress).then(currentEscuelaInstance => {
                          mesas.forEach((personas, mesaId) => {
                            currentEscuelaInstance.createMesa.sendTransaction(mesaId, candidates, personas, fromObject).then(idTx3 => {
                              finished -= 1
                              if(finished == 0){
                                res.status(200).json(electionMap.total)
                              }
                            }).catch(error => {
                              res.status(400).json("catched mesa promise")
                            })
                          })
                        }).catch(error => {
                          res.status(400).json("catched current escuela promise")
                        })
                      }).catch(error => {
                        res.status(400).json("catched escuela address promise")
                      })
                    }).catch(error => {
                      res.status(400).json("catched create escuela promise")
                    })
                  })
                }).catch(error => {
                  res.status(400).json("catched current distrito promise")
                })
              }).catch(error => {
                res.status(400).json("catched distrito address promise")
              })
            }).catch(err => {
              console.log(err)
              res.status(400).json("catched create distrito promise")
            })
          })
        }
      }
      } catch(error){
        console.log(error)
        res.status(400).json("algo fallo")
      }
  }

}
