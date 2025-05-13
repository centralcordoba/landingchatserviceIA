import jwtDecode from "jwt-decode"

export interface DecodedToken {
  exp: number
  iat?: number
  nbf?: number
  iss?: string
  aud?: string
  sub?: string
  name?: string
  email?: string
  [key: string]: any
}

export function decodeToken(token: string): DecodedToken {
  try {
    return jwtDecode<DecodedToken>(token)
  } catch (error) {
    console.error("Error decoding token:", error)
    throw new Error("Invalid token format")
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeToken(token)
    const currentTime = Math.floor(Date.now() / 1000)
    return decoded.exp < currentTime
  } catch {
    return true // Si hay un error al decodificar, consideramos que el token es inválido
  }
}
