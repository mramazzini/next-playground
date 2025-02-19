"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const expiration = "1 week";
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// we generate a token when they login or signup
// its stored in cookies and sent with every request
export const generateToken = async (id: string) => {
  const jwt = await new SignJWT();
  const token = await jwt
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setSubject(id.toString())
    .setExpirationTime(expiration)
    .sign(secret);

  (await cookies()).set("token", token, {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    httpOnly: true, // prevent client-side access
    sameSite: "strict", // only send on same site
  });

  return token;
};

// we destroy the token when they logout
export const destroySession = async () => {
  (await cookies()).set("token", "", {
    maxAge: 0,
  });
};

// we verify the token when they make a request
// if the token is valid, we know they are logged in

export const verifyToken = async () => {
  try {
    const token = (await cookies()).get("token");
    if (!token) return false;

    const { payload } = await jwtVerify(token.value, secret);
    if (!payload) return false;

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getUserId = async () => {
  try {
    const token = (await cookies()).get("token");

    if (!token) return null;

    const { payload } = await jwtVerify(token.value, secret);
    if (!payload) return null;
    if (payload.sub) {
      return payload.sub;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const isAdministrator = async () => {
  const userId = await getUserId();
  return process.env.ADMIN_ID === userId;
};
