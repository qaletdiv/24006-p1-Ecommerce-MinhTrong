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

const myCourse = JSON.parse(localStorage.getItem("myCourse")) || [];
const couseId = localStorage.getItem("courseId");

console.log(couseId);


if (couseId) {
    const course = myCourse.find(course => course.id === Number(couseId));
    const courseProgress = document.querySelector(".feature__progress-bar");
    const courseProgressText = document.querySelector(".feature__complete-text");

    console.log(courseProgress, courseProgressText);

    if (course) {
        const color = colorCouse.find(color => color.colorId === course.id);

        if (color) {
            courseDetail.classList.add(color.colorClass);
        }

        const hasDiscount = course.isFree || course.sale;

        courseProgress.style.width = `${course.progress}%`;
        courseProgressText.textContent = `Completed: ${course.progress}%`;

        let priceHTML = `
    <span class="price ${hasDiscount ? "price-line" : ""}">${course.price}</span>
`;

        if (course.isFree) {
            priceHTML = `<span class="free">Free</span>`;
        } else if (course.sale) {
            priceHTML += `<span class="sale">${course.sale}</span>`;
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
            </div>

            <div class="course__detail-info__img">
                <img src="${course.image}" alt="${course.title}">
            </div>
        `
    }
}
