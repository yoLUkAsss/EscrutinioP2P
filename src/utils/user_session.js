export function get_current_user() {
    return {
        "email" : this.email,
        "category" : this.category
    }
}

export function clean(cookie){
  cookie.remove("current_user_email")
  cookie.remove("current_user_address")
  cookie.remove("current_user_category")
}

export function getCookies(cookie) {
  return {
    "email" : cookie.load("current_user_email"),
    "address" : cookie.load("current_user_address"),
    "category" : cookie.load("current_user_category")
  }
}

export function getAddress(cookie) {
    return cookie.load("current_user_address")
}

export function getEmail(cookie){
  return cookie.load("current_user_email")
}

export function setCategory(cookie, category){
  cookie.save("current_user_category", category, {path : "/"})
}

export function setEmail(cookie, email){
  cookie.save("current_user_email", email, {path : "/"})
}

export function setAddress(cookie, new_address) {
  cookie.save("current_user_address", new_address, {path : "/"})
}

export function isLogged(cookie){
  return cookie.load("current_user_address") !== undefined
}

export function isAutoridadElectoral(cookie){
  return cookie.load("current_user_category") === '0'
}

export function isApoderadoDePartido(cookie){
  return cookie.load("current_user_category") === '3'
}

export function isDelegadoDeDistrito(cookie){
  return cookie.load("current_user_category") === '1'
}

export function isDelegadoDeEscuela(cookie){
  return cookie.load("current_user_category") === '2'
}

export function isPresidenteDeMesa(cookie){
  return cookie.load("current_user_category") === '4'
}

export function isFiscalDeMesa(cookie){
  return cookie.load("current_user_category") === '6'
}

export function canLoadMesaUser(cookie){
  return isPresidenteDeMesa(cookie) || isFiscalDeMesa(cookie)
}
