function MyPromise (callback) {
  this.status = 'pending'
  this.value = null
  this.onResolvedCallbacks = []
  this.reason = null
  this.onRejectedCallbacks = []

  const resolve = (value) => {
    console.log('resolve do')
    if (this.status === 'pending') {
      this.status = 'fullFilled'
      this.value = value
      this.onResolvedCallbacks.forEach(fn => fn())
    }
  }

  const reject = (reason) => {
    if (this.status === 'pending') {
      this.status = 'rejected'
      this.reason = reason
      this.onRejectedCallbacks.forEach(fn => fn())
    }
  }

  try {
    callback(resolve, reject)
  } catch (err) {
    reject(err)
  }
}

MyPromise.prototype.then = function (onFullFilled, onRejected) {
  if (this.status === 'fullFilled') {
    onFullFilled(this.value)
  }
  if (this.status === 'rejected') {
    onRejected(this.reason)
  }
  if (this.status === 'pending') {
    console.log('async do')
    this.onResolvedCallbacks.push(() => {
      onFullFilled(this.value)
    })
    this.onRejectedCallbacks.push(() => {
      onRejected(this.reason)
    })
  }
}

let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1500)
  // resolve('success')
  // throw new Error('123')  
})

console.log(p)

p.then(res => {
  console.log(res)
}, err => {
  console.log(err)
})
