import type {ILogRepository} from "../../../Application/Persistences/IRepositories/ILogRepository";
import {logs} from "../../../Domain/Entities/LogEntities.js";
import {eq} from "drizzle-orm";
import { DrizzleD1Database } from "drizzle-orm/d1";

class LogRepository implements ILogRepository {
    private db: DrizzleD1Database<Record<string, never>>;

    constructor(db: DrizzleD1Database<Record<string, never>>) {
        this.db = db;
    }

    async createLog(logData: any): Promise<any> {
        try {
            const log: any = await this.db.insert(logs).values(logData)
            return log;
        } catch (error: any) {
            throw new Error("Error at createLog in LogRepository: " + error.message);
        }
    }

    async deleteLogById(logId: string): Promise<any> {
        try {
            const result = await this.db.update(logs)
                .set({
                    isActive: false,
                    isDeleted: true,
                    updatedAt: new Date().toISOString()
                })
                .where(eq(logs.id, parseInt(logId)));

            return result;
        } catch (error: any) {
            throw new Error("Error at deleteLogById in LogRepository: " + error.message);
        }
    }

    async getAllLogs(queryData: any): Promise<any> {
        try {
            const {
                page,
                limit,
                userId,
                // action,
                method,
                url,
                statusCode,
                ipAddress,
                deviceId,
                timeStamp,
                isActive,
                isDeleted
            } = queryData;

            let _page = page;
            if (page === undefined || page < 0) {
                _page = 1;
            }
            let _limit = limit;
            if (limit === undefined || limit < 0) {
                _limit = 10;
            }

            // Build the query
            let query = this.db.select().from(logs);

            // Get all logs matching the conditions to count them
            const allLogs = await query;
            const totalLogs = allLogs.length;

            // Apply pagination
            const paginatedLogs = await query.limit(_limit).offset((_page - 1) * _limit);

            const result: any = {
                currentPage: _page,
                totalPage: Math.ceil(totalLogs / _limit),
                totalItems: paginatedLogs.length,
                perPage: _limit,
                data: paginatedLogs,
            }

            return result;
        } catch (error: any) {
            throw new Error("Error at getAllLogs in LogRepository: " + error.message);
        }
    }

    async getLogById(logId: string, queryData: any): Promise<any> {
        try {
            let query = this.db.select().from(logs).where(eq(logs.id, parseInt(logId)));
            const result = await query;
            return result[0] || null;
        } catch (error: any) {
            throw new Error("Error at getLogById in LogRepository: " + error.message);
        }
    }

    async updateLogById(logId: string, logData: any): Promise<any> {
        try {
            const result = await this.db.update(logs)
                .set({
                    userId: logData.userId,
                    // action: logData.action,
                    method: logData.method,
                    url: logData.url,
                    statusCode: logData.statusCode,
                    ipAddress: logData.ipAddress,
                    deviceId: logData.deviceId,
                    timeStamp: logData.timeStamp,
                    updatedAt: new Date().toISOString()
                })
                .where(eq(logs.id, parseInt(logId)));

            return result;
        } catch (error: any) {
            throw new Error("Error at updateLogById in LogRepository: " + error.message);
        }
    }
}


export default LogRepository;
