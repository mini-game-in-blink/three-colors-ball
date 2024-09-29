import type { Static } from 'elysia'
import { Elysia, t } from 'elysia'
import swagger from '@elysiajs/swagger'

import { createSelectSchema } from 'drizzle-typebox'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'
import { users } from './schema'

const sqlite = new Database('sqlite.db')
const db = drizzle(sqlite)

const userSchema = createSelectSchema(users)
const insertUserSchema = t.Omit(userSchema, ['id'])
type InsertUserType = Static<typeof insertUserSchema>

function createUser(body: InsertUserType) {
  const newUser = db.insert(users).values(body as any).returning()
  return newUser
}

const app = new Elysia({ prefix: '/auth' })
  .use(swagger())
  .put(
    '/sign-up',
    ({ body }: { body: InsertUserType }) => createUser(body),
    {
      body: insertUserSchema,
    },
  ).listen(3210)

// eslint-disable-next-line no-console
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
