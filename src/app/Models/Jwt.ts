export interface Jwt {
    exp: BigInteger,
    iat: BigInteger,
    id: number,
    role: string,
    sub: string,
}