import {integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {baseColumns} from "./BaseEntities";

export const tags = sqliteTable('tags', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    tagName: text('tag_name'),
    ...baseColumns,
})

export type Tag = typeof tags.$inferSelect;