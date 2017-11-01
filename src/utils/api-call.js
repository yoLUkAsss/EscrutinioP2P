import axios from 'axios'

const urlBase = 'http://localhost:8080/api/'

export function signup(userEmail, userPassword){
  return axios.post(urlBase + 'users/signup', { email : userEmail, password : userPassword })
}

export function login(userEmail, userPassword){
  return axios.post(urlBase + 'users/login', {email : userEmail, password : userPassword})
}

export function logout(userEmail){
  return axios.post(urlBase + 'users/logout', {email : userEmail})
}

export function initDistrito(userEmail, distrito, cantidadDeEscuelas){
  return axios.post(urlBase + 'locations/initdistrito',
  { email : userEmail ,
    distritoId: distrito,
    escuelas: cantidadDeEscuelas
  })
}

export function initEscuela(userEmail, distrito, escuela, cantidadDeMesas){
  return axios.post(urlBase + 'locations/initescuela',
  { email : userEmail ,
    distritoId: distrito,
    escuelaId: escuela,
    mesas : cantidadDeMesas
  })
}

export function initElection(userEmail, newCandidates){
  return axios.post(urlBase + 'election/initelection',
  {
    email : userEmail,
    candidates : newCandidates
  })
}
