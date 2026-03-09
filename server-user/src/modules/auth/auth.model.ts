interface JWTUser {
  id: number,
  email: string,
  iat: number,
  exp: number,
}

export type { JWTUser }