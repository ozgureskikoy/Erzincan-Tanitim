const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Tekrar Oynamak İçin Tıkla'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Erzincanın kurtuluşu ne zamandır?',
    answers: [
      { text: '15 Haziran 1935', correct: false },
      { text: '13 Şubat 1918', correct: true },
      { text: '28 Aralık 1923', correct: false },
      { text: '13 Şubat 1919', correct: false }
    ]
  },
  {
    question: 'Erzincan kaç ilçeden oluşur?',
    answers: [
      { text: '22', correct: false },
      { text: '15', correct: false },
      { text: '9', correct: true },
      { text: '24', correct: false }
    ]
  },
  {
    question: 'Hangisi Erzincanın ilçelerinden biridir?',
    answers: [
      { text: 'Kurtköy', correct: false },
      { text: 'Kartal', correct: false },
      { text: 'Çayırlı', correct: true },
      { text: 'Suşehri', correct: false }
    ]
  },
  {
    question: 'Erzincan ın plaka kodu kaçtır?',
    answers: [
      { text: '41', correct: false },
      { text: '82', correct: false },
      { text: '34', correct: false },
      { text: '24', correct: true }
    ]
  },
  {
    question: 'Erzincan hangi bölgededir?',
    answers: [
      { text: 'Karadeniz', correct: false },
      { text: 'Doğu Anadolu', correct: true },
      { text: 'Marmara', correct: false },
      { text: 'Ege', correct: false }
    ]
  }
]