/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export interface TokenPayload<T = {}> {
  token: string
  payload: T
}

export type TokenProvider<T = {}> = () => Promise<TokenPayload<T> | null>
