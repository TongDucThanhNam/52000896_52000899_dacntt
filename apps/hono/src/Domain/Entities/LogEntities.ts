import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { baseColumns } from './BaseEntities';

export const logs = sqliteTable('logs', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id'),
    action: text('action'),
    method: text('method'),
    url: text('url'),
    statusCode: integer('status_code'),
    ipAddress: text('ip_address'),
    deviceId: text('device_id'),
    timeStamp: integer('timestamp', { mode: 'timestamp' }),
    ...baseColumns
});

export type Log = typeof logs.$inferSelect;