const courseList = [
    {
        id: 1,
        teacher: "Kenny White",
        level: "Beginner",
        title: "HTML CSS từ Zero đến Hero",
        image: "./assets/img/course/course-item4.png",
        price: "$29.0",
        isFree: true,
        link: "./course-detail.html"
    },
    {
        id: 2,
        teacher: "John Doe",
        level: "Intermediate",
        title: "HTML CSS Pro",
        image: "./assets/img/course/course-item-1.png",
        sale: "$29.0",
        price: "$49.0",
        isFree: false,
        link: "./course-detail.html"
    },
    {
        id: 3,
        teacher: "Kenny White",
        level: "Beginner",
        title: "Lập Trình Javascript Cơ Bản",
        image: "./assets/img/course/course-item-5.png",
        price: "$29.0",
        isFree: true,
        link: "./course-detail.html"
    },
    {
        id: 4,
        teacher: "John Doe",
        level: "Intermediate",
        title: "Lập Trình Javascript Nâng Cao",
        image: "./assets/img/course/course-item-6.png",
        price: "$29.0",
        isFree: true,
        link: "./course-detail.html"
    },
    {
        id: 5,
        teacher: "Kenny White",
        level: "Expert",
        title: "Javascript Pro",
        image: "./assets/img/course/course-item-7.png",
        price: "$49.0",
        sale: "$29.0",
        isFree: false,
        link: "./course-detail.html"
    },
    {
        id: 6,
        teacher: "John Doe",
        level: "Expert",
        title: "Ngôn Ngữ Sass",
        image: "./assets/img/course/course-item-8.png",
        price: "$29.0",
        isFree: false,
        link: "./course-detail.html"
    },
]

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

const coursesContainer = document.querySelectorAll(".feature__list");
const signInBtn = document.getElementsByClassName("top-actions__user-btn")
const navbarLink = document.querySelectorAll(".navbar__link");

console.log(coursesContainer);


const renderCourseIndex = (course) => {
    coursesContainer.forEach(container => {
        container.innerHTML = "";

        course.forEach((item, index) => {

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
                    <p>by <strong>${item.teacher}</strong></p>
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
                            <span>${item.level}</span>
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
    const dropdownLogout = document.querySelector(".dropdown__logout");

    if (dropdownLogout) {
        dropdownLogout.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("currentUser");
            window.location.href = "/";
        });
    } else {
        console.warn("Không tìm thấy nút logout. Có thể DOM chưa được render.");
    }
}

renderCourseIndex(courseList)
renderCourseDetail();
handleLogout();


