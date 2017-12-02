import { fromObject, election, distritoCRUD, distrito, escuela, mesa, counts} from '../utils/web3-utils.js'
import {fromSolidity2String, bytes32ListToStringList, clearDefaultCandidates, defaultCandidates} from '../utils/utils.js'

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


  getCandidates(req, res){
    election.deployed()
    .then( async electionInstance => {
      let candidates = await electionInstance.getCandidates.call(fromObject)
      candidates = bytes32ListToStringList(candidates)
      if (candidates.length === 0) {
        res.status(400).json("La eleccion aun no ha sido creada")
      } else {
        res.status(201).json(clearDefaultCandidates(candidates))
      }
    })
    .catch( error => {
      res.status(500).json("Ha ocurrido un error, contacte un administrador")
    })
  }

  getElectionInfo(req, res){
    election.deployed()
    .then( async electionInstance => {
      let result = await electionInstance.getElectionInfo.call(fromObject)
      let list = bytes32ListToStringList(result[4])
      res.status(201).json({created : result[0], distritos : result[1].toNumber(), escuelas : result[2].toNumber(), mesas : result[3].toNumber(), candidates : clearDefaultCandidates(list)})
    })
    .catch( error => {
      res.status(500).json("Ha ocurrido un error, contacte un administrador")
    })
  }

  /* body should have
    email: string*/
  setAutoridadElectoral(req, res){
    election.deployed()
      .then(async electionInstance => {
        await electionInstance.setAutoridadElectoral.sendTransaction(req.body.email, fromObject)
        res.status(200).json("Usuario: " + req.body.email + " asignado como Autoridad Electoral")
      }).catch(error => {
        res.status(500).json("Ha ocurrido un error, contacte un administrador")
      })
  }
  /* body should have
    autoridadElectoralEmail : string,
    apoderadoDePartidoEmail: string,
    candidate : string */
  setApoderadoDePartido(req, res){
    election.deployed()
      .then(async electionInstance => {
        let result = await electionInstance.setApoderadoVerify.call(req.body.autoridadElectoralEmail, req.body.apoderadoDePartidoEmail, req.body.candidate, fromObject)
        if(result[0]){
          res.status(400).json(fromSolidity2String(result[1]))
        } else {
          await electionInstance.setApoderado.sendTransaction(req.body.autoridadElectoralEmail, req.body.apoderadoDePartidoEmail, req.body.candidate, fromObject)
          res.status(200).json("Usuario: " + req.body.apoderadoDePartidoEmail + " asignado como Apoderado del Partido: " +  req.body.candidate)
        }
      })
      .catch(error => {
        res.status(500).json("Ha ocurrido un error, contacte un administrador")
      })
  }
  /* body:
      autoridadElectoralEmail : string,
      delegadoDeDistritoEmail : string,
      distritoId : int
  */
  setDelegadoDeDistrito(req, res){
    election.deployed()
      .then(async (electionInstance) => {
        let result = await electionInstance.setDelegadoDeDistritoVerify.call(req.body.autoridadElectoralEmail, req.body.delegadoDeDistritoEmail, req.body.distritoId, fromObject)
        if(result[0]){
          res.status(400).json( fromSolidity2String(result[1]) )
        } else {
          await electionInstance.setDelegadoDeDistrito.sendTransaction(req.body.autoridadElectoralEmail, req.body.delegadoDeDistritoEmail, req.body.distritoId, fromObject)
          res.status(200).json("Usuario: " + req.body.delegadoDeDistritoEmail + " asignado como Delegado del Distrito: " + req.body.distritoId)
        }
      })
      .catch(error => {
        res.status(500).json("Ha ocurrido un error, contacte un administrador")
      })
    }
  /* body:
      delegadoDeDistritoEmail : string,
      delegadoDeEscuelaEmail : string,
      distritoId : int,
      escuelaId : int
  */
  setDelegadoDeEscuela(req, res){
    election.deployed()
      .then(async electionInstance => {
        let result = await electionInstance.setDelegadoDeEscuelaVerify.call(req.body.delegadoDeDistritoEmail, req.body.delegadoDeEscuelaEmail, req.body.distritoId, req.body.escuelaId, fromObject)
        if(result[0]){
          res.status(400).json(fromSolidity2String(result[1]))
        } else {
          await electionInstance.setDelegadoDeEscuela.sendTransaction(req.body.delegadoDeDistritoEmail, req.body.delegadoDeEscuelaEmail, req.body.distritoId, req.body.escuelaId, fromObject)
          res.status(200).json("Usuario: " + req.body.delegadoDeEscuelaEmail + " fue asignado como Delegado de la Escuela: " + req.body.escuelaId + " del Distrito: " + req.body.distritoId)
        }
      })
      .catch(error => {
        res.status(500).json("Ha ocurrido un error, contacte un administrador")
      })
  }
  /* body:
      delegadoDeEscuelaEmail : string,
      presidenteDeMesaEmail : string,
      distritoId : int,
      escuelaId : int,
      mesaId : int
  */
  setPresidenteDeMesa(req, res){
    election.deployed()
      .then(async electionInstance => {
        let result = await electionInstance.setPresidenteDeMesaVerify.call(req.body.delegadoDeEscuelaEmail, req.body.distritoId, req.body.escuelaId, req.body.mesaId, req.body.presidenteDeMesaEmail, fromObject)
        if(result[0]){
          res.status(400).json(fromSolidity2String(result[1]))
        } else {
          await electionInstance.setPresidenteDeMesa.sendTransaction(req.body.delegadoDeEscuelaEmail, req.body.distritoId, req.body.escuelaId, req.body.mesaId, req.body.presidenteDeMesaEmail, fromObject)
          res.status(200).json("Usuario: " + req.body.presidenteDeMesaEmail + " fue asignado como Presidente de la Mesa: " + req.body.mesaId + " de la Escuela: " + req.body.escuelaId + " del Distrito: " + req.body.distritoId)
        }
      })
      .catch(error => {
        res.status(500).json("Ha ocurrido un error, contacte un administrador")
      })
  }
  /* body:
      delegadoDeEscuelaEmail : string,
      vicepresidenteDeMesaEmail : string,
      distritoId : int,
      escuelaId : int,
      mesaId : int

    returns: message : string
  */
  //falta set vice verify
  setVicepresidenteDeMesa(req, res){
    election.deployed()
      .then(async electionInstance => {
        let result = await electionInstance.setVicepresidenteDeMesaVerify.call(req.body.delegadoDeEscuelaEmail, req.body.distritoId, req.body.escuelaId, req.body.mesaId, req.body.vicepresidenteDeMesaEmail, fromObject)
        if(result[0]){
          res.status(400).json(fromSolidity2String(result[1]))
        } else {
          await electionInstance.setVicepresidenteDeMesa.sendTransaction(req.body.delegadoDeEscuelaEmail, req.body.distritoId, req.body.escuelaId, req.body.mesaId, req.body.vicepresidenteDeMesaEmail, fromObject)
          res.status(200).json("Usuario: " + req.body.vicepresidenteDeMesaEmail + " fue asignado como Vicepresidente de la Mesa: " + req.body.mesaId + " de la Escuela: " + req.body.escuelaId + " del Distrito: " + req.body.distritoId)
        }
      })
      .catch(error => {
        res.status(500).json("Ha ocurrido un error, contacte un administrador")
      })
  }
  /* body:
      apoderadoDePartidoEmail : string,
      fiscalEmail : string,
      candidate : string,
      distritoId : int,
      escuelaId : int,
      mesaId : int
    returns: message : string
  */
  setFiscal(req, res){
    election.deployed()
      .then(async electionInstance => {
        let result = await electionInstance.setFiscalVerify.call(req.body.apoderadoDePartidoEmail, req.body.candidate, req.body.fiscalEmail, req.body.distritoId, req.body.escuelaId, req.body.mesaId, fromObject)
        if(result[0]){
          res.status(400).json(fromSolidity2String(result[1]))
        } else {
          await electionInstance.setFiscal.sendTransaction(req.body.apoderadoDePartidoEmail, req.body.candidate, req.body.fiscalEmail, req.body.distritoId, req.body.escuelaId, req.body.mesaId, fromObject)
          res.status(200).json("Usuario: " + req.body.fiscalEmail + " fue asignado como Fiscal del Candidato: " + req.body.candidate + " en la Mesa: " + req.body.mesaId + " de la Escuela: " + req.body.escuelaId + " del Distrito: " + req.body.distritoId)
        }
      })
      .catch(error => {
        res.status(500).json("Ha ocurrido un error, contacte un administrador")
      })
  }

  /*
    req.body:
      csv de la forma, idDistrito, idEscuela, idMesa, nroPersonas
      email : string
      [[idDistrito : int, idEscuela : int, idMesa : int, personas : int]]
    returns: {nroDistritosCreados : int, nroEscuelasCreadas : int, nroMesasCreadas : int}
  */
  async initByCSV(req, res){
    try{
      let electionInstance = await election.deployed()
      let countsInstance = await counts.deployed()
      let candidates = req.body.candidates.split(',')
      candidates = candidates.concat(defaultCandidates)
      let result = await electionInstance.createElectionVerify.call(req.body.email, candidates, fromObject)
      if (result[0]) {
        res.status(400).json( fromSolidity2String(result[1]) )
      } else {
        if(!req.file){
          res.status(400).json('No se ha cargado el archivo correctamente')
        } else {
            let electionMap = getElectionMap(req.file.buffer.toString('utf8').split('\n'))
            let finished = electionMap.total.mesas
            let distritoCRUDInstance = await distritoCRUD.deployed()
            electionMap.election.forEach(async (escuelasMap, distritoId) => {
              let distritoInstance = await distrito.new(fromObject)
              await distritoCRUDInstance.createDistrito.sendTransaction(distritoId, distritoInstance.address, fromObject)
              escuelasMap.forEach(async (mesasMap, escuelaId) => {
                let escuelaInstance = await escuela.new(fromObject)
                await distritoInstance.createEscuela.sendTransaction(escuelaId, escuelaInstance.address, fromObject)
                mesasMap.forEach(async (personas, mesaId) => {
                  let mesaInstance = await mesa.new(candidates, personas, countsInstance.address, fromObject)
                  await escuelaInstance.createMesa.sendTransaction(mesaId, mesaInstance.address, fromObject)
                  finished -= 1
                  if(finished === 0){
                    await electionInstance.createElection.sendTransaction(req.body.email, candidates, fromObject)
                    await electionInstance.setElectionInfo(electionMap.total.distritos, electionMap.total.escuelas, electionMap.total.mesas, fromObject)
                    res.status(200).json(electionMap.total)
                  }
                })
              })
            })
          }
        }
      } catch(error){
        res.status(500).json("Ha ocurrido un error, contacte un administrador")
      }
    }
  //returns [{string, int}]
  getTotal(req, res){
    counts.deployed()
    .then( async countsInstance => {
      let result = await countsInstance.getTotal.call(fromObject)
      if (result[1].length == 0) {
        res.status(400).json("No existen datos iniciales")
      } else {
        res.status(200).json({
          "candidates" : result[0].map(x => {return fromSolidity2String(x)}),
          "counts" : result[1].map(x => {return x.toNumber()})
        })
      }
    })
    .catch(err => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }

  getCandidateForApoderado(req, res) {
    election.deployed()
    .then( async electionInstance => {
      let result = await electionInstance.getCandidateForApoderado.call(req.params.apoderado, fromObject)
      let value = fromSolidity2String(result)
      if (value === '') {
        res.status(400).json(value)
      } else {
        res.status(201).json(fromSolidity2String(result))
      }
    })
    .catch( error => {
      res.status(500).json( "Error desconocido, por favor contacte un administrador" )
    })
  }
}
// "La Eleccion fue creada con la siguiente cantidad de distritos: " + electionMap.total.distritos + ", de escuelas: " + electionMap.total.escuelas + ", de mesas: " + electionMap.total.mesas
