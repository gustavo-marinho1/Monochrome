import jwt from "jsonwebtoken";

const COOKIE_ACCESS_TOKEN = "access_token";
const COOKIE_REFRESH_TOKEN = "refresh_token"

async function generateAccessToken(id: string) {
  const accessToken = jwt.sign(
    { id },
    String(process.env.ACCESS_SECRET),
    { expiresIn: '15minutes' }
  );
  return accessToken;
}

async function generateRefreshToken(id: string) {
  const refreshToken = jwt.sign(
    { id },
    String(process.env.REFRESH_SECRET),
    { expiresIn: '1week' }
  );
  return refreshToken;
}

const isAccessTokenValid = (token: string) => {
  try {
    jwt.verify(token, String(process.env.ACCESS_SECRET));
    return true
  }
  catch (error) {
    return false
  }
};

const isRefreshTokenValid = (token: string) => {
  try {
    jwt.verify(token, String(process.env.REFRESH_SECRET));
    return true
  }
  catch (error) {
    return false
  }
};

export {
  generateAccessToken, generateRefreshToken,
  isAccessTokenValid, isRefreshTokenValid,
  COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN
}