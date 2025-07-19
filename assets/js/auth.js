console.log("active link");

const authForm = document.querySelector(".auth__form");

const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const users = JSON.parse(localStorage.getItem("user")) || [];

    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "index.html";
    }
}

authForm.addEventListener("submit", handleLogin);
