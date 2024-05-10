// Question Constructor
function Question(question, options, correct_answer) {
    this.question = question
    this.options = options
    this.correct_answer = correct_answer
}

// Question.prototype.checkAnswer
Question.prototype.checkAnswer = function (givenAnswer) {
    return this.correct_answer === givenAnswer
}

// Quiz Constructor
function Quiz(questions) {
    this.score = 0
    this.questionIndex = 0
    this.questions = questions
}

// Quiz.prototype.isFinished
Quiz.prototype.isFinished = function () {
    return this.questionIndex === this.questions.length
}

// Quiz.prototype.getQuestion
Quiz.prototype.getQuestion = function () {
    return this.questions[this.questionIndex]
}

// Quiz.prototype.answeringQuestion
Quiz.prototype.answeringQuestion = function (givenAnswer) {
    var question = this.getQuestion()

    if (question.checkAnswer(givenAnswer)) {
        this.score++
    }
    this.questionIndex++
}

// List of Questions (5 Questions)
var questions = [
    {
        "question": "What is the capital of France?",
        "options": ["London", "Paris", "Berlin", "Rome"],
        "correct_answer": "Paris"
    },
    {
        "question": "What is the capital of Japan?",
        "options": ["Tokyo", "Beijing", "Seoul", "Bangkok"],
        "correct_answer": "Tokyo"
    },
    {
        "question": "What is the capital of Australia?",
        "options": ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        "correct_answer": "Canberra"
    },
    {
        "question": "What is the capital of Brazil?",
        "options": ["Rio de Janeiro", "Brasília", "São Paulo", "Salvador"],
        "correct_answer": "Brasília"
    },
    {
        "question": "What is the capital of Egypt?",
        "options": ["Cairo", "Alexandria", "Luxor", "Giza"],
        "correct_answer": "Cairo"
    }
]

// Constructing new Questions
for (let i = 0; i < questions.length; i++) {
    questions[i] = new Question(questions[i].question, questions[i].options, questions[i].correct_answer)
}

// Beginning a New Quiz
var myQuiz = new Quiz(questions)
loadQuestion()

function loadQuestion() {
    if (myQuiz.isFinished()) {
        showRestart()
        showAnswers()
    }
    else {
        var question = myQuiz.getQuestion()
        var options = question.options

        // displaying question
        document.getElementById("question_area").innerHTML = ""

        var quizText = document.createElement("p")
        quizText.textContent = question.question

        var questionNumber = document.createElement("p")
        questionNumber.textContent = `Question: ${myQuiz.questionIndex + 1}/${myQuiz.questions.length}`

        document.getElementById("question_area").appendChild(questionNumber).appendChild(quizText)

        // displaying option buttons
        document.getElementById("options_area").innerHTML = ""
        for (let i = 0; i < options.length; i++) {

            var btn = document.createElement("button")
            btn.classList = "btn btn-primary"
            btn.setAttribute("id", "btn_" + i)

            var btnText = document.createElement("span")
            btnText.setAttribute("id", "opt_" + i)
            btnText.innerHTML = question.options[i]

            document.getElementById("options_area").appendChild(btn).appendChild(btnText)
            btnClick("btn_" + i, options[i])
        }

        // displaying restart quiz button
        showRestart()
    }
}


function btnClick(btnId, option) {
    var btn = document.getElementById(btnId)
    btn.onclick = function () {
        myQuiz.answeringQuestion(option)
        showScore()
        loadQuestion()
    }
}

function showScore() {
    document.getElementById("card_footer").textContent = "Correct Answers: " + myQuiz.score
}

function showRestart() {
    // quiz complete phase
    if (myQuiz.questionIndex === myQuiz.questions.length) {
        document.getElementById("question_area").innerHTML = ""
        document.getElementById("options_area").innerHTML = ""
    }

    var restartBtn = document.createElement("button")
    restartBtn.classList = "btn btn-warning mt-3"
    restartBtn.textContent = "Restart Quiz"
    restartBtn.setAttribute("id", "restartBtn")

    var restartSection = document.getElementById("showRestart")
    restartSection.innerHTML = ""
    restartSection.appendChild(restartBtn)

    restartBtn.onclick = function () {
        myQuiz.questionIndex = 0
        myQuiz.score = 0
        loadQuestion()
        document.getElementById("showAnswers").innerHTML = ""
        document.getElementById("card_footer").innerHTML = "Number of correct answers will be shown here after you start."
    }
}

function showAnswers() {
    var answersBtn = document.createElement("button")
    answersBtn.className = "btn btn-success mt-3"
    answersBtn.textContent = "Show Answers"
    answersBtn.setAttribute("id", "answerBtn")

    var answerSection = document.getElementById("showAnswers")
    answerSection.appendChild(answersBtn)

    answersBtn.onclick = function () {
        answerSection.innerHTML = ""
        for (let i = 0; i < myQuiz.questions.length; i++) {

            var answerList = document.createElement("ul")
            answerList.className = "list-group mt-3"

            var question = document.createElement("li")
            question.className = "list-group-item"

            var correctAnswer = document.createElement("p")

            question.textContent = myQuiz.questions[i].question
            correctAnswer.textContent = myQuiz.questions[i].correct_answer

            answerSection.appendChild(answerList).appendChild(question).appendChild(correctAnswer)
        }
    }
}