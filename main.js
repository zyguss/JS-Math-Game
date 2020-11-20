const problemElement = document.querySelector('.problem');
const ourForm = document.querySelector('.our-form');
const ourField = document.querySelector('.our-field');
const pointsNeeded = document.querySelector('.points-needed')
const mistakesAllowed = document.querySelector('.mistakes-allowed')
const progressBar = document.querySelector('.progress-inner')
const endMessage = document.querySelector('.end-message')
const resetButton = document.querySelector('.reset-button')

let state = {
  score: 0,
  wrongAnswers: 0
}

function updateProblem(){
  state.curentProblem = generateProblem();
  problemElement.innerHTML = `${state.curentProblem.numberOne} ${state.curentProblem.operator} ${state.curentProblem.numberTwo}`
  ourField.value = ""
  ourField.focus()
}

updateProblem();

function generateNumber(max){
  return Math.floor(Math.random() * (max + 1) );
}

function generateProblem(){
  return {
    numberOne: generateNumber(10),
    numberTwo: generateNumber(10),
    operator: ['+', '-', 'x'][generateNumber(2)]
  }
}

// ne mora uopste ;
ourForm.addEventListener('submit', e => {
  e.preventDefault()
  let correctAnswer
  const p = state.curentProblem
  if (p.operator == '+') correctAnswer = p.numberOne + p.numberTwo
  if (p.operator == '-') correctAnswer = p.numberOne - p.numberTwo
  if (p.operator == 'x') correctAnswer = p.numberOne * p.numberTwo

  if (parseInt(ourField.value, 10) == correctAnswer) {
    state.score++
    pointsNeeded.textContent = 10 - state.score // linija 4. ubacujemo u html
    updateProblem()
    renderProgressBar()
  } else {
    state.wrongAnswers++
    mistakesAllowed.textContent = 2 - state.wrongAnswers
    problemElement.classList.add('animate-wrong')
    setTimeout(() => problemElement.classList.remove('animate-wrong'), 331)
  }
  checkLogic()
});

function checkLogic() {
  // if you won
  if (state.score === 10) {
    endMessage.textContent = 'Congrats, you won!'
    document.body.classList.add("overlay-is-open")
    setTimeout(() => resetButton.focus() ,331)
  }
  // if you lost
  if (state.wrongAnswers === 3) {
    endMessage.textContent = 'You lose'
    document.body.classList.add("overlay-is-open")
    setTimeout(() => resetButton.focus() ,331)  
  }
}

resetButton.addEventListener("click", resetGame)

function resetGame() {
  document.body.classList.remove("overlay-is-open")
  updateProblem()
  state.score = 0
  state.wrongAnswers = 0
  pointsNeeded.textContent = 10
  mistakesAllowed.textContent = 2
  renderProgressBar()
}

function renderProgressBar() {
  progressBar.style.transform = `scaleX(${state.score / 10})`
}


// function handleSubmit(e){
//   e.preventDefault();
// }