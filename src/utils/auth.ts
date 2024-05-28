import { hash, compare } from "bcrypt-ts";
import { sign, verify } from "jsonwebtoken";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isVerify = await compare(password, hashedPassword);
  return isVerify;
}

export function generateAccessToken(data: object) {
  const accessToken = sign(
    { ...data },
    process.env.ACCESS_TOKEN_SECRET_KEY as string,
    {
      expiresIn: "60s",
    }
  );

  return accessToken;
}

export function generateRefreshToken(data: object) {
  const refreshToken = sign(
    { ...data },
    process.env.REFRESH_TOKEN_SECRET_KEY as string,
    {
      expiresIn: "14d",
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
    return false;
  }
}
