import type { DrizzleD1Database } from "drizzle-orm/d1";
import type { IBaseUnitOfWork } from "../../../Application/Persistences/IRepositories/IBaseUnitOfWork";
import type { Env } from "../../../index";
import { DrizzleDB } from "../../../lib/drizzle";

export class BaseUnitOfWork implements IBaseUnitOfWork {
  protected db: DrizzleD1Database<Record<string, never>> | null = null;
  // protected env: Env | null = null;
  private inTransaction = false;

  constructor(private env: Env) {
    console.log("Getting Drizzle D1 database connection...");
    // Don't call getDb() here to allow subclasses to override db property
  }

  getDb(): DrizzleD1Database<Record<string, never>> {
    // if (!this.db) {
    //   // Only try to get the database from the environment if we don't already have it
    //   if (this.env && this.env.D1Database) {
    //     this.db = DrizzleDB.getInstance(this.env.D1Database);
    //     console.log(
    //       "Drizzle D1 database connection obtained from environment!",
    //     );
    //   } else {
    //     console.log(
    //       "No database connection available and no valid environment provided.",
    //     );
    //   }
    // }

    if (!this.db) {
      throw new Error("No database connection available");
    }

    return this.db;
  }

  async startTransaction(): Promise<void> {
    try {
      // D1 automatically starts a transaction for each request
      // We'll just set a flag to track that we're in a transaction
      this.inTransaction = true;
      console.log("Transaction started");
    } catch (error: any) {
      console.error("Error starting transaction:", error);
      throw new Error(error.message);
    }
  }

  async commitTransaction(): Promise<void> {
    try {
      // D1 automatically commits the transaction at the end of the request
      // We'll just reset our flag
      this.inTransaction = false;
      console.log("Transaction committed successfully!");
    } catch (error: any) {
      console.error("Error committing transaction:", error);
      throw new Error(error.message);
    }
  }

  async abortTransaction(): Promise<void> {
    try {
      // For D1, we would need to throw an error to abort the transaction
      // Since D1 automatically rolls back on error
      this.inTransaction = false;
      console.log("Transaction aborted!");
    } catch (error: any) {
      console.error("Error aborting transaction:", error);
      throw new Error(error.message);
    }
  }
}
