const btnReset = document.querySelector('.auth__btn')
const popup = document.getElementById("popup");
const popupButton = document.querySelector(".popup-btn");

console.log(popupButton);


const handleResetPassword = (e) => {
    e.preventDefault();
    const password = document.querySelector(".form__input")
    const cfmPassWord = document.querySelector(".form__input-cfm")
    const authError = document.querySelector(".auth__error");

    if (password.value !== cfmPassWord.value) {
        authError.classList.add("open__error");
    } else {
        const user = JSON.parse(localStorage.getItem("user"))
        user.password = password.value;
        localStorage.setItem("user", JSON.stringify(user));
        popup.classList.add("popup-open");
    }
}

btnReset.addEventListener('click', handleResetPassword)
popupButton.addEventListener("click", () => {
    window.location.href = "/sign-in.html"
})