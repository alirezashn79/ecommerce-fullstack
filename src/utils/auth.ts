import { compare, hash } from "bcrypt-ts";
import { sign, verify } from "jsonwebtoken";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isVerify = await compare(password, hashedPassword);
  return isVerify;
}

export function generateAccessToken(data: { phone: string }) {
  const accessToken = sign(
    { ...data },
    process.env.ACCESS_TOKEN_SECRET_KEY as string,
    {
      expiresIn: 30,
    }
  );

  return accessToken;
}

export function generateRefreshToken(data: { phone: string }) {
  const refreshToken = sign(
    { ...data },
    process.env.REFRESH_TOKEN_SECRET_KEY as string,
    {
      expiresIn: "1h",
    }
  );

  return refreshToken;
}

export function verifyToken(token: string) {
  try {
    const tokenPayload = verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY as string
    );
    return tokenPayload;
  } catch (error) {
    console.log("verify token error...!", error);
    return false;
  }
}

export function verifyRefreshToken(token: string) {
  try {
    const tokenPayload = verify(
      token,
      process.env.REFRESH_TOKEN_SECRET_KEY as string
    );
    return tokenPayload;
  } catch (error) {
    console.log("verify refresh token error...!", error);
    return false;
  }
}

export const valiadteEmail = (email: string) => {
  const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
  return pattern.test(email);
};

export const valiadtePhone = (phone: string) => {
  const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
  return pattern.test(phone);
};

// const valiadtePassword = (password) => {
//   const pattern =
//     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
//   return pattern.test(password);
// };
