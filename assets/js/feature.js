const courseList = [
    {
        id: 1,
        teacherId: 1,
        levelsId: 1,
        title: "HTML CSS từ Zero đến Hero",
        image: "./assets/img/course/course-item4.png",
        price: "$29.0",
        link: "./course-detail.html"
    },
    {
        id: 2,
        teacherId: 2,
        levelsId: 2,
        title: "HTML CSS Pro",
        image: "./assets/img/course/course-item-1.png",
        price: "$29.0",
        sale: "$49.0",
        isFree: false,
        link: "./course-detail.html"
    },
    {
        id: 3,
        teacherId: 1,
        levelsId: 1,
        title: "Lập Trình Javascript Cơ Bản",
        image: "./assets/img/course/course-item-5.png",
        price: "$29.0",
        isFree: false,
        sale: "$49.0",
        link: "./course-detail.html"
    },
    {
        id: 4,
        teacherId: 2,
        levelsId: 2,
        title: "Lập Trình Javascript Nâng Cao",
        image: "./assets/img/course/course-item-6.png",
        price: "$29.0",
        isFree: false,
        sale: "$49.0",
        link: "./course-detail.html"
    },
    {
        id: 5,
        teacherId: 1,
        levelsId: 3,
        title: "Javascript Pro",
        image: "./assets/img/course/course-item-7.png",
        price: "$29.0",
        isFree: true,
        link: "./course-detail.html"
    },
    {
        id: 6,
        teacherId: 2,
        levelsId: 3,
        title: "Ngôn Ngữ Sass",
        image: "./assets/img/course/course-item-8.png",
        price: "$29.0",
        isFree: true,
        link: "./course-detail.html"
    },
];

const teachers = [
    {
        id: 1,
        name: "Kenny White",
    },
    {
        id: 2,
        name: "John Doe",
    },
];

const levels = [
    {
        id: 1,
        name: "Beginner",
    },
    {
        id: 2,
        name: "Intermediate",
    },
    {
        id: 3,
        name: "Expert",
    },
]

const coursesContainer = document.querySelectorAll(".row.row-cols-3");
const signInBtn = document.getElementsByClassName("top-actions__user-btn")
const btnForm = document.getElementsByClassName("top-actions__user-btn")
const userContainer = document.querySelector(".top-actions__user")
const navbarLink = document.querySelectorAll(".navbar__link");

const renderUser = () => {
    Array.from(btnForm).forEach(btn => {
        btn.style.display = "none";
    })

    const user = JSON.parse(localStorage.getItem("currentUser"))

    if (user) {
        userContainer.innerHTML = `
        <p class="top-actions__user-email">
            <div class="dropdown">
                <button class="dropdown__toggle">
                    <a href="./profile.html">
                        ${user.email}
                    </a>
                </button>
                <ul class="dropdown__menu">
                    <li class="dropdown__item">
                    <a href="./my-course.html" class="dropdown__link">My Course</a>
                    </li>
                    <li class="dropdown__item">
                    <a href="/" class="dropdown__link dropdown__logout">Logout</a>
                    </li>
                </ul>
            </div>
        </p>
        `
    } else {
        Array.from(btnForm).forEach(btn => {
            btn.style.display = "block";
        })
    }

}

const renderCourseIndex = (course) => {
    coursesContainer.forEach(container => {
        container.innerHTML = "";

        course.forEach((item, index) => {
            const teacher = teachers.find(teacher => teacher.id === item.teacherId) || "Unknown Teacher";

            const level = levels.find(level => level.id === item.levelsId) || "Unknown Level";

            const hasDiscount = item.isFree || item.sale;

            let priceHTML = `
            <span class="price ${hasDiscount ? "price-line" : ""}">${item.price}</span>
        `

            if (item.isFree) {
                priceHTML += `<span class="free">Free</span>`;
            } else if (item.sale) {
                priceHTML += `<span class="sale">${item.sale}</span></span>`;
            }

            const courseItem = document.createElement("div");
            courseItem.classList.add = "col";
            courseItem.innerHTML = `
            <article class="feature__item">
                <a href="${item.link}" data-id="${item.id}" class="course__link">
                    <img src="${item.image}" alt="${item.title}" class="feature__item-img"/>
                </a>

                <div class="feature__item-info">
                    <p>by <strong>${teacher.name}</strong></p>
                    <a href="${item.link}" class="course__link" data-id="${item.id}">
                        <h3 class="feature__item-info__title">
                            ${item.title}
                        </h3>
                    </a>

                    <div class="feature__item-info__plan">
                        <div class="feature__item-info__plan-time">
                            <img 
                                src="./assets/img/feature/feature-icon-1.svg" 
                                alt="time" 
                                class="thumb"
                            />
                            <span>2Weeks</span>
                        </div>

                        <div class="feature__item-info__plan-time">
                            <img 
                                src="./assets/img/feature/feature-icon-2.svg" 
                                alt="time" 
                                class="thumb"
                            />
                            <span>156 students</span>
                        </div>

                        <div class="feature__item-info__plan-time">
                            <img src="./assets/icons/levels.svg" alt="" class="thumb">
                            <span>${level.name}</span>
                        </div>
                    </div>

                    <div class="line"></div>

                    <div class="feature__item-info__meta">
                        <div class="feature__item-info__meta-price">
                            ${priceHTML}    
                        </div>

                        <a class="feature__item-info__meta-link course__link" href="${item.link}" data-id="${item.id}">View More</a></a>
                    </div>
                </div>
            </article>
            `;
            container.appendChild(courseItem);
        })
    })
}

function renderCourseDetail() {
    document.querySelectorAll(".course__link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const courseId = e.currentTarget.getAttribute("data-id")
            localStorage.setItem("courseId", courseId);
            window.location.href = e.currentTarget.getAttribute("href");
        })
    })
}

function handleLogout() {
    const dropdownLogout = document.querySelector(".dropdown__logout")

    dropdownLogout.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        localStorage.removeItem("user")
        window.location.href = "/";
    })


}

renderUser();
renderCourseIndex(courseList)
renderCourseDetail();
handleLogout();


