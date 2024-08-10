import { SignJWT, jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
const hostName = new TextEncoder().encode(process.env.HOST);

export const generateToken = async (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .setIssuer(hostName)
    .sign(secretKey);
};

export const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (e) {
    throw new Error("Invalid or expired token");
  }
};
