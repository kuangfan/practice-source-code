function debounce (fn, delay) {
  let timer = null
  return function () {
    let args = arguments
    console.log(args, this)
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

const inputEl = document.getElementById('test')
const inputDo = (e) => { console.log(e.target.value) }
inputEl.addEventListener('input', debounce(inputDo, 500))
