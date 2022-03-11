/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import '../src/config'

import { Application, Note, Prisma, PrismaClient } from '@prisma/client'
// import deepmerge from 'deepmerge'

// import { generateHmacSigningKey } from '../src/lib/hmac'
// import { hash } from '../src/lib/password'
// import { generateRSAKeys } from '../src/lib/rsa'

const prisma = new PrismaClient()

const app: Prisma.ApplicationCreateInput = {
  name: 'PWA-Toolkit',
}

// const user: Partial<Prisma.UserCreateInput> = {
//   email: process.env.DB_SEED_USER_EMAIL,
//   name: process.env.DB_SEED_USER_NAME,
// }

const note: Prisma.NoteCreateInput = {
  title: 'My First Note',
  content: 'Remember to do something...',
}

async function upsertApplication(): Promise<Application> {
  console.log('Creating Application')

  // const certificate = await generateRSAKeys()
  // const newApp = deepmerge(app, {
  //   certificate: {
  //     publicKey: certificate.publicJWK,
  //     privateKey: certificate.privateJWK,
  //   } as Prisma.JsonObject,
  // })

  const createdApp = await prisma.application.upsert({
    where: {
      name: app.name,
    },
    create: app,
    update: app,
  })

  console.log('Created/updated app:')
  console.dir(createdApp, { depth: null })
  return createdApp
}

// async function upsertUesr(): Promise<User> {
//   console.log('Creating user')

//   const signingKey = await generateHmacSigningKey()
//   const password = await hash(process.env.DB_SEED_USER_PASSWORD)

//   const newUser = deepmerge(user, {
//     password,
//     hmacSigningKey: signingKey as Prisma.JsonObject,
//   })

//   const createdUser = await prisma.user.upsert({
//     where: {
//       email: user.email,
//     },
//     create: newUser,
//     update: user,
//   })

//   console.log('Created/updated users:')
//   console.dir(createdUser, { depth: null })
//   return createdUser
// }

async function upsertNote(): Promise<Note> {
  console.log('Creating note')

  // const createdNote = await prisma.note.upsert({
  //   where: {
  //     title: note.title,
  //   },
  //   create: {
  //     ...note,
  //     author: {
  //       connect: { id: user.id },
  //     },
  //   },
  //   update: {
  //     ...note,
  //     author: {
  //       connect: { id: user.id },
  //     },
  //   },
  // })

  const createdNote = await prisma.note.upsert({
    where: {
      title: note.title,
    },
    create: note,
    update: note,
  })

  console.log('Created/updated note:')
  console.dir(createdNote, { depth: null })
  return createdNote
}

async function main(): Promise<void> {
  await upsertApplication()
  // const newUser = await upsertUesr()
  await upsertNote()
}

main()
  .then(async () => {
    return await prisma.$disconnect()
  })
  .catch(async (ex) => {
    await prisma.$disconnect()
    throw ex
  })
