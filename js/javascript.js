function corporationClicked() {
  var corporation_form = document.getElementById("corporationForm");
  var startup_form = document.getElementById("startupForm");

  corporation_form.style.display = "block";
  startup_form.style.display = "none";
}

function statupClicked() {
  var corporation_form = document.getElementById("corporationForm");
  var startup_form = document.getElementById("startupForm");

  corporation_form.style.display = "none";
  startup_form.style.display = "block";
}

// Form Validator class
class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

  initialize() {
    this.validateOnSubmit();
    this.validateOnEntry();
  }

  validateOnSubmit() {
    let self = this;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      self.fields.forEach((field) => {
        const input = document.getElementById(field);
        self.validateFields(input);
      });
    });
  }

  validateOnEntry() {
    let self = this;
    this.fields.forEach((field) => {
      const input = document.getElementById(field);
      input.addEventListener("input", (event) => {
        console.log(event);
        self.validateFields(input);
      });
    });
  }

  validateFields(field) {
    if (field.value.trim() === "") {
      /*const formControl = field.parentElement;
      const label = formControl.querySelector("label");
      this.setStatus(field, `${label.innerText} cannot be blank`, "error");*/
      this.setStatus(field, "Please complete this required field.", "error");
    } else {
      this.setStatus(field, null, "success");
    }

    if (field.type === "email") {
      const re = /\S+@\S+\.\S+/;
      if (re.test(field.value)) {
        this.setStatus(field, null, "success");
      } else {
        this.setStatus(field, "Email must be formatted correctly.", "error");
      }
    }
  }

  setStatus(field, message, status) {
    const successIcon = field.parentElement.querySelector(".icon-success");
    const errorIcon = field.parentElement.querySelector(".icon-error");
    const errorMessage = field.parentElement.querySelector(".error-message");

    if (status === "success") {
      if (errorIcon) {
        errorIcon.classList.add("hidden");
      }
      if (errorMessage) {
        errorMessage.innerText = "";
      }
      successIcon.classList.remove("hidden");
      field.classList.remove("input-error");
    }

    if (status === "error") {
      if (successIcon) {
        successIcon.classList.add("hidden");
      }
      field.parentElement.querySelector(".error-message").innerText = message;
      errorIcon.classList.remove("hidden");
      field.classList.add("input-error");
    }
  }
}

// corporationform
const corporationform = document.getElementById("corporationForm");
const co_fields = ["co_firstname", "co_lastname", "co_email"];

const co_validator = new FormValidator(corporationform, co_fields);
co_validator.initialize();

// startupForm
const startupForm = document.getElementById("startupForm");
const startup_fields = ["firstname", "lastname", "email"];

const startup_validator = new FormValidator(startupForm, startup_fields);
startup_validator.initialize();
