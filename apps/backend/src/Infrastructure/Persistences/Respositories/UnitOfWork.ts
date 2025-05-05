import type { ICategoryRepository } from "../../../Application/Persistences/IRepositories/ICategoryRepository";
import type { IInteractionRepository } from "../../../Application/Persistences/IRepositories/IInteractionRepository";
import type { IProductRepository } from "../../../Application/Persistences/IRepositories/IProductRepository";
import type { ITagRepository } from "../../../Application/Persistences/IRepositories/ITagRepository";
import type { IUnitOfWork } from "../../../Application/Persistences/IRepositories/IUnitOfWork";
import type { IUserRepository } from "../../../Application/Persistences/IRepositories/IUserRepository";
import type { IVariantRepository } from "../../../Application/Persistences/IRepositories/IVariantRepository";
import { BaseUnitOfWork } from "./BaseUnitOfWork";
import LogRepository from "./LogRepository";
import type { ILogRepository } from "../../../Application/Persistences/IRepositories/ILogRepository.ts";
import CategoryRepository from "./CategoryRepository";
import ProductRepository from "./ProductRepository";
import TagRepository from "./TagRepository";
import InteractionRepository from "./InteractionRepository";
import VariantRepository from "./VariantRepository";
import UserRepository from "./UserRepository";
import type { ICartItemRepository } from "../../../Application/Persistences/IRepositories/ICartItemRepository.ts";
import type { ICartRepository } from "../../../Application/Persistences/IRepositories/ICartRepository.ts";
import type { IPreferenceRepository } from "../../../Application/Persistences/IRepositories/IPreferenceRepository.ts";
import type { IProductTagRepository } from "../../../Application/Persistences/IRepositories/IProductTagRepository.ts";
import type { ITransactionItemRepository } from "../../../Application/Persistences/IRepositories/ITransactionItemRepository.ts";
import type { ITransactionRepository } from "../../../Application/Persistences/IRepositories/ITransactionRepository.ts";
import PreferenceRepository from "./PreferenceRepository";
import ProductTagRepository from "./ProductTagRepository";
import TransactionItemRepository from "./TransactionItemRepository";
import TransactionRepository from "./TransactionRepository";
import type { Env } from "../../../index";
import type { DrizzleD1Database } from "drizzle-orm/d1";

export class UnitOfWork extends BaseUnitOfWork implements IUnitOfWork {
  // cartRepository: ICartRepository;
  categoryRepository: ICategoryRepository;
  interactionRepository: IInteractionRepository;
  logRepository: ILogRepository;
  preferenceRepository: IPreferenceRepository;
  productRepository: IProductRepository;
  productTagRepository: IProductTagRepository;
  tagRepository: ITagRepository;
  transactionItemRepository: ITransactionItemRepository;
  transactionRepository: ITransactionRepository;
  userRepository: IUserRepository;
  variantRepository: IVariantRepository;

  constructor(envOrDb: Env | DrizzleD1Database<Record<string, never>>) {
    if ("D1Database" in envOrDb) {
      // If envOrDb is an Env object
      super(envOrDb);
    } else {
      // If envOrDb is a DrizzleD1Database object
      super({} as Env); // Pass an empty Env object to BaseUnitOfWork
      // Override the db property in BaseUnitOfWork
      Object.defineProperty(this, "db", {
        value: envOrDb,
        writable: false,
      });
    }

    // Get the database instance
    const db = this.getDb();

    // Pass the database instance to each repository
    this.categoryRepository = new CategoryRepository(db);
    this.interactionRepository = new InteractionRepository(db);
    this.logRepository = new LogRepository(db);
    this.preferenceRepository = new PreferenceRepository(db);
    this.productRepository = new ProductRepository(db);
    this.productTagRepository = new ProductTagRepository(db);
    this.tagRepository = new TagRepository(db);
    this.transactionItemRepository = new TransactionItemRepository(db);
    this.transactionRepository = new TransactionRepository(db);
    this.userRepository = new UserRepository(db);
    this.variantRepository = new VariantRepository(db);
  }
}
