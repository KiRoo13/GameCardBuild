export function timer (domElement) {
   let time = {
      second: 20,
      secondMinus: function () {
         return this.second -= 1
      },
   }
   domElement.innerHTML = time.second

   return setInterval(() => {
      domElement.innerHTML = ''
      domElement.innerHTML = time.secondMinus()
      if (time.second === 0) {
         time.second = 20
      }
   }, 1000)
}

