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
        </div>
    `
}

renderProfile()
