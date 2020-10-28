function Vue (options) {
  this.$options = options
  this.$el = document.querySelector(options.el)
  this.$template = this.$el.innerHTML
  this.$data = options.data
  this.observer(this.$data)
  this.render()
}

Vue.prototype.observer = function (obj) {
  for (let key in obj) {
    let value = obj[key]
    if (typeof value === 'object') {
      this.observer(value)
    } else {
      Object.defineProperty(obj, key, {
        get: () => {
          return value
        },
        set: (newValue) => {
          value = newValue
          console.log(value)
          this.render()
        }
      })
    }
  }
}

Vue.prototype.render = function () {
  this.$el.innerHTML = this.$template.replace(/\{\{\w+\}\}/g, str => {
    console.log(str)
    str = str.substring(2, str.length-2)
    return this.$data[str]
  })
}

const app = new Vue({
  el: '#app',
  data: {
    text: 'Hello world!',
    count: 0
  }
})

console.log(app.$data.text)
setTimeout(() => {
  app.$data.count++
}, 1000)
