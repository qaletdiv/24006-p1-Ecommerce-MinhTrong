// Lấy thẻ form
const form = document.getElementById('sign-up-form');


const handleSubmitForm = (e) => {
    e.preventDefault();

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const cfmPassword = document.getElementById('cfmPassword');

    const users = JSON.parse(localStorage.getItem('user')) || [];
    const emailExists = users.some(user => user.email === email.value);

    if (emailExists) {
        alert("Email already exists");
        return;
    }

    if (password.value !== cfmPassword.value) {
        alert("Passwords do not match");
        return;
    }

    users.push({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    });

    localStorage.setItem('user', JSON.stringify(users));
    alert('Sign up successful');
    window.location.href = './sign-in.html';
}

form.addEventListener('submit', handleSubmitForm);
