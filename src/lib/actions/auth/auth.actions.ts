"use server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { AuthResult } from "@/lib/types/types";
import { generateToken } from "@/lib/utils/auth";
import { createUser } from "../db/User/create.actions";
import { v4 } from "uuid";
import { validateEmail, validateSecureString } from "@/lib/utils/string";

const db = new PrismaClient();

export const login = async (data: {
  emailOrUsername: string;
  password: string;
}): Promise<AuthResult> => {
  const { emailOrUsername, password } = data;

  const user = await db.user.findFirst({
    where: {
      OR: [
        {
          email: emailOrUsername,
        },
        {
          username: emailOrUsername,
        },
      ],
    },
  });

  if (!user) {
    return AuthResult.UserNotFound;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return AuthResult.InvalidCredentials;
  }
  generateToken(user.id);
  return AuthResult.Success;
};

export const signup = async (data: {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}): Promise<AuthResult> => {
  const { email, password, confirmPassword } = data;
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (user) {
    return AuthResult.EmailAlreadyExists;
  }
  if (!validateEmail(email)) {
    return AuthResult.EmailNotValid;
  }
  const passwordError: AuthResult = await validateSecureString(
    password,
    confirmPassword
  );

  if (passwordError !== AuthResult.Success) {
    return passwordError;
  }
  //find if username exists
  const usernameExists = await db.user.findFirst({
    where: {
      username: data.username,
    },
  });

  if (usernameExists) {
    return AuthResult.UserAlreadyExists;
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
  const newUser = await createUser({
    id: v4(),
    email,
    password: hashedPassword,
    username: data.username,
  });

  //   await sendAccountConfirmationEmail(
  //     newUser.email,
  //     await newUser.verificationToken
  //   );
  if (!newUser) {
    return AuthResult.FailedToCreateUser;
  }

  generateToken(newUser.id);

  return AuthResult.Success;
};
