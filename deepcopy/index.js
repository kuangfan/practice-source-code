function deepCopy (obj) {
  let newObj = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        newObj[key] = deepCopy(obj[key])
      } else {
        newObj[key] = obj[key]
      }
    }      
  }
  return newObj
}

let a = {
  x: {
    m: 1,
    n: 2
  },
  y: 3
}
let b = deepCopy(a)
a.x.m = 2
a.y = 4
console.log(a)
console.log(b)
