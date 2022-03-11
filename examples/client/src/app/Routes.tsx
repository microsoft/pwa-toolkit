/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { FC, memo } from 'react'
import { Route, Routes as R } from 'react-router-dom'

import NotesPage from '../pages/notes/Notes'
import Layout from './Layout'

const CreateNote = React.lazy(
  async () => await import('../pages/createNote/CreateNote'),
)
const Note = React.lazy(async () => await import('../pages/notes/note/Note'))
const Login = React.lazy(async () => await import('../pages/login/Login'))
const HelloWorld = React.lazy(
  async () => await import('../pages/helloWorld/helloWorld'),
)

const Routes: FC = function Routes() {
  return (
    <R>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<NotesPage />}>
          <Route
            path=":noteId"
            element={
              <React.Suspense fallback={<>Loading...</>}>
                <Note />
              </React.Suspense>
            }
          />
        </Route>
        <Route
          path="/helloWorld"
          element={
            <React.Suspense fallback={<>Loading....</>}>
              <HelloWorld />
            </React.Suspense>
          }
        />
        <Route
          path="/create-note"
          element={
            <React.Suspense fallback={<>Loading...</>}>
              <CreateNote />
            </React.Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <React.Suspense fallback={<>Loading...</>}>
              <Login />
            </React.Suspense>
          }
        />
      </Route>
    </R>
  )
}

export default memo(Routes)
