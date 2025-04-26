export interface IPreferenceRepository {
    createPreference(preferenceData: any): Promise<any>;

    getPreferenceById(preferenceId: string, queryData: any): Promise<any>;

    updatePreferenceById(preferenceId: string, preferenceData: any): Promise<any>;

    deletePreferenceById(preferenceId: string): Promise<any>;

    getPreferencesByUserId(userId: string, queryData: any): Promise<any>;
}