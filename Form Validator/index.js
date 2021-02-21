const eyes = document.querySelectorAll(".fa-eye");
const form = document.getElementById("form");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("confirm_password");

eyes.forEach((eye) => {
  eye.addEventListener("click", (e) => {
    const parentNode = e.target.parentNode;
    const targetInput = parentNode.querySelector("input");
    console.log(targetInput);

    if (
      (targetInput.id === "password" ||
        targetInput.id === "confirm_password") &&
      targetInput.getAttribute("type") === "password"
    ) {
      targetInput.setAttribute("type", "text");
      e.target.classList.toggle("fa-eye-slash");
    } else {
      targetInput.setAttribute("type", "password");
      e.target.classList.toggle("fa-eye-slash");
    }
  });
});

function showError(input, message) {
  input.parentNode.classList.remove("success");
  input.parentNode.classList.add("error");
  input.nextElementSibling.style.color = "#e74c3c";
  const small = input.parentNode.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  input.parentNode.classList.remove("error");
  input.parentNode.classList.add("success");
  input.nextElementSibling.style.color = "#2ecc71";
}

function isValidEmail(emailValue) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(emailValue).toLowerCase());
}

function isValidPassword(inputValue) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return re.test(String(inputValue));
}

function isAnyEmpty(inputArray) {
  inputArray.forEach((input) => {
    input.value === ""
      ? showError(input, `${input.id} is required!`)
      : showSuccess(input);
  });
}

function isEmailValid() {
  !isValidEmail(email.value)
    ? showError(email, "Email is invalid!")
    : showSuccess(email);
}

function isPasswordSame() {
  if (password2.value === password.value) {
    password.value === ""
      ? showError(password2, "Confirm password is required!")
      : showSuccess(password2);
  } else {
    showError(password2, "Passwords doesn't match!");
  }
}

function isPasswordValid() {
  !isValidPassword(password.value)
    ? showError(password, "Password is invalid!")
    : showSuccess(password);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  isAnyEmpty([username, email, password, password2]);
  isEmailValid();
  isPasswordValid();
  isPasswordSame();
});

password.addEventListener("focus", () => {
  const passwordRules = document.createElement("div");
  passwordRules.classList.add("password-rules");
  passwordRules.innerHTML = `<h2>Password Rules</h2>
                             <ul>
                                <li>Must contain at least one lowercase alphabetical character.</li>
                                <li>Must contain at least one uppercase alphabetical character.</li>
                                <li>Must contain at least one numeric character.</li>
                                <li>Must contain at least one special character.</li>
                                <li>Must be eight characters or longer.</li>
                             </ul>`;
  document.body.appendChild(passwordRules);

  setTimeout(() => passwordRules.remove(), 5000);
});
