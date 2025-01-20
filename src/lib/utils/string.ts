import { AuthResult } from "../types/types";

export const validateSecureString = (
  str: string,
  confirmStr: string
): AuthResult => {
  if (str !== confirmStr) {
    return AuthResult.PasswordsDoNotMatch;
  }
  if (str.length < 8) {
    return AuthResult.PasswordTooShort;
  }
  return AuthResult.Success;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};
