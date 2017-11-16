import axios from 'axios'

const urlBase = 'http://localhost:8080/api/'

export function signup(userEmail, userPassword){
  return axios.post(urlBase + 'users/signup', { email : userEmail, password : userPassword })
}

export function login(userEmail, userPassword){
  return axios.post(urlBase + 'users/login', {email : userEmail, password : userPassword})
}

export function logout(userAddress){
  return axios.post(urlBase + 'users/logout', {address : userAddress})
}

export function getMesaTotal(distrito, escuela, mesa){
  return axios.get(urlBase + `locations/${distrito}/${escuela}/${mesa}`)
}

export function getMesaUser(userEmail, distrito, escuela, mesa){
  return axios.get(urlBase + `locations/${distrito}/${escuela}/${mesa}/user`, {
    params : {
      email : userEmail
    }
  })
}
export function getMesaParticipants(distrito, escuela, mesa){
  return axios.get(urlBase + `locations/${distrito}/${escuela}/${mesa}/participants`)
}

export function isValidParticipant(userEmail, distrito, escuela, mesa){
  return axios.post(urlBase + `locations/${distrito}/${escuela}/${mesa}/isvalidparticipant`, {
    email : userEmail
  })
}

export function checkMesa(userEmail, distrito, escuela, mesa){
  return axios.post(urlBase + `locations/${distrito}/${escuela}/${mesa}/checkmesa`, {
    email : userEmail
  })
}

export function loadMesa(userEmail, loadcandidates, distrito, escuela, mesa){
  return axios.post(urlBase + `locations/${distrito}/${escuela}/${mesa}/loadmesa`, {
    email : userEmail,
    candidates : loadcandidates
  })
}

export function setFiscal(userEmail, list, fiscal, distrito, escuela, mesa){
  return axios.post(urlBase + 'election/setfiscal', {
    apoderadoDePartidoEmail : userEmail,
    candidate : list,
    fiscalEmail : fiscal,
    distritoId : distrito,
    escuelaId : escuela,
    mesaId : mesa
  })
}

export function setVicepresidenteDeMesa(delegado, vicepresidente, distrito, escuela, mesa){
  return axios.post(urlBase + 'election/setvicepresidentedemesa', {
    delegadoDeEscuelaEmail : delegado,
    vicepresidenteDeMesaEmail : vicepresidente,
    distritoId : distrito,
    escuelaId : escuela,
    mesaId : mesa
  })
}

export function setPresidenteDeMesa(delegado, presidente, distrito, escuela, mesa){
  return axios.post(urlBase + 'election/setpresidentedemesa', {
    delegadoDeEscuelaEmail : delegado,
    presidenteDeMesaEmail : presidente,
    distritoId : distrito,
    escuelaId : escuela,
    mesaId : mesa
  })
}
export function setDelegadoDeEscuela(delegadoDistrito, delegadoEscuela, distrito, escuela){
  return axios.post(urlBase + 'election/setdelegadodeescuela', {
    delegadoDeDistritoEmail : delegadoDistrito,
    delegadoDeEscuelaEmail : delegadoEscuela,
    distritoId : distrito,
    escuelaId : escuela
  })
}
export function setDelegadoDeDistrito(autoridad, delegadoDistrito, distrito){
  return axios.post(urlBase + 'election/setdelegadodedistrito', {
    autoridadElectoralEmail : autoridad,
    delegadoDeDistritoEmail : delegadoDistrito,
    distritoId : distrito
  })
}
export function setApoderadoDePartido(autoridad, apoderado, partido){
  return axios.post(urlBase + 'election/setapoderadodepartido', {
    autoridadElectoralEmail : autoridad,
    apoderadoDePartidoEmail: apoderado,
    candidate : partido
  })
}


export function cargarPersonasALaMesa(autoridad, distrito, escuela, mesa, personas) {
  return axios.post(urlBase + `locations/${distrito}/${escuela}/${mesa}/completemesa`, {
    email : autoridad,
    cantidadDePersonas : personas
  })
}

export function initElectionByCSV(data){
  return axios.post(urlBase + 'election/initbycsv', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
    }
  })
}

export function getElectionInfo(){
  return axios.get(urlBase + 'election/info')
}

export function getTotal(){
  return axios.get(urlBase + 'election/total')
}

export function getTotalDistrito(distrito) {
  return axios.post(urlBase + 'locations/totaldistrito', {
    distritoId : distrito
  })
}
export function getTotalEscuela(distrito, escuela) {
  return axios.get(urlBase + `locations/${distrito}/${escuela}`)
}
