let questionText = document.querySelector(".question-text");
let optionA = document.querySelector("label[for='optionA']");
let optionB = document.querySelector("label[for='optionB']");
let optionC = document.querySelector("label[for='optionC']");
let optionD = document.querySelector("label[for='optionD']");
let nextBtn = document.querySelector(".next-btn");
let backBtn = document.querySelector(".back-btn");
let questionNumber = document.querySelector(".question-no");
let score = document.querySelector(".score");
let radioCheck = document.querySelectorAll(".form-check input");
let showError = document.querySelector(".error");
let progressDiv = document.querySelector(".progress-bar");
let allContent = document.querySelector(".content");
let submitPage = document.querySelector(".submit-page");
let showScore = document.querySelector(".show-score");
let restartQuiz = document.querySelector(".restart-quiz");

let questionObjects = [{
    question: "What is the purpose of an 'if' statement in a computer program?",
    optionA: "A. To loop through a list of items a million times automatically",
    optionB: "B. To make decisions and run different code depending on whether a condition is true or false",
    optionC: "C. To shut down the computer operating system immediately",
    optionD: "D. To print an error message when code is compiled",
    answer: "B"
},
{
    question: "What does html stand for?",
    optionA: "A. Hyper Text Markup Language",
    optionB: "B. High Text Machine Language",
    optionC: "C. Hyperlink Text Management",
    optionD: "D. Home Tool Markup Language",
    answer: "A"
},
{
    question: "What does an HTTP status code 404 indicate in web communications?",
    optionA: "A. Internal Server Error - The server encountered an unexpected condition that prevented it from fulfilling the request",
    optionB: "B. Unauthorized - The request requires user authentication credentials",
    optionC: "C. OK-The standard response for successful HTTP requests",
    optionD: "D. Not Found - The server cannot find the requested resource or URL path",
    answer: "D"
},
{
    question: "Within a Central Processing Unit (CPU), which component is responsible for performing arithmetic operations (like addition and subtraction) and logical operations (like AND and OR)?",
    optionA: "A. Control Unit",
    optionB: "B. Arithmetic Logic Unit",
    optionC: "C. L3 Cache Memory",
    optionD: "D. Program Counter",
    answer: "B"
},
{
    question: "What is the primary role of HTML (HyperText Markup Language) in web development?",
    optionA: "A. Styling the visual presentation and layout of a webpage",
    optionB: "B. Managing server-side database transactions and queries",
    optionC: "C. Handling asynchronous client-side user interactions and logic",
    optionD: "D. Defining the structural content and semantic elements of a webpage",
    answer: "D"
},
{
    question: "What is the primary purpose of a loop control structure (like a for or while loop) in programming?",
    optionA: "A. To declare global constants used across multiple files",
    optionB: "B. To conditionally branch program execution based on user input",
    optionC: "C. To handle fatal runtime exceptions safely without crashing",
    optionD: "D. To repeatedly execute a block of code as long as a condition remains true",
    answer: "D"
},
{
    question: "What is the primary purpose of a variable in computer programming?",
    optionA: "A. To speed up the processor clock speed",
    optionB: "B. To connect your code directly to the internet",
    optionC: "C. To store and reference data values in memory",
    optionD: "D. To design the visual layout and colors of a webpage",
    answer: "C"
},
{
    question: "How does RAM (Random Access Memory) differ from long-term storage like an SSD or Hard Drive?",
    optionA: "A. RAM is fast, temporary workspace that clears when the computer turns off, while storage keeps data permanently",
    optionB: "B. RAM stores files forever even without any power supply",
    optionC: "C. Storage is used only for active calculations by the CPU right this second",
    optionD: "D. RAM and storage do the exact same job with identical speeds",
    answer: "A"
},
{
    question: "What is the main function of an IP (Internet Protocol) address on a network?",
    optionA: "A. To protect a computer from computer viruses and malware",
    optionB: "B. To uniquely identify a device so it can send and receive data across a network",
    optionC: "C. To increase the loading speed of a web browser",
    optionD: "D. To convert raw text characters into graphic pictures on a monitor",
    answer: "B"
},
{
    question: "Which of the following is considered a best practice for creating a strong, secure password?",
    optionA: "A. Using your pet's name and birth year so it is easy to recall",
    optionB: "B. Using '123456' because it is simple to type quickly",
    optionC: "C. Using a mix of uppercase and lowercase letters, numbers, and symbols with adequate length",
    optionD: "D. Using the exact same password for every single website you visit",
    answer: "C"
}]

let questionResults = [];
let currentQuestion = 0;
progressBar();

let userAnswer = [];

nextBtn.addEventListener("click", () => {
    let selectedRadio = document.querySelector("input[name='radioDefault']:checked");
    if (!selectedRadio) {
        showError.innerText = "Please select an option!";
        return;
    }

    showError.innerText = "";

    saveAnswerAndUpdateScore(selectedRadio);

    if (currentQuestion < questionObjects.length - 1) {
        currentQuestion++;
        questionNumber.innerText = `Question ${currentQuestion + 1} of ${questionObjects.length}`;
        if (currentQuestion === 9) {
            nextBtn.innerText = "Submit";
        }
        progressBar();
        displayQuestion();
        radioCheck.forEach(radio => {
            radio.checked = false;
        });
        restoreAnswer();
    } else {
        allContent.classList.add("d-none");
        submitPage.classList.remove("d-none");
        showScore.innerText = `Your Score is: ${scoreNumber}/${questionObjects.length}`;
    }
});

backBtn.addEventListener("click", () => {
    if (currentQuestion >= 1) {
        currentQuestion--;
        questionNumber.innerText = `Question ${currentQuestion + 1} of ${questionObjects.length}`;
        restoreAnswer();
        progressBar();
    }
    displayQuestion();
});

function displayQuestion() {
    questionText.innerText = questionObjects[currentQuestion].question;

    optionA.innerText = questionObjects[currentQuestion].optionA;
    optionB.innerText = questionObjects[currentQuestion].optionB;
    optionC.innerText = questionObjects[currentQuestion].optionC;
    optionD.innerText = questionObjects[currentQuestion].optionD;
}

console.log(questionObjects)

let scoreNumber = 0;

function saveAnswerAndUpdateScore(selectedRadio) {
    userAnswer[currentQuestion] = selectedRadio.value;

    let answerBoolean = selectedRadio.value === questionObjects[currentQuestion].answer;
    questionResults[currentQuestion] = answerBoolean;

    scoreNumber = questionResults.filter(result => result === true).length;

    score.innerText = `Score: ${scoreNumber}/${questionObjects.length}`
    console.log(scoreNumber);
}

function progressBar() {
    progressDiv.innerText = `${(currentQuestion + 1) / questionObjects.length * 100}%`;
    progressDiv.style.width = `${(currentQuestion + 1) / questionObjects.length * 100}%`;
}

function restoreAnswer() {
    radioCheck.forEach(radio => {
        radio.checked = radio.value === userAnswer[currentQuestion];
    });
}

restartQuiz.addEventListener("click", () => {
    currentQuestion = 0;
    questionResults = [];
    userAnswer = [];
    scoreNumber = 0;

    submitPage.classList.add("d-none");
    allContent.classList.remove("d-none");

    nextBtn.innerText = "Next";
    score.innerText = `Score: 0/${questionObjects.length}`;
    questionNumber.innerText = `Question 1 of ${questionObjects.length}`;
    showError.innerText = "";
    radioCheck.forEach(radio => {
        radio.checked = false;
    });

    progressBar();

    displayQuestion();
});

window.addEventListener("DOMContentLoaded", () => {
    displayQuestion();
});