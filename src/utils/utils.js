export function getNames(list){
  return list.map(x => {return x.name})
}

export function filterNoBlanks(list) {
  return list.filter(x => {return x !== ""})
}
