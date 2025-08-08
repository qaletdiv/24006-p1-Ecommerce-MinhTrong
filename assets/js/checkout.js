const courseList = [
    {
        id: 1,
        teacherId: 1,
        levelsId: 1,
        title: "HTML CSS từ Zero đến Hero",
        image: "./assets/img/course/course-item4.png",
        price: "29.0",
        isFree: true,
        link: "./course-detail.html"
    },
    {
        id: 2,
        teacherId: 2,
        levelsId: 2,
        title: "HTML CSS Pro",
        image: "./assets/img/course/course-item-1.png",
        sale: "29.0",
        price: "49.0",
        isFree: false,
        link: "./course-detail.html"
    },
    {
        id: 3,
        teacherId: 1,
        levelsId: 1,
        title: "Lập Trình Javascript Cơ Bản",
        image: "./assets/img/course/course-item-5.png",
        price: "29.0",
        isFree: true,
        link: "./course-detail.html"
    },
    {
        id: 4,
        teacherId: 2,
        levelsId: 2,
        title: "Lập Trình Javascript Nâng Cao",
        image: "./assets/img/course/course-item-6.png",
        price: "29.0",
        isFree: true,
        link: "./course-detail.html"
    },
    {
        id: 5,
        teacherId: 1,
        levelsId: 3,
        title: "Javascript Pro",
        image: "./assets/img/course/course-item-7.png",
        price: "49.0",
        sale: "29.0",
        isFree: false,
        link: "./course-detail.html"
    },
    {
        id: 6,
        teacherId: 2,
        levelsId: 3,
        title: "Ngôn Ngữ Sass",
        image: "./assets/img/course/course-item-8.png",
        price: "29.0",
        isFree: false,
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

const selectedMethod = document.querySelectorAll(".checkout__main-section-list-item");
const checkoutForm = document.querySelector(".checkout__main-section-form");
const checkoutButton = document.querySelector(".checkout__sidebar-summary-button");
const popupButton = document.querySelector(".popup-btn");
const popup = document.getElementById("popup");
const courseId = localStorage.getItem("courseId");

function saveCourse(course) {
    const myCourse = JSON.parse(localStorage.getItem("myCourse")) || [];

    const isExistCourse = myCourse.find((item) => item.id === course.id);

    if (!isExistCourse) {
        myCourse.push(
            {
                ...course,
                progress: 0,
                status: "Active",
                link: "./course-detail-success.html",
            }
        );
        localStorage.setItem("myCourse", JSON.stringify(myCourse));

        return
    }

    return
}


if (courseId) {
    const course = courseList.find((course) => course.id === parseInt(courseId));
    const teacher = teachers.find((teacher) => teacher.id === course.teacherId);

    const checkoutSummaryCourse = document.querySelector(".checkout__sidebar-summary-course");
    checkoutSummaryCourse.querySelector("img").src = course.image;
    checkoutSummaryCourse.querySelector("h2").textContent = course.title;
    checkoutSummaryCourse.querySelector("p").textContent = `Lecturer: ${teacher.name}`;

    const checkoutSummaryPrice = document.getElementById("price");
    const checkoutSummaryDiscount = document.getElementById("discount");
    const checkoutSummaryTotal = document.getElementById("total");
    checkoutSummaryPrice.querySelector("span:nth-child(2)").textContent = course.price + "$";

    if (course.sale) {
        checkoutSummaryDiscount.querySelector("span:nth-child(2)").textContent = (course.price - course.sale) + "$";
    }

    if (course.sale) {
        checkoutSummaryTotal.querySelector("span:nth-child(2)").textContent = course.sale + "$";
    }

    saveCourse(course);

}


selectedMethod.forEach((select) => {
    select.addEventListener("click", () => {
        selectedMethod.forEach((destroy) => {
            destroy.classList.remove("checkout__main-section-list-item--selected")

            const checkIcon = destroy.querySelector("img:last-child");
            checkIcon.classList.add("checkout__unchecked")
        })
        select.classList.add("checkout__main-section-list-item--selected")

        const selectedCheckIcon = select.querySelector("img:last-child");
        if (selectedCheckIcon) {
            selectedCheckIcon.classList.remove("checkout__unchecked");
        }
    })
})

const handleOnSubMit = (event) => {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value;

    if (!firstName || !lastName || !email || !phone || !address || !city) {
        alert("Vui lòng điền đầy đủ thông tin trước khi thanh toán.");
        return;
    }

    const myCourse = JSON.parse(localStorage.getItem("myCourse")) || [];

    if (!myCourse) {

    }


    localStorage.setItem("myCourse", JSON.stringify(myCourse));

    popup.classList.add("popup-open");
}

checkoutForm.addEventListener("submit", (event) => {
    handleOnSubMit(event)
});

popupButton.addEventListener("click", () => {
    window.location.href = "/course-detail-success.html"
})