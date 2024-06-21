import { timer } from "./timer.js"

// Переменные
const arrImg = ['./img/1.webp','./img/2.webp','./img/3.webp','./img/4.webp']
const cardsContainer = document.querySelector('.cards')
const domTime = document.querySelector('.head__timer')
const gameOverMask = document.querySelector('.game-over')


const intervalId = timer(domTime)

// Создание стартового массива для рендера
function getStartedArr (arr) {
   return [...arr, ...arr].sort(() => Math.random() - 0.5)
}
// Массив для рендера
let renderArr = getStartedArr(arrImg)

// Рендер карточек на страницу
function renderCard () {
   renderArr.forEach((src, ind) => {
      cardsContainer.innerHTML += `
      <div id=${ind + 1} class="card">
      <div class="card__front">
         <img class="front-img" src=${src} alt=${ind}>
      </div>
      <div class="card__back">
         <img id=${ind + 1} class="back-img" src="./img/back.png" data-src=${src} alt="">
      </div>
      </div>
      `
   })

  // Обработка клика по картам
      document.querySelectorAll('.card')
      .forEach((cardItem) => cardItem.addEventListener('click', clickCard))
}
renderCard()

// Массив совпадений
let arrСoincidence = []
// Массив id карточек
let arrId = []

// Добавление 2 карточек в массив совпадений
function clickCard (e) {
   const currentCard = e.target
   const currentSrc = currentCard.dataset.src
   const idCard = Number(currentCard.id)
   const frontItem = currentCard.parentNode.parentNode.querySelector('.card__front')
   const backItem = currentCard.parentNode



   addClass(frontItem, backItem)

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
   for (let i = 0; i < array.length; i++) {
      if (array[i] == array[i + 1]){
            result = array[i]
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
   if (arr.length === 0) {
      confirm('Вы выиграли! Начать заново?') 
      ? reload() 
      : clearInterval(intervalId)
   }
}

// Игра проиграна
function gameOver () {
   setInterval(() => {
      if (Number(domTime.innerHTML) === 0) {
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