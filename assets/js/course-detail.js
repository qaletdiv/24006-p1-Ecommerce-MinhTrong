const courseListDetail = [
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

const colorCouse = [
    {
        colorId: 1,
        colorClass: "backgroundCss"
    },
    {
        colorId: 2,
        colorClass: "backgroundCssPlus"
    },
    {
        colorId: 3,
        colorClass: "backgroundJs"
    },
    {
        colorId: 4,
        colorClass: "backgroundJavascript"
    },
    {
        colorId: 5,
        colorClass: "backgroundJs"
    },
    {
        colorId: 6,
        colorClass: "backgroundSass"
    },

]

const courseDetail = document.querySelector(".course__detail");
const courseDetailInfo = document.querySelector(".course__detail-info");

const couseId = localStorage.getItem("courseId");

console.log(couseId);


if (couseId) {
    const course = courseListDetail.find(course => course.id === Number(couseId));

    console.log(course);


    if (course) {
        const color = colorCouse.find(color => color.colorId === course.id);

        if (color) {
            courseDetail.classList.add(color.colorClass);
        }


        courseDetailInfo.innerHTML = '';
        courseDetailInfo.innerHTML = `
            <div class="course__detail-info__content">
                <h2 class="course__detail-info__content-title">
                    ${course.title}
                </h2>
                <p class="course__detail-info__content-desc">
                    Your career in full stack web development starts here. Fast-track learning and interview
                    prep. Grow skills at your own pace. Expand your earnings potential.
                </p>

                <div class="course__info">
                    <div class="course__info-rate">
                        <div class="course__info-rate__star">
                            <img src="./assets/icons/start.svg" alt="">
                            <span class="course__info-rate__number">4,7</span>
                        </div>
                        <p class="course__info-rate__text">average course rating</p>
                    </div>

                    <div class="course__info-title">
                        <span class="course__info-rate__number">126</span>
                        <p class="course__info-rate__text">practice exercises</p>
                    </div>

                    <div class="course__info-title">
                        <span class="course__info-rate__number">87,6</span>
                        <p class="course__info-rate__text">hours of content</p>
                    </div>
                </div>

                <div class="course__detail-info__content-btn">
                    <button class="course__detail-btn">
                        Get Started
                    </button>

                    <div>
                        <span class="course__detail-btn__price">
                            ₫867,000
                        </span>
                        <span class="price-line">
                            ₫5,227,000
                        </span>
                    </div>
                </div>

                <div class="course__enrolled">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                    <p class="course__enrolled-text">
                        <strong>1.5M</strong>
                        learners already enrolled
                    </p>
                </div>
            </div>

            <div class="course__detail-info__img">
                <img src="${course.image}" alt="${course.title}">
            </div>
        `
    }
}
