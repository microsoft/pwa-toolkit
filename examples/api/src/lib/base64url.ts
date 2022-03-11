/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
export function base64ToBase64url(base64Text: string): string {
  return base64Text.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

export function base64urlToBase64(base64urlText: string): string {
  return base64urlText.padEnd(
    base64urlText.length + (4 - (base64urlText.length % 4)),
    '=',
  )
}
