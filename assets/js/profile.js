const profileBox = document.querySelector(".profile__header-box")

const renderProfile = () => {
    profileBox.innerHTML = "";

    const informationUser = JSON.parse(localStorage.getItem("currentUser"))

    profileBox.innerHTML = `
        <div class="profile__avatar">
            <img src="./assets/img/avatar/avatar.jpg" alt="avatar" />
        </div>
        <div class="profile__details">
            <h1 class="profile__name">
                ${informationUser.firstName} ${informationUser.lastName}
            </h1>
            <p class="profile__email">${informationUser.email}</p>
            <button class="btn btn--primary profile__btn">Cập nhật hồ sơ</button>
        </div>
    `

    const profileBtn = document.querySelector(".profile__btn")

    profileBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "./edit-profile.html";
    })
}

renderProfile()
