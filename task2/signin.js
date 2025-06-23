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
const signInForm = document.getElementById('signin-form');
const signInEmail = signInForm.querySelector('input[name="email"]');
const signInPassword = signInForm.querySelector('input[name="password"]');
const signInErrors = document.getElementById('signin-errors');
signInForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    signInErrors.innerHTML = '';
    const emailError = (0, validators_1.validateEmail)(signInEmail.value);
    const passwordError = (0, validators_1.validatePassword)(signInPassword.value);
    if (emailError || passwordError) {
        if (emailError)
            signInErrors.innerHTML += `<p>${emailError}</p>`;
        if (passwordError)
            signInErrors.innerHTML += `<p>${passwordError}</p>`;
        return;
    }
    try {
        yield (0, Backend_1.mockSignIn)(signInEmail.value, signInPassword.value);
        alert('Signed in successfully!');
    }
    catch (err) {
        signInErrors.innerHTML = `<p>${err}</p>`;
    }
}));
