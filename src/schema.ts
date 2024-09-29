import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('user', {
  id: text('id').primaryKey().$defaultFn(() => Math.random().toString(36).substring(2, 15)),
  username: text('username').notNull(),
  password: text('password').notNull(),
})
