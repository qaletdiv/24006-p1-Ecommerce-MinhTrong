const timerElement = document.getElementById("time");
const questionElement = document.querySelector(".quiz__question");
const optionsContainer = document.querySelector(".quiz__options");
const prevButton = document.querySelector(".quiz__button--prev")
const nextButton = document.querySelector(".quiz__button--next");
const questionCounter = document.querySelector(".quiz__counter");
const progressBar = document.querySelector(".quiz__progress-bar");


let timeInSeconds = 30 * 60;
let currentQuestionIndex = 0;
let selectedAnswered = {};

const questions = [
    {
        question: "Câu 1: HTML là viết tắt của cụm từ nào?",
        options: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "Hyperlink and Text Markup Language",
            "Home Tool Markup Language"
        ],
        correctAnswerIndex: 0,
    },
    {
        question: "Câu 2: Thuộc tính nào dùng để chỉ định nguồn hình ảnh trong thẻ <img>?",
        options: [
            "src",
            "href",
            "alt",
            "link",
        ],
        correctAnswerIndex: 0,
    },
    {
        question: "Câu 3: Thuộc tính nào dùng để cung cấp mô tả văn bản thay thế cho hình ảnh?",
        options: [
            "alt",
            "title",
            "description",
            "caption",
        ],
        correctAnswerIndex: 0,
    },
    {
        question: "Câu 4: CSS là viết tắt của cụm từ nào?",
        options: [
            "Computer Style Sheets",
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correctAnswerIndex: 2,
    },
    {
        question: "Câu 5: Thuộc tính CSS nào dùng để thay đổi màu chữ?",
        options: [
            "text-color",
            "font-color",
            "color",
            "text-style"
        ],
        correctAnswerIndex: 2,
    },
]

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        submitQuiz();
    }
});
prevButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
});

const timerInterval = setInterval(() => {
    if (timeInSeconds <= 0) {
        clearInterval(timerInterval);
        alert("Thời gian đã hết! Bài kiểm tra sẽ tự động nộp.");
        submitQuiz(); // Gọi hàm submitQuiz để nộp bài kiểm tra
    } else {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
        timeInSeconds--;
    }
}, 1000)

optionsContainer.addEventListener('change', (event) => {
    if (event.target.matches(`input[type="radio"]`)) {
        selectedAnswered[currentQuestionIndex] = parseInt(event.target.value);
    }
})

function submitQuiz() {
    const popup = document.getElementById("popup");
    const popupButton = document.querySelector(".popup-btn");

    clearInterval(timerInterval);

    popup.classList.add("popup-open");

    popupButton.addEventListener("click", () => {
        popup.classList.remove("popup-open");
        showAnswer(currentQuestionIndex);
    })
}

function showQuestion(index) {
    const currentQuestion = questions[index];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = ''; // Xóa các lựa chọn cũ
    currentQuestion.options.forEach((option, i) => {
        const label = document.createElement('label');
        label.className = 'quiz__option';
        label.innerHTML = `
            ${option}
            <input class="quiz__option-input" type="radio" name="answer" value="${i}">
            <span class="quiz__option-checkmark"></span>
        `;

        const input = label.querySelector('input[type="radio"]');

        if (selectedAnswered[index] === i) {
            input.checked = true; // Đánh dấu lựa chọn đã chọn nếu có
        }

        optionsContainer.appendChild(label);
    });

    questionCounter.textContent = `Câu ${index + 1} / ${questions.length}`;
    progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;

    if (index === 0) {
        prevButton.disabled = true; // Vô hiệu hóa nút "Prev"
        prevButton.classList.remove('quiz__button--active'); // Loại bỏ class làm nổi bật nút "Prev"
    } else {
        prevButton.removeAttribute('disabled'); // Bỏ vô hiệu hóa nút "Prev"  
        prevButton.classList.add('quiz__button--active'); // Thêm class để làm nổi bật nút "Prev"
    }

    nextButton.textContent = index === questions.length - 1 ? "Kết thúc" : "Tiếp theo";
}

function showAnswer(index) {
    const quizContainer = document.querySelector(".quiz__content");
    const quizTimer = document.querySelector(".quiz__timer");
    const quizProgress = document.querySelector(".quiz__progress");

    quizTimer.style.display = "none";
    quizProgress.style.display = "none";
    quizContainer.innerHTML = ""; // Dọn sạch vùng hiển thị cũ

    const currentQuestion = questions[index];
    const questionTitle = document.createElement("p");
    questionTitle.className = "quiz__question";
    questionTitle.textContent = currentQuestion.question;
    quizContainer.appendChild(questionTitle);

    currentQuestion.options.forEach((option, i) => {
        const label = document.createElement('label');
        label.className = 'quiz__option';

        // Thêm màu sắc nếu đúng/sai
        if (selectedAnswered[index] === i) {
            if (i === currentQuestion.correctAnswerIndex) {
                label.classList.add("correct");
            } else {
                label.classList.add("incorrect");
            }
        }

        label.innerHTML = `
            ${option}
            <input class="quiz__option-input" type="radio" name="answer" value="${i}" disabled ${selectedAnswered[index] === i ? "checked" : ""}>
            <span class="quiz__option-checkmark"></span>
        `;

        quizContainer.appendChild(label);
    });

    const scoreElement = document.createElement("p");
    scoreElement.className = "quiz__result-score";
    scoreElement.textContent = `Tổng điểm: ${selectedAnswered[index] === currentQuestion.correctAnswerIndex ? 20 : 0} / 20`;

    const answerElement = document.createElement("p");
    answerElement.className = "quiz__result-answer";

    if (selectedAnswered[index] === currentQuestion.correctAnswerIndex) {
        answerElement.textContent = "Đúng";
    } else {
        answerElement.textContent = `Đáp án: ${questions[index].options[currentQuestion.correctAnswerIndex]}`;
    }

    const buttonControls = document.createElement("div");
    buttonControls.className = "quiz__controls";
    buttonControls.innerHTML = `
        <button class="quiz__button quiz__button--prev" id="prevButton" disabled>Truoc</button>
        <button class="quiz__button quiz__button--next" id="nextButton">Tiep theo</button>
    `;

    const questionCounter = document.createElement("p");
    questionCounter.className = "quiz__counter";
    questionCounter.textContent = `Câu ${index + 1} / ${questions.length}`;
    quizContainer.appendChild(scoreElement);
    quizContainer.appendChild(answerElement);
    quizContainer.appendChild(questionCounter);
    quizContainer.appendChild(buttonControls);

    const prevButton = buttonControls.querySelector(".quiz__button--prev");
    const nextButton = buttonControls.querySelector(".quiz__button--next");

    nextButton.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showAnswer(currentQuestionIndex);
        } else {
            window.location.href = "./course-video.html";
        }
    });
    prevButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showAnswer(currentQuestionIndex);
        }
    });

    if (index === 0) {
        prevButton.disabled = true; // Vô hiệu hóa nút "Prev"
        prevButton.classList.remove('quiz__button--active'); // Loại bỏ class làm nổi bật nút "Prev"
    } else {
        prevButton.removeAttribute('disabled'); // Bỏ vô hiệu hóa nút "Prev"  
        prevButton.classList.add('quiz__button--active'); // Thêm class để làm nổi bật nút "Prev"
    }

    nextButton.textContent = index === questions.length - 1 ? "Kết thúc" : "Tiếp theo";
}

showQuestion(currentQuestionIndex);

