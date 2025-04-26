export interface ILogRepository {
    createLog(logData: any): Promise<any>;

    getLogById(logId: string, queryData: any): Promise<any>;

    getAllLogs(queryData: any): Promise<any>;

    updateLogById(logId: string, logData: any): Promise<any>;

    deleteLogById(logId: string): Promise<any>;
}