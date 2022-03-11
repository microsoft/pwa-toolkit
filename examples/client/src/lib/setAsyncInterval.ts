/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
const asyncIntervals: Set<() => Promise<unknown>> = new Set()

async function runInterval(
  cb: () => Promise<unknown>,
  interval: number,
): Promise<void> {
  await cb()
  if (asyncIntervals.has(cb)) {
    setTimeout(() => {
      void runInterval(cb, interval)
    }, interval)
  }
}

export function setAsyncInterval(
  cb: () => Promise<unknown>,
  interval: number = 0,
): () => void {
  if (!asyncIntervals.has(cb)) {
    asyncIntervals.add(cb)
  }
  setTimeout(() => {
    void runInterval(cb, interval)
  }, interval)
  return () => {
    if (asyncIntervals.has(cb)) {
      asyncIntervals.delete(cb)
    }
  }
}
