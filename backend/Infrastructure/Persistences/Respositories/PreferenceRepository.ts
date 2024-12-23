import type {ClientSession} from "mongoose";
import {PreferenceWithBase} from "../../../Domain/Entities/PreferenceEntities.ts";
import type {IPreferenceRepository} from "../../../Application/Persistences/IRepositories/IPreferenceRepository.ts";

class PreferenceRepository implements IPreferenceRepository {
    async createPreference(preferenceData: any, session: ClientSession): Promise<typeof PreferenceWithBase> {
        try {
            const preference: any = await PreferenceWithBase.create([preferenceData], {session: session});
            return preference;
        } catch (error) {
            throw new Error("Error at PreferenceRepository: " + error);
        }
    }

    async getPreferenceById(preferenceId: string, queryData: any): Promise<typeof PreferenceWithBase | null> {
        try {
            const preference: any = await PreferenceWithBase.findById(preferenceId);
            return preference;
        } catch (error) {
            throw new Error("Error at PreferenceRepository: " + error);
        }
    }

    async updatePreferenceById(preferenceId: string, preferenceData: any, session: ClientSession): Promise<typeof PreferenceWithBase | null> {
        try {
            const preference: any = await PreferenceWithBase.findByIdAndUpdate(preferenceId, preferenceData, {
                new: true,
                session: session
            });
            return preference;
        } catch (error) {
            throw new Error("Error at PreferenceRepository: " + error);
        }
    }

    async deletePreferenceById(preferenceId: string, session: ClientSession): Promise<typeof PreferenceWithBase | null> {
        try {
            const preference: any = await PreferenceWithBase.findByIdAndUpdate(preferenceId, {
                isActive: false,
                isDeleted: true
            }, {
                new: true,
                session: session
            });
            return preference;
        } catch (error) {
            throw new Error("Error at PreferenceRepository: " + error);
        }
    }

    async getPreferencesByUserId(userId: string, queryData: any): Promise<typeof PreferenceWithBase[] | null> {
        try {
            const preferences: any = await PreferenceWithBase.find({userId: userId});
            return preferences;
        } catch (error) {
            throw new Error("Error at PreferenceRepository: " + error);
        }
    }
}

export default PreferenceRepository;