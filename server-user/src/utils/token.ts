import jwt from "jsonwebtoken";

const COOKIE_AUTH_TOKEN = "auth_token";

async function generateToken(id: number, email: string) {
  return jwt.sign({id, email}, String(process.env.JWT_SECRET), {
    expiresIn: "1day"
  });
}

const isTokenValid = (token: string) => {
  try {
    jwt.verify(token, String(process.env.JWT_SECRET));
    return true
  }
  catch (error) {
    return false
  }
};

export { generateToken, isTokenValid, COOKIE_AUTH_TOKEN }