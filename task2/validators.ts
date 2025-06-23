import { ValidationRules } from './types';

export function validateEmail(value: string): string | null {
  if (!value) return 'Email is required';
  if (!value.includes('@')) return 'Email format is invalid';
  return null;
}

export function validatePassword(value: string): string | null {
  if (!value) return 'Password is required';
  if (value.length < 8) return 'Password must be at least 8 characters';
  return null;
}

export function validateConfirmPassword(pass: string, confirm: string): string | null {
  return pass === confirm ? null : 'Passwords do not match';
}

export function validateField(value: string, rules: ValidationRules): string | null {
  if (rules.required && !value.trim()) return 'This field is required';
  return null;
}
