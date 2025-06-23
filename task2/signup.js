"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("./validators");
const Backend_1 = require("./Backend");
const form = document.getElementById('signup-form');
const fullName = form.querySelector('input[name="fullName"]');
const email = form.querySelector('input[name="email"]');
const password = form.querySelector('input[name="password"]');
const confirmPassword = form.querySelector('input[name="confirmPassword"]');
const errorBox = document.getElementById('signup-errors');
function showError(input, msg) {
    let span = input.nextElementSibling;
    if (!span || !span.classList.contains('error')) {
        span = document.createElement('span');
        span.className = 'error';
        input.insertAdjacentElement('afterend', span);
    }
    span.textContent = msg || '';
}
function validate() {
    const nameError = (0, validators_1.validateField)(fullName.value, { required: true });
    const emailError = (0, validators_1.validateEmail)(email.value);
    const passError = (0, validators_1.validatePassword)(password.value);
    const confirmError = (0, validators_1.validateConfirmPassword)(password.value, confirmPassword.value);
    showError(fullName, nameError);
    showError(email, emailError);
    showError(password, passError);
    showError(confirmPassword, confirmError);
    return !(nameError || emailError || passError || confirmError);
}
form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    errorBox.innerHTML = '';
    if (!validate()) {
        errorBox.innerHTML = 'Please fix the errors above.';
        return;
    }
    try {
        yield (0, Backend_1.mockSignUp)(email.value, password.value);
        alert('Sign up successful!');
    }
    catch (err) {
        errorBox.innerHTML = `<p>${err}</p>`;
    }
}));
