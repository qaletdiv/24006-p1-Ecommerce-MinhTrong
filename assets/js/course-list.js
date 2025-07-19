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
]

const teachers = [
    {
        id: 1,
        name: "Kenny White",
    },
    {
        id: 2,
        name: "John Doe",
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

const inputSearch = document.querySelector(".course__left-filter__input-field")
const btnSearch = document.querySelector(".course__left-filter__input-btn")
const coursesContainer = document.querySelector(".row.row-cols-1")
const filterTeacher = document.querySelectorAll("#teacher")
const filterPrice = document.querySelectorAll("#price")
const filterLevels = document.querySelectorAll("#levels")

const renderCourses = (course) => {
    coursesContainer.innerHTML = "";

    course.forEach(item => {
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
        courseItem.className = "col course__list-item";
        courseItem.innerHTML = `
            <a class="course__list-item__link course__link" href="${item.link}" data-id="${item.id}">
                <img src="${item.image}" alt="${item.title}" class="course__list-item__img"/>
            </a>
            
            <div class="course__item-info">
                <p>
                    by
                    <strong>
                        ${teacher.name}
                    </strong>
                </p>
                <h3 class="course__item-title">
                    <a class="course__link" href="${item.link}" data-id="${item.id}">${item.title}</a>
                </h3>

                <div class="course__item-desc">
                    <div class="course__item-desc__article">
                        <img src="./assets/icons/timer.svg" alt="">
                        <span>2 Weeks</span>
                    </div>

                    <div class="course__item-desc__article">
                        <img src="./assets/icons/student.svg" alt="">
                        <span>156 students</span>
                    </div>

                    
                    <div class="course__item-desc__article">
                        <img src="./assets/icons/levels.svg" alt="">
                        <span>${level.name}</span>
                    </div>
                    
                    <div class="course__item-desc__article">
                        <img src="./assets/icons/lessons.svg" alt="">
                        <span>Lessons</span>
                    </div>
                </div>

                <div class="line"></div>

                <div class="course__item-info__meta">
                    <div class="course__item-info__meta-price">
                        ${priceHTML}
                    </div>

                    <a class="course__item-info__meta-link course__link" href="${item.link}" data-id="${item.id}">
                        View More
                    </a>
                </div>
            </div>
        `

        coursesContainer.appendChild(courseItem)
    });
}

inputSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btnSearch.click();
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

    if (filterCourse.length === 0) {
        return (
            coursesContainer.innerHTML = `
            <div class="col">
                <h3 class="text-center">
                    Không tìm thấy khóa học
                </h3>
            </div>`
        )
    }

    renderCourses(filterCourse);
})

inputSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        btnSearch.click();
    }
});

const handleFilterTeacher = () => {
    const selectedTeachers = [];

    for (const teacher of filterTeacher) {
        if (teacher.checked) {
            selectedTeachers.push(parseInt(teacher.value)); // Chuyển đổi giá trị thành số nguyên
        }
    }

    // Kiểm tra xem có chọn giáo viên nào không (Nếu không có giáo viên nào được chọn, hiển thị tất cả khóa học)
    if (selectedTeachers.length === 0) {
        console.log("No teachers selected");
        renderCourses(courseList);
        return;
    }

    // Lọc danh sách khóa học dựa trên giáo viên đã chọn
    const filterCourseByTeacher = courseList.filter(course => {
        return selectedTeachers.includes(course.teacherId);
    })

    renderCourses(filterCourseByTeacher);
}

filterTeacher.forEach(teacher => {
    teacher.addEventListener("change", handleFilterTeacher);
})

const handleFilterPrice = () => {
    const selectedPrices = [];

    for (const price of filterPrice) {
        if (price.checked) {
            selectedPrices.push(price.value);
            console.log("Added price:", price.value, selectedPrices);
        }
    }

    // Kiểm tra xem có chọn mức giá nào không (Nếu không có mức giá nào được chọn, hiển thị tất cả khóa học)
    if (selectedPrices.length === 0) {
        console.log("No prices selected");
        renderCourses(courseList);
        return;
    }

    // Lọc danh sách khóa học dựa trên mức giá đã chọn
    if (selectedPrices.includes("free")) {
        const filterFreeCourses = courseList.filter(course => course.isFree);
        console.log(filterFreeCourses);

        renderCourses(filterFreeCourses);
        return;
    } else if (selectedPrices.includes("price")) {
        const filterCourseByPrice = courseList.filter(course => {
            console.log(course.price);

            const price = parseFloat(course.price.replace("$", ""))

            return !course.isFree && price > 0;
        })

        renderCourses(filterCourseByPrice);

    } else if (selectedPrices.includes("sale")) {
        const filterCourseBySale = courseList.filter(course => {
            return course.sale !== undefined;
        })

        console.log(filterCourseBySale);

        renderCourses(filterCourseBySale);
    }
}

filterPrice.forEach(price => {
    price.addEventListener("change", handleFilterPrice);
})

const handleFilterLevels = () => {
    const selectedLevels = [];

    for (const level of filterLevels) {
        if (level.checked) {
            selectedLevels.push(level.value);
            console.log("Added level:", level.value, selectedLevels);
        }
    }

    if (selectedLevels.length === 0) {
        console.log("No levels selected");
        renderCourses(courseList);
        return;
    }

    // Lọc danh sách khóa học dựa trên mức độ đã chọn
    const filterCourseByLevel = courseList.filter(course => {
        return selectedLevels.includes(String(course.levelsId));
    })

    renderCourses(filterCourseByLevel);

}

filterLevels.forEach(level => {
    level.addEventListener("change", handleFilterLevels);
})

function handleRenderCourseDetail() {
    const courseLink = document.querySelectorAll(".course__link");

    courseLink.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const courseId = e.currentTarget.getAttribute("data-id")
            localStorage.setItem("courseId", courseId);
            window.location.href = e.currentTarget.getAttribute("href");
        })
    })

}

renderCourses(courseList);
handleRenderCourseDetail();
