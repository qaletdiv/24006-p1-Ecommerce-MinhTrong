const courseList = [
    {
        id: 1,
        title: "HTML CSS từ Zero đến Hero",
        image: "./assets/img/course/course-item4.png",
        price: "$29.0",
        isFree: true,
        link: "./course-detail.html"
    },
    {
        title: "HTML CSS Pro",
        image: "./assets/img/course/course-item-1.png",
        price: "$29.0",
        sale: "$49.0",
        isFree: false,
        link: "./course-detail.html"
    },
    {
        title: "Lập Trình Javascript Cơ Bản",
        image: "./assets/img/course/course-item-5.png",
        price: "$29.0",
        isFree: true,
        link: "./course-detail.html"
    },
    {
        title: "Lập Trình Javascript Nâng Cao",
        image: "./assets/img/course/course-item-6.png",
        price: "$29.0",
        isFree: true,
        link: "./course-detail.html"
    },
    {
        title: "Javascript Pro",
        image: "./assets/img/course/course-item-7.png",
        price: "$29.0",
        isFree: true,
        link: "./course-detail.html"
    },
    {
        title: "Ngôn Ngữ Sass",
        image: "./assets/img/course/course-item-8.png",
        price: "$29.0",
        isFree: true,
        link: "./course-detail.html"
    },

]

const inputSearch = document.querySelector(".course__left-filter__input-filed")
const btnSearch = document.querySelector(".course__left-filter__input-btn")
const coursesContainer = document.querySelector(".row.row-cols-2")

console.log(inputSearch);
console.log(btnSearch);
console.log(coursesContainer);

const renderCourses = (course) => {
    coursesContainer.innerHTML = ""; // Xóa các nội dung trước đó.

    course.forEach((item, index) => {
        const courseItem = document.createElement("div");
        courseItem.className = "col";
        courseItem.innerHTML = `
            <article class="feature__item">
                <img src="${item.image}" alt="${item.title}" class="feature__item-img"/>

                <div class="feature__item-info">
                    <p>by <strong>Determined-Poitras</strong></p>
                    <h3 class="feature__item-info__title">
                        <a href="${item.link}">${item.title}</a>
                    </h3>

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
                    </div>

                    <div class="line"></div>

                    <div class="feature__item-info__meta">
                        <div class="feature__item-info__meta-price">
                            <span class="price">${item.price}</span>
                            <span class="free">
                                ${item.isFree ? "Free" :
                `<span class="sale">${item.sale}</span>`
            }
                            </span>
                        </div>

                        <a class="feature__item-info__meta-link" href="${item.link}">View More</a></a>
                    </div>
                </div>
            </article>
        `;
        coursesContainer.appendChild(courseItem);
    })
}


inputSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        console.log(inputSearch.value);
    }
});

btnSearch.addEventListener("click", (e) => {
    e.preventDefault();

    if (!inputSearch.value.trim()) {
        renderCourses(courseList);
        return;
    }

    const keyword = inputSearch.value.trim().toLowerCase();

    if (!keyword) {
        alert("Please enter a keyword to search.");
        return;
    }

    const filterCourse = courseList.filter(course => {
        return course.title.toLowerCase().includes(keyword);
    })

    console.log(filterCourse);
    console.log(keyword);



    renderCourses(filterCourse);
})

inputSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btnSearch.click();
    }
})

renderCourses(courseList);





