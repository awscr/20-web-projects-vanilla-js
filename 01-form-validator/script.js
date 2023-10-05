const form = document.getElementById("form"),
  username = document.getElementById("username"),
  email = document.getElementById("email"),
  password = document.getElementById("password"),
  password2 = document.getElementById("password2");

function showError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  formControl.className = "form-control error";
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;

  formControl.className = "form-control success";
}

function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

function checkPasswordsMath(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      if (input.id === "password2") {
        showError(input, "Please confirm your password");
      } else {
        showError(input, `${getFieldName(input)} is required`);
      }
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6);
  checkEmail(email);
  checkPasswordsMath(password, password2);
});
