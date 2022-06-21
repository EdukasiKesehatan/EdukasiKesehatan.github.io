//inisiasi soal dalam quiz
const questions = [
    {
        question: "Rumah Adat Di Jawa Tengah Adalah?",
        optionA: "Joglo",
        optionB: "Bolon",
        optionC: "Gadang",
        optionD: "Limas",
        correctOption: "optionA"
    },

    {
        question: "Puncak Tertinggi Di Indonesia Adalah?",
        optionA: "Puncak Mandala",
        optionB: "Puncak Trikora",
        optionC: "Puncak Jaya",
        optionD: "Gunung Rinjadi",
        correctOption: "optionC"
    },

    {
        question: "Binatang Khas Indonesia dan hanya ada di indonesia adalah?",
        optionA: "Komodo",
        optionB: "Gajah",
        optionC: "Harimau",
        optionD: "Kucing",
        correctOption: "optionA"
    },

    {
        question: "Nama Bandar Udara Di Kota Semarang Adalah?",
        optionA: "Soekarno-Hatta",
        optionB: "Juanda",
        optionC: "Ngurah Rai",
        optionD: "Ahmad Yani",
        correctOption: "optionD"
    },

    {
        question: "Negara Yang Berbatasan Dengan Indonesia Di bagian Selatan Adalah?",
        optionA: "Australia",
        optionB: "Timor Leste",
        optionC: "Jepang",
        optionD: "Korea",
        correctOption: "optionA"
    },

    {
        question: "Laut Terluas Di Indonesia Adalah?",
        optionA: "Laut Sawu",
        optionB: "Samudera Pasifik",
        optionC: "Laut Seram",
        optionD: "Laut Timor",
        correctOption: "optionB"
    },

    {
        question: "Dibawah ini adalah negara yang mata uangnya adalah dollar, kecuali?",
        optionA: "Guam",
        optionB: "Ekuador",
        optionC: "Amerika Serikat",
        optionD: "Malaysia",
        correctOption: "optionD"
    },

    {
        question: "Dibawah Ini Nama Bulan Penanggalan Masehi Yang Jumlah Harinya Paling Sedikit Adalah?",
        optionA: "Februari",
        optionB: "Juni",
        optionC: "Agustus",
        optionD: "Mei",
        correctOption: "optionA"
    },

    {
        question: "Nama Pahlawan Indonesia Yang Digunakan Dalam Pecahan Mata Uang Rp.5000 Adalah?",
        optionA: "Cut Meutia",
        optionB: "Sam Ratulangi",
        optionC: "Imam Bonjol",
        optionD: "Idham Chalid",
        correctOption: "optionC"
    },

    {
        question: "Bulan Pertama Dalam Penanggalan Hijriah Adalah",
        optionA: "Syaban",
        optionB: "Rabiul Awal",
        optionC: "Rabiul Akhir",
        optionD: "Muharam",
        correctOption: "optionD"
    }

   

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Anda Menjawab Pertanyaan Dengan Kurang Baik"
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Anda Menjawab Pertanyaan Dengan Baik"
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Bagus!,Anda Menjawab Pertanyaan Dengan Sangat Baik"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}