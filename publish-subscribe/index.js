class EventEmitter {
  constructor () {
    this.events = new Map()
  }

  on (eventName, callback) {
    let exist = this.events.has(eventName)
    if (!exist) {
      this.events.set(eventName, [callback])
    } else {
      this.events.get(eventName).push(callback)
    }
  }

  once (eventName, callback) {
    let fn = () => {
      callback()
      this.removeListener(eventName, fn)
    }
    this.on(eventName, fn)
  }

  emit (eventName) {
    let exist = this.events.has(eventName)
    if (!exist) {
      console.log(`${eventName} not exist`)
    } else {
      this.events.get(eventName).forEach(fn => fn())
    }
  }

  removeListener (eventName) {
    let exist = this.events.has(eventName)
    if (!exist) {
      console.log(`${eventName} not exist`)
    } else {
      this.events.delete(eventName)
    }
  }  
}

const em = new EventEmitter()
em.on('test1', () => {
  console.log('test1')
})

em.on('test1', () => {
  console.log('test11')
})

em.on('test2', () => {
  console.log('test2')
})

em.once('test3', () => {
  console.log('test3')
})

em.removeListener('test2')

em.emit('test2')
em.emit('test1')
em.emit('test1')
em.emit('test3')
em.emit('test3')
