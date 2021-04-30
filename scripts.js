const content = [
   'https://evmhistory.ru/images/programming/javascript_1.jpg',
   'https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBU0_iqifNKJzAbIMhPEQ2LY0zRo1PeWYNxQ&usqp=CAU',
]

const slider = document.querySelector('.slider')

//build page
const list = slider.querySelector('.list')
const dots0 = slider.querySelector('.dots')

content.forEach(src => {
   list.innerHTML += `<li class='item'><img class='img' src='${src}'></li>`
   dots0.innerHTML += `<li class='dot'></li>`
})

//slider functions
const cb = slider.querySelector('.toggle-button')
const items = list.querySelectorAll('.item')
const dots = dots0.querySelectorAll('.dot')

let index = 0
dots[index].classList.toggle('dot__active')
dots.forEach((dot, i) => {
   dot.addEventListener('click', function () {
      setSlide(i)
   })
})

function nextIndex(n, len) {
   n++
   return (n < len) ? n : 0
}
function prevIndex(n, len) {
   n--
   return (n < 0) ? (len - 1) : n
}

function next() {
   setSlide(nextIndex(index, dots.length))
}
function prev() {
   setSlide(prevIndex(index, dots.length))
}

function setSlide(n) {
   dots[index].classList.remove('dot__active')
   index = n
   list.style.transform = `translateX(-${index * list.clientWidth}px)`
   dots[index].classList.add('dot__active')
}


//init
document.onkeydown = function (event) {
   var key = event.key
   if (key == 'ArrowLeft') {
      prev()
   } else if (key == 'ArrowRight') {
      next()
   }
}

//toggle btn
let id
function cbClick() {
   if (cb.checked) {
      if (id == null)
         id = setInterval(next, 5000)
   } else {
      clearInterval(id)
      id = null
   }
   localStorage.setItem('auto', cb.checked)
}

let flag = localStorage.getItem('auto')
cb.checked = (flag == null) || (flag == 'true')
cb.addEventListener('click', cbClick)
cbClick()