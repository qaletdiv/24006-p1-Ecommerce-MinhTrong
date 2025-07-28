const btnResetPassword = document.querySelector('.auth__btn');
console.log(btnResetPassword);

const handleResetPassword = (e) => {
    e.preventDefault();
    const email = document.querySelector(".form__input")

    const users = JSON.parse(localStorage.getItem("user")) || [];

    const user = users.find((user) => user.email === email.value);

    if (user) {
        window.location.href = "new-password.html";
    } else {
        alert("Email không tồn tại trong hệ thống!");
    }
}

btnResetPassword.addEventListener('click', handleResetPassword);
