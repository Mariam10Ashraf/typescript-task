import { validateEmail, validatePassword, validateConfirmPassword, validateField } from './validators';
import { mockSignUp } from './Backend';

const form = document.getElementById('signup-form') as HTMLFormElement;
const fullName = form.querySelector('input[name="fullName"]') as HTMLInputElement;
const email = form.querySelector('input[name="email"]') as HTMLInputElement;
const password = form.querySelector('input[name="password"]') as HTMLInputElement;
const confirmPassword = form.querySelector('input[name="confirmPassword"]') as HTMLInputElement;
const errorBox = document.getElementById('signup-errors') as HTMLDivElement;

function showError(input: HTMLInputElement, msg: string | null) {
  let span = input.nextElementSibling as HTMLElement;
  if (!span || !span.classList.contains('error')) {
    span = document.createElement('span');
    span.className = 'error';
    input.insertAdjacentElement('afterend', span);
  }
  span.textContent = msg || '';
}

function validate(): boolean {
  const nameError = validateField(fullName.value, { required: true });
  const emailError = validateEmail(email.value);
  const passError = validatePassword(password.value);
  const confirmError = validateConfirmPassword(password.value, confirmPassword.value);

  showError(fullName, nameError);
  showError(email, emailError);
  showError(password, passError);
  showError(confirmPassword, confirmError);

  return !(nameError || emailError || passError || confirmError);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorBox.innerHTML = '';
  
  if (!validate()) {
    errorBox.innerHTML = 'Please fix the errors above.';
    return;
  }

  try {
    await mockSignUp(email.value, password.value);
    alert('Sign up successful!');
  } catch (err) {
    errorBox.innerHTML = `<p>${err}</p>`;
  }
});

