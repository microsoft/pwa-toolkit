/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { NexusGenRootTypes } from 'api/dist/graphql/types'

declare global {
  export namespace API {
    type Query = NexusGenRootTypes['Query']
    type Mutation = NexusGenRootTypes['Mutation']
    type Application = NexusGenRootTypes['Application']
    // type JWK = NexusGenRootTypes['JWK']
    type Note = NexusGenRootTypes['Note']
    // type User = NexusGenRootTypes['User']
  }
}
