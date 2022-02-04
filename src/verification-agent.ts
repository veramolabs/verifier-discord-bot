// Core interfaces
import { createAgent, IResolver, IMessageHandler } from '@veramo/core'

// Veramo plugin for resolving different DIDs
import { DIDResolverPlugin } from '@veramo/did-resolver'
import { Resolver } from 'did-resolver'
import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
import { getResolver as webDidResolver } from 'web-did-resolver'

// Veramo plugin for verifying data
import { MessageHandler } from '@veramo/message-handler'
import { UrlMessageHandler } from '@veramo/url-handler'
import { JwtMessageHandler } from '@veramo/did-jwt'
import { W3cMessageHandler } from '@veramo/credential-w3c'

// You will need to get a project ID from infura https://www.infura.io
export const INFURA_PROJECT_ID = '6fffe7dc6c6c42459d5443592d3c3afc'

// Construct Veramo agent instance
export const verificationAgent = createAgent<IResolver & IMessageHandler>({
  plugins: [
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...ethrDidResolver({ infuraProjectId: INFURA_PROJECT_ID }),
        ...webDidResolver(),
      }),
    }),
    new MessageHandler({
      messageHandlers: [new UrlMessageHandler(), new JwtMessageHandler(), new W3cMessageHandler()],
    }),
  ],
})
