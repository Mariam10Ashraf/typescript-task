"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;
exports.validateConfirmPassword = validateConfirmPassword;
exports.validateField = validateField;
function validateEmail(value) {
    if (!value)
        return 'Email is required';
    if (!value.includes('@'))
        return 'Email format is invalid';
    return null;
}
function validatePassword(value) {
    if (!value)
        return 'Password is required';
    if (value.length < 8)
        return 'Password must be at least 8 characters';
    return null;
}
function validateConfirmPassword(pass, confirm) {
    return pass === confirm ? null : 'Passwords do not match';
}
function validateField(value, rules) {
    if (rules.required && !value.trim())
        return 'This field is required';
    return null;
}
