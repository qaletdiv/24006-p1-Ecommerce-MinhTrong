const form = document.getElementById("form")
const popup = document.getElementById("popup");
const popupBtn = document.querySelector(".popup-btn");

const handleSubmitForm = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)

    const name = formData.get("name");
    const email = formData.get("email");
    const comment = formData.get("comment");

    if (!name || !email || !comment) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }

    popup.classList.add("popup-open");
}

const resetForm = () => {
    form.reset();
}

form.addEventListener("submit", (e) => {
    handleSubmitForm(e);
});

popupBtn.addEventListener("click", () => {
    popup.classList.remove("popup-open");
    resetForm();
});
