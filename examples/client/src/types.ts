export interface TokenPayload<T = {}> {
  token: string
  payload: T
}

export type TokenProvider<T = {}> = () => Promise<TokenPayload<T> | null>
