const btnComplete = document.querySelector(".video__btn-complete");
const courseId = parseInt(localStorage.getItem("courseId"));
let params = new URLSearchParams(window.location.search);
const lessonId = params.get("id")
localStorage.setItem("lessonId", lessonId);

function markLessonComplete(courseId, lessonId) {
    const myCourse = JSON.parse(localStorage.getItem("myCourse")) || [];
    const course = myCourse.find((course) => course.id === courseId);

    if (course) {

        if (!Array.isArray(course.completedLessons)) {
            course.completedLessons = [];
        }

        if (!course.completedLessons.includes(lessonId)) {
            course.completedLessons.push(lessonId);

            let currentProgress = course?.progress || 0;

            if (currentProgress < 100) {
                currentProgress += 12;

                if (currentProgress > 100) currentProgress = 100;

                course.progress = currentProgress;
                localStorage.setItem("myCourse", JSON.stringify(myCourse));
            }

        }

        window.location.href = "./course-detail-success.html";

    }
}

btnComplete.addEventListener("click", () => {
    markLessonComplete(courseId, lessonId);
})


