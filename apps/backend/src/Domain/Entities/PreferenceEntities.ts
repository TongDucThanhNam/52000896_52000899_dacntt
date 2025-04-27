import { integer, sqliteTable, text, numeric } from 'drizzle-orm/sqlite-core';
import { baseColumns } from './BaseEntities';

// Define the 'preferences' table schema
export const preferences = sqliteTable('preferences', {
    id: integer('id').primaryKey({ autoIncrement: true }), // Primary key with auto-increment
    userId: integer('user_id').notNull(), // Foreign key to the user table
    preferenceType: text('preference_type').notNull(), // Type of the preference
    preferenceValue: text('preference_value').notNull(), // Value of the preference
    preferenceScore: numeric('preference_score').notNull(), // Score of the preference
    ...baseColumns // Include base columns from BaseEntities
});

// Define the Preference type based on the 'preferences' table schema
export type Preference = typeof preferences.$inferSelect;