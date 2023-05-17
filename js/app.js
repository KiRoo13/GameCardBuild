import timer from "./timer.js"

// Переменные
let arrImg = ['./img/1.webp','./img/2.webp','./img/3.webp','./img/4.webp']
let cardsContainer = document.querySelector('.cards')
let domTime = document.querySelector('.head__timer')
let gameOverMask = document.querySelector('.game-over')

let intervalId = timer(domTime)

// Создание стартового массива для рендера
function getStartedArr (arr) {
   let newArr = [...arr, ...arr]
   return newArr.sort(() => Math.random() - 0.5);
}
// Массив для рендера
let renderArr = getStartedArr(arrImg)

// Рендер карточек на страницу
function renderCard (arr) {
   for (let i = 0; i < arr.length; i++) {
      cardsContainer.innerHTML += `
      <div id=${i + 1} class="card">
      <div class="card__front">
         <img class="front-img" src=${arr[i]} alt=${i + 1}>
      </div>
      <div class="card__back">
         <img class="back-img" src="./img/back.png" alt="">
      </div>
      </div>
      `
  }
  // Обработка клика по картам
  let card = document.querySelectorAll('.card')
      card.forEach((cardItem) => cardItem.addEventListener('click', clickCard))
}
renderCard(renderArr)

// Массив совпадений
let arrСoincidence = []
// Массив id карточек
let arrId = []

// Добавление 2 карточек в массив совпадений
function clickCard (e) {
   let currentSrc = e.target.parentNode.parentNode.querySelector('.front-img').getAttribute('src')
   let idCard = Number(e.target.parentNode.parentNode.id)
   let front = e.target.parentNode.parentNode.querySelector('.card__front')
   let back = e.target.parentNode

   addClass(front, back)

   arrСoincidence.push(currentSrc)
   arrId.push(idCard)

   for (let i = 0; i < arrСoincidence.length - 1; i++) {
      if (arrСoincidence.length == 2 && arrId.length == 2 && arrId[i] != arrId[i + 1]) {
         checkValue(arrСoincidence)
         arrСoincidence = []
         arrId = []
      } else {
         arrСoincidence = []
         arrId = []
         document.querySelectorAll('.card__front').forEach((el) => el.classList.remove('front-revers'))
         document.querySelectorAll('.card__front').forEach((el) => el.classList.remove('back-revers'))
         document.querySelectorAll('.card__back').forEach((el) => el.classList.remove('back-revers'))
      }
   }
}
// Добавляет классы анимации
function addClass (front, back) {
   front.classList.add('front-revers')
   back.classList.add('back-revers')
}

// Удаление карточек, при совпадении и возврат при не совпадении
function checkValue(array) {
   let result = ''
   for (let index = 0; index < array.length; index++) {
      if (array[index] == array[index + 1]){
            result = array[index]
      } else {
         setTimeout(() => {
            document.querySelectorAll('.card__front').forEach((el) => el.classList.remove('front-revers'))
            document.querySelectorAll('.card__back').forEach((el) => el.classList.remove('back-revers'))
         }, 500)
      }
   }
   if (result) {
      // Для работы анимации
      setTimeout(() => {
         renderArr = renderArr.filter((el) => el !== result)
         cardsContainer.innerHTML = ''
         renderCard(renderArr)
         gemeVictory(renderArr)
      }, 500)
   }
}

// Игра выиграна
function gemeVictory (arr) {
   if (arr.length == 0) {
      if(confirm('Вы выиграли! Начать заново?')) {
         reload()
      } else {
         clearInterval(intervalId)
      }
   }
}

// Игра проиграна
function gameOver () {
   setInterval(() => {
      if (Number(domTime.innerHTML) == 0) {
          if(confirm('Вы не успели! Начать заново ?')) {
            reload()
          } else {
            clearInterval(intervalId)
            domTime.innerHTML = 20
            gameOverMask.classList.add('game-over_active')
          }
      }
   }, 1000);
}
gameOver()

gameOverMask.addEventListener('click', backGame)

function backGame (e) {
   e.target.classList.remove('game-over_active')
   reload()
}

// Перезагрузка страницы
function reload() {
   document.location.reload()
}