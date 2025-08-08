const courseContainer = document.querySelector(".my__course-list");
const myCourse = JSON.parse(localStorage.getItem("myCourse")) || [];
const courseEmpty = document.querySelector(".course__empty");

console.log(courseEmpty);


const teacher = [
    {
        id: 1,
        name: "Kenny White",
    },
    {
        id: 2,
        name: "John Doe",
    },
];

function renderMyCourse(courses) {
    courseContainer.innerHTML = "";

    courses.forEach((course) => {

        const courseItem = document.createElement("div");
        courseItem.classList.add("col");

        courseItem.innerHTML = `
            <article class="feature__item">
                <a href="${course.link}" data-id="${course.id}" class="course__link">
                    <img src="${course.image}" alt="${course.title}" class="feature__item-img"/>
                </a>

                <div class="feature__status">
                    <span>${course.status}</span>
                </div>

                <div class="feature__item-info">
                    <p>by <strong>${course.teacher}</strong></p>
                    <h3 class="feature__item-info__title">${course.title}</h3>

                    <div class="feature__progress">
                        <div class="feature__progress-bar" style="width: ${course.progress}%"></div>
                    </div>

                    <div class="feature__complete">
                        <p class="feature__complete-text">${course.progress}% Completed</p>
                        <a href="./course-detail-success.html" data-id="${course.id}" class="feature__complete-btn course__link">
                            Continue
                        </a>
                    </div>
                </div>
            </article>
        `;

        courseContainer.appendChild(courseItem);
    });
}

function courseDetail() {
    document.querySelectorAll(".course__link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const courseId = e.currentTarget.getAttribute("data-id")
            localStorage.setItem("courseId", courseId);
            window.location.href = e.currentTarget.getAttribute("href");
        })
    })
}

if (myCourse.length > 0) {
    renderMyCourse(myCourse);
} else {
    courseEmpty.style.display = "block";
}

courseDetail();

