export function getNames(list){
  return list.map(x => {return x.name})
}

export function filterNoBlanks(list) {
  return list.filter(x => {return x !== ""})
}

export function alertConfig() {
  return {
    offset: 14,
    position: 'top left',
    theme: 'dark',
    time: 5000,
    transition: 'fade'
  }
}

export function showSuccess( ref , text) {
  ref.show(text, {
    time: 3000,
    type: 'success'
  })
}

export function showError( ref , text) {
  ref.show(text, {
    time: 3000,
    type: 'error'
  })
}

export function showInfo( ref , text) {
  ref.show(text, {
    time: 3000,
    type: 'info'
  })
}

export function showWithRedirect( ref, text, path, context) {
  ref.show(text, {
    time: 3000,
    type: 'info'
  })
}