import type {IPreferenceRepository} from "../../../Application/Persistences/IRepositories/IPreferenceRepository.ts";
import {getDb} from "../Config/db";
import {preferences} from "../../../Domain/Entities/schema";
import {eq} from 'drizzle-orm';

class PreferenceRepository implements IPreferenceRepository {
    private db: any =  getDb();

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
            const preference: any = await this.db.update(preferences)
                .set({
                    isActive: false,
                    isDeleted: true,
                    updatedAt: new Date().toISOString()
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
