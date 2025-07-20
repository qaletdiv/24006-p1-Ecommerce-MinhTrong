const btnSideBar = document.querySelector(".top-actions__more");
const sideBar = document.querySelector(".sidebar");
const overlay = document.querySelector(".sidebar-overlay");
const sideBarUser = document.querySelector(".sidebar__user");

function renderInfoUser() {
    sideBarUser.innerHTML = "";

    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (user) {
        sideBarUser.innerHTML = `
            <div class="sidebar__user-avatar">
                <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/44e1879c-9ff1-493f-8042-23f8a3be2184.png"
                        alt="User profile picture" width="100%" height="100%">
            </div>

            <div class="sidebar__user-info">
                <p class="sidebar__user-title">
                    ${user.firstName} ${user.lastName}
                </p>
                <p class="sidebar__user-title">
                    ${user.email}
                </p>
            </div>
        `
    }
}

btnSideBar.addEventListener("click", () => {
    sideBar.classList.toggle("open");
    overlay.classList.toggle("visible");
})

renderInfoUser();

