export function getNames(list){
  return list.map(x => {return x.name})
}

export function filterNoBlanks(list) {
  return list.filter(x => {return x !== ""})
}

export function alertConfig() {
  return {
    offset: 14,
    position: 'top right',
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

export function showSuccessWithRedirect( ref, text, fun) {
  ref.show(text, {
    time: 1000,
    type: 'success',
    onClose : fun
  })
}

export function showError( ref , text) {
  ref.show(text, {
    time: 3000,
    type: 'error'
  })
}

export function showErrorWithRedirect( ref , text, fun) {
  ref.show(text, {
    time: 1000,
    type: 'error',
    onClose : fun
  })
}

export function showInfo( ref , text) {
  ref.show(text, {
    time: 3000,
    type: 'info'
  })
}

export function getBackground(cantidad){
  return getBackgroundColors().slice(0, cantidad-1)
}
export function getBorder(cantidad){
  return getBorderColors().slice(0, cantidad-1)
}

function getBackgroundColors(){
  return [
    'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 0, 0, 0.79)',
    'rgba(46, 223, 188, 0.5)', 'rgba(58, 46, 223, 0.96)', 'rgba(46, 223, 61, 0.96)',
    'rgba(255, 255, 50, 0.93)', 'rgba(245, 245, 245, 0.96)', 'rgba(128, 128, 128, 0.79)']
}

function getBorderColors(){
  return [
    'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 0, 0, 1)',
    'rgba(46, 223, 188, 1)', 'rgba(58, 46, 223, 1)', 'rgba(46, 223, 61, 1)',
    'rgba(255, 255, 50, 1)', 'rgba(245, 245, 245, 1)', 'rgba(128, 128, 128, 1)']
}



export function parseBytes32FromSolidity( listOfStrings ) {
  var parsedCandidates = listOfStrings.map( element => {
    var pos = element.indexOf("\u0000")
    return element.slice(0,pos)
  })
  return parsedCandidates
}