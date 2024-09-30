import type {
  ActionGetResponse,
} from '@solana/actions'

import { cors } from '@elysiajs/cors'

import swagger from '@elysiajs/swagger'
import {
  ActionPostRequest,
  ActionPostResponse,
  createActionHeaders,
  createPostResponse,
} from '@solana/actions'
import { Elysia, t } from 'elysia'

const headers = createActionHeaders({
  chainId: 'devnet', // or chainId: "devnet"
})

const app = new Elysia()
  .use(swagger())
  .use(cors())
  .get('/blink', () => {
    const payload: ActionGetResponse = {
      title: 'Actions Example - Simple On-chain Memo',
      icon: 'https://ucarecdn.com/7aa46c85-08a4-4bc7-9376-88ec48bb1f43/-/preview/880x864/-/quality/smart/-/format/auto/',
      description: 'Send a message on-chain using a Memo',
      label: 'Send Memo',
      links: {
        actions: [
          {
            label: '1 SOL', // button text
            href: '/api/donate?amount=10',
            type: 'post',
            // no `parameters` therefore not a text input field
          },
          {
            label: '5 SOL', // button text
            href: '/api/donate?amount=100',
            type: 'post',
            // no `parameters` therefore not a text input field
          },
          {
            label: '10 SOL', // button text
            href: '/api/donate?amount=1000',
            type: 'post',
            // no `parameters` therefore not a text input field
          },
        ],
      },
    }

    return Response.json(payload, {
      headers,
    })
  })
  .listen(3210)

// eslint-disable-next-line no-console
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
