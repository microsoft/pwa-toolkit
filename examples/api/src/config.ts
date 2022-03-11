/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import * as dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import path from 'path'

const env = dotenv.config({
  path: path.resolve(__dirname, `../.env`),
})
dotenvExpand(env)
