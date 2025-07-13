const timerElement = document.getElementById("time");
const questionElement = document.querySelector(".quiz__question");
const optionsContainer = document.querySelector(".quiz__options");
const optionElements = document.querySelectorAll(".quiz__option");
const prevButton = document.querySelector(".quiz__button--prev")
const nextButton = document.querySelector(".quiz__button--next");
const questionCounter = document.querySelector(".quiz__counter");
const progressBar = document.querySelector(".quiz__progress-bar");

let timeInSeconds = 30 * 60;
let currentQuestionIndex = 0;

const questions = [
    {
        question: "Câu 1: HTML là viết tắt của cụm từ nào?",
        options: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "Hyperlink and Text Markup Language",
            "Home Tool Markup Language"
        ],
    },
    {
        question: "Câu 2: Thuộc tính nào dùng để chỉ định nguồn hình ảnh trong thẻ <img>?",
        options: [
            "src",
            "href",
            "alt",
            "link",
        ],
    },
    {
        question: "Câu 3: Thuộc tính nào dùng để cung cấp mô tả văn bản thay thế cho hình ảnh?",
        options: [
            "alt",
            "title",
            "description",
            "caption",
        ],
    },
    {
        question: "Câu 4: CSS là viết tắt của cụm từ nào?",
        options: [
            "Computer Style Sheets",
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
    },
    {
        question: "Câu 5: Thuộc tính CSS nào dùng để thay đổi màu chữ?",
        options: [
            "text-color",
            "font-color",
            "color",
            "text-style"
        ],
    },
]



nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
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
        resetQuiz();
    } else {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
        timeInSeconds--;
    }
}, 1000)

function resetQuiz() {
    currentQuestionIndex = 0;
    timeInSeconds = 30 * 60;
    timerElement.textContent = "30:00";
    showQuestion(currentQuestionIndex);
    prevButton.disabled = true; // Vô hiệu hóa nút "Prev"
    prevButton.classList.remove('quiz__button--active'); // Loại bỏ class làm nổi bật nút "Prev"
    nextButton.textContent = 'Tiếp theo'; // Đặt lại nút "Tiếp theo"
    progressBar.style.width = '0%'; // Đặt lại thanh tiến trình
    optionsContainer.innerHTML = ''; // Xóa các lựa chọn cũ
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

    if (index === questions.length - 1) {
        nextButton.textContent = 'Kết thúc'; // Thay đổi nút "Tiếp theo" thành "Kết thúc"
        nextButton.addEventListener('click', () => {
            alert("Bài kiểm tra đã hoàn thành!");
            resetQuiz(); // Gọi hàm resetQuiz để bắt đầu lại từ đầu
        })
    } else {
        nextButton.textContent = 'Tiếp theo'; // Đặt lại nút "Tiếp theo"
    }
}
// Gọi hàm để hiển thị câu hỏi đầu tiên
showQuestion(currentQuestionIndex);

