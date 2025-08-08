const btnComplete = document.querySelector(".video__btn-complete");
const courseId = parseInt(localStorage.getItem("courseId"));

function markLessonComplete(courseId) {
    const myCourse = JSON.parse(localStorage.getItem("myCourse")) || [];
    const course = myCourse.find((course) => course.id === courseId);

    if (course) {
        let currentProgress = course?.progress || 0;

        if (currentProgress < 100) {
            currentProgress += 12;

            if (currentProgress > 100) currentProgress = 100;

            course.progress = currentProgress;
            localStorage.setItem("myCourse", JSON.stringify(myCourse));
        }

        window.location.href = "./course-detail-success.html";

    }
}

btnComplete.addEventListener("click", () => {
    markLessonComplete(courseId);
})


