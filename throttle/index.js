function throttle (fn, delay) {
  let timer = null
  return function () {
    let args = arguments
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, delay)
    }
  }
}

const inputEl = document.getElementById('test')
const inputDo = (e) => { console.log(e.target.value) }
inputEl.addEventListener('input', throttle(inputDo, 500))
