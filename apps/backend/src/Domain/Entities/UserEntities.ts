import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { baseColumns } from './BaseEntities';

// --- User ---
export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userName: text('userName'),
    userPasswordHash: text('userPasswordHash'),
    userEmail: text('userEmail'),
    userPhone: text('userPhone'),
    userHeight: real('userHeight'),
    userWeight: real('userWeight'),
    userDateOfBirth: text('userDateOfBirth'),
    userAddress: text('userAddress'),
    userImageUrl: text('userImageUrl'),
    userGender: text('userGender'),
    userJob: text('userJob'),
    userCity: text('userCity'),
    userRole: text('userRole'),
    ...baseColumns,
});

export type User = typeof users.$inferSelect;