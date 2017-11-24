export function clean(cookie){
  cookie.remove("current_user_email")
  cookie.remove("current_user_address")
  cookie.remove("current_user_category")
  cookie.remove("current_user_distrito")
  cookie.remove("current_user_escuela")
  cookie.remove("current_user_mesa")
}

export function cleanElection(cookie){
  cookie.remove("current_user_election_created")
}
//////////////////////////////////////////////////////////////
//      GETTERS
//////////////////////////////////////////////////////////////
export function getUser(cookie) {
  return {
    "email" : cookie.load("current_user_email"),
    "address" : cookie.load("current_user_address"),
    "category" : cookie.load("current_user_category"),
    "distrito" : cookie.load("current_user_distrito"),
    "escuela" : cookie.load("current_user_escuela"),
    "mesa" : cookie.load("current_user_mesa")
  }
}
export function getAddress(cookie) {
    return cookie.load("current_user_address")
}
export function getEmail(cookie){
  return cookie.load("current_user_email")
}
export function getDistrito(cookie){
  return cookie.load("current_user_distrito")
}
export function getEscuela(cookie){
  return cookie.load("current_user_escuela")
}
export function getMesa(cookie){
  return cookie.load("current_user_mesa")
}
//////////////////////////////////////////////////////////////
//      QUERIES
//////////////////////////////////////////////////////////////
export function isLogged(cookie){
  return cookie.load("current_user_address") !== undefined
}
export function isAutoridadElectoral(cookie){
  return cookie.load("current_user_category") === '0'
}
export function isDelegadoDeDistrito(cookie){
  return cookie.load("current_user_category") === '1'
}

export function isDelegadoDeEscuela(cookie){
  return cookie.load("current_user_category") === '2'
}
export function isApoderadoDePartido(cookie){
  return cookie.load("current_user_category") === '3'
}
export function isPresidenteDeMesa(cookie){
  return cookie.load("current_user_category") === '4'
}
export function isFiscalDeMesa(cookie){
  return cookie.load("current_user_category") === '6'
}
export function getElectionCreated(cookie){
  return cookie.load("current_user_election_created")
}

export function setElectionCreated(cookie, value){
  cookie.save("current_user_election_created", value, {path : "/"})
}

export function isElectionActive(cookie){
  return getElectionCreated(cookie)
}

export function canLoadMesaUser(cookie){
  return isPresidenteDeMesa(cookie) || isFiscalDeMesa(cookie)
}
//////////////////////////////////////////////////////////////
//      SETTERS
//////////////////////////////////////////////////////////////
export function setUser(cookie, user){
  setAddress(cookie, user.address)
  setEmail(cookie, user.email)
  setCategory(cookie, user.category)
  setDistrito(cookie, user.distrito)
  setEscuela(cookie, user.escuela)
  setMesa(cookie, user.mesa)
}
export function setAddress(cookie, new_address) {
  cookie.save("current_user_address", new_address, {path : "/"})
}
export function setEmail(cookie, email){
  cookie.save("current_user_email", email, {path : "/"})
}
export function setCategory(cookie, category){
  cookie.save("current_user_category", category, {path : "/"})
}
export function setDistrito(cookie, idDistrito){
  cookie.save("current_user_distrito", idDistrito, {path : "/"})
}
export function setEscuela(cookie, idEscuela){
  cookie.save("current_user_escuela", idEscuela, {path : "/"})
}
export function setMesa(cookie, idMesa){
  cookie.save("current_user_mesa", idMesa, {path : "/"})
}
export function identifyRol(cookie) {
  switch (cookie.load("current_user_category")) {
    case "0":
      return "red"
    case "1":
      return "orange"
    case "2":
      return "yellow"
    case "3":
      return "green"
    case "4":
      return "blue"
    case "5":
      return "purple"
    case "6":
      return "brown"
    default:
      return "grey"
  }
}
//ya no tiene las tareas de crear distritos/escuelas/mesas/completar
/*
{name: "Crear distrito", url: "/distrito"},
{name: "Crear escuela", url: "/escuela"},
{name: "Completar datos de una mesa", url: "/completarmesa"}
*/
export function getTasks(cookie){
  switch (cookie.load("current_user_category")){
    case "0":
      return {
          name : "Tareas de la Autoridad electoral",
          role : "Autoridad Electoral",
          all : [
            {name: "Asignar apoderado de partido", url: "/asignarapoderado"},
            {name: "Asignar delegado de distrito", url: "/asignardelegadodistrito"}
          ]
      }
    case "1":
      return {
          name : "Tareas del Delegado de distrito",
          role : "Delegado de distrito",
          all : [{name: "Asignar delegado de escuela", url: "/asignardelegadoescuela"}]
      }
    case "2":
      return {
          name : "Tareas del Delegado de escuela",
          role : "Delegado de escuela",
          all : [{name: "Asignar presidente de mesa", url: "/asignarpresidente"},
                {name: "Asignar vicepresidente de mesa", url: "/asignarvicepresidente"}]
      }
    case "3":
      return {
        name : "Tareas del Apoderado de partido",
        role : "Apoderado de partido",
        all : [{name: "Asignar fiscal de mesa", url: "/asignarfiscal"}]
      }
    case "4":
      return {
        name : "Tareas del Presidente de mesa",
        role : "Presidente de mesa",
        all : [{name: "Registrar votos", url: "/cargar"}]
      }
    case "5":
      return {
        name : "Tareas del Vicepresidente de mesa",
        role : "Vicepresidente de mesa",
        all : [{name: "Registrar votos", url: "/cargar"}]
      }
    case "6":
      return {
        name : "Tareas del Fiscal de mesa",
        role : "Fiscal de mesa",
        all : [{name: "Registrar votos", url: "/cargar"}]
      }
    default:
      return {
          name : "No tienes tareas asignadas",
          role : "Usuario",
          all : [{name: "Volver a Inicio", url: "/"}]
      }
  }
}
