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

export function isCreated() {
  return axios.get(urlBase + "election/initialized")
}