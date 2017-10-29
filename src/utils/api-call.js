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
