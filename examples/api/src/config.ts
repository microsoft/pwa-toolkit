import * as dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import path from 'path'

const env = dotenv.config({
  path: path.resolve(__dirname, `../.env`),
})
dotenvExpand(env)
