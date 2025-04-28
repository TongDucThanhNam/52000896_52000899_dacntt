import type {IPreferenceRepository} from "../../../Application/Persistences/IRepositories/IPreferenceRepository";
import {preferences} from "../../../Domain/Entities/PreferenceEntities.js";
import {eq} from 'drizzle-orm';
import { DrizzleD1Database } from "drizzle-orm/d1";

class PreferenceRepository implements IPreferenceRepository {
    private db: DrizzleD1Database<Record<string, never>>;

    constructor(db: DrizzleD1Database<Record<string, never>>) {
        this.db = db;
    }

    async createPreference(preferenceData: any): Promise<any> {
        try {
            const result: any = this.db.insert(preferences).values(preferenceData)
            return result;
        } catch (error) {
            throw new Error("Error at PreferenceRepository: " + error);
        }
    }

    async getPreferenceById(preferenceId: string, queryData: any): Promise<any> {
        try {
            const preference: any = await this.db.select().from(preferences).where(eq(preferences.id, Number(preferenceId)));
            return preference[0] || null;
        } catch (error) {
            throw new Error("Error at PreferenceRepository: " + error);
        }
    }

    async updatePreferenceById(preferenceId: string, preferenceData: any): Promise<any> {
        try {
            const preference: any = await this.db.update(preferences)
                .set({
                    ...preferenceData,
                    updatedAt: new Date().toISOString()
                })
                .where(eq(preferences.id, Number(preferenceId)));
            return preference[0] || null;
        } catch (error) {
            throw new Error("Error at PreferenceRepository: " + error);
        }
    }

    async deletePreferenceById(preferenceId: string): Promise<any> {
        try {
            // TODO: Soft Delete
            const preference: any = await this.db.update(preferences)
                .set({
                })
                .where(eq(preferences.id, Number(preferenceId)));
            return preference[0] || null;
        } catch (error) {
            throw new Error("Error at PreferenceRepository: " + error);
        }
    }

    async getPreferencesByUserId(userId: string, queryData: any): Promise<any> {
        try {
            const preferencesResult: any = await this.db.select().from(preferences).where(eq(preferences.userId, Number(userId)));
            return preferencesResult;
        } catch (error) {
            throw new Error("Error at PreferenceRepository: " + error);
        }
    }
}

export default PreferenceRepository;
