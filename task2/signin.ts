import { validateEmail, validatePassword } from './validators';
import { mockSignIn } from './Backend';

const signInForm = document.getElementById('signin-form')!;
const signInEmail = signInForm.querySelector('input[name="email"]') as HTMLInputElement;
const signInPassword = signInForm.querySelector('input[name="password"]') as HTMLInputElement;
const signInErrors = document.getElementById('signin-errors')!;

signInForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  signInErrors.innerHTML = '';

  const emailError = validateEmail(signInEmail.value);
  const passwordError = validatePassword(signInPassword.value);

  if (emailError || passwordError) {
    if (emailError) signInErrors.innerHTML += `<p>${emailError}</p>`;
    if (passwordError) signInErrors.innerHTML += `<p>${passwordError}</p>`;
    return;
  }

  try {
    await mockSignIn(signInEmail.value, signInPassword.value);
    alert('Signed in successfully!');
  } catch (err) {
    signInErrors.innerHTML = `<p>${err}</p>`;
  }
});
