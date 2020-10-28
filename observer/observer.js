function Subject () {
  this.observers = []
}

Subject.prototype = {
  add: function (ob) {
    this.observers.push(ob)
  },
  remove: function (ob) {
    let i = this.observers.indexOf(ob)
    this.observers.splice(i, 1)
  },
  notify: function () {
    this.observers.forEach(item => item.update())
  }
}

function Observer (name) {
  this.name = name
}

Observer.prototype = {
  update: function () {
    console.log(`my name is ${this.name}`)
  }
}

const sub = new Subject()
const ob1 = new Observer('ob1')
const ob2 = new Observer('ob2')
const ob3 = new Observer('ob3')

sub.add(ob1)
sub.add(ob2)
sub.add(ob3)
sub.remove(ob2)
sub.notify()
