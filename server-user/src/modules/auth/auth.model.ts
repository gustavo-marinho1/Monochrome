interface JWTUser {
  id: string,
  email: string,
  iat: number,
  exp: number,
}

interface RefreshTokenDB {
  id: string,
  user_id: string,
  token: string,
  expires_at: string,
  created_at: string,
  revoked_at: string
}

export type { JWTUser, RefreshTokenDB }