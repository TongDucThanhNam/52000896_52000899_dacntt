// IPreferenceRepository
import type {ClientSession} from "mongoose";
import type {PreferenceWithBase} from "../../../Domain/Entities/PreferenceEntities.ts";

export interface IPreferenceRepository {
    createPreference(preferenceData: any, session: ClientSession): Promise<typeof PreferenceWithBase>;

    getPreferenceById(preferenceId: string, queryData: any): Promise<typeof PreferenceWithBase | null>;

    updatePreferenceById(preferenceId: string, preferenceData: any, session: ClientSession): Promise<typeof PreferenceWithBase | null>;

    deletePreferenceById(preferenceId: string, session: ClientSession): Promise<typeof PreferenceWithBase | null>;

    getPreferencesByUserId(userId: string, queryData: any): Promise<typeof PreferenceWithBase[] | null>;
}