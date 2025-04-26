import type {ICategoryRepository} from "../../../Application/Persistences/IRepositories/ICategoryRepository";
import type {IInteractionRepository} from "../../../Application/Persistences/IRepositories/IInteractionRepository";
import type {IProductRepository} from "../../../Application/Persistences/IRepositories/IProductRepository";
import type {ITagRepository} from "../../../Application/Persistences/IRepositories/ITagRepository";
import type {IUnitOfWork} from "../../../Application/Persistences/IRepositories/IUnitOfWork";
import type {IUserRepository} from "../../../Application/Persistences/IRepositories/IUserRepository";
import type {IVariantRepository} from "../../../Application/Persistences/IRepositories/IVariantRepository";
import {BaseUnitOfWork} from "./BaseUnitOfWork";
import LogRepository from "./LogRepository";
import type {ILogRepository} from "../../../Application/Persistences/IRepositories/ILogRepository.ts";
import CategoryRepository from "./CategoryRepository";
import ProductRepository from "./ProductRepository";
import TagRepository from "./TagRepository";
import InteractionRepository from "./InteractionRepository";
import VariantRepository from "./VariantRepository";
import UserRepository from "./UserRepository";
import type {ICartItemRepository} from "../../../Application/Persistences/IRepositories/ICartItemRepository.ts";
import type {ICartRepository} from "../../../Application/Persistences/IRepositories/ICartRepository.ts";
import type {IPreferenceRepository} from "../../../Application/Persistences/IRepositories/IPreferenceRepository.ts";
import type {IProductTagRepository} from "../../../Application/Persistences/IRepositories/IProductTagRepository.ts";
import type {
    ITransactionItemRepository
} from "../../../Application/Persistences/IRepositories/ITransactionItemRepository.ts";
import type {ITransactionRepository} from "../../../Application/Persistences/IRepositories/ITransactionRepository.ts";
import CartItemRepository from "./CartItemRepository";
import CartRepository from "./CartRepository";
import PreferenceRepository from "./PreferenceRepository";
import ProductTagRepository from "./ProductTagRepository";
import TransactionItemRepository from "./TransactionItemRepository";
import TransactionRepository from "./TransactionRepository";
import type { Env } from "../../../index";

export class UnitOfWork extends BaseUnitOfWork implements IUnitOfWork {
    cartItemRepository: ICartItemRepository;
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

    constructor(env: Env) {
        super(env);

        // Note: These repositories need to be updated to use Drizzle D1 instead of Mongoose
        // For now, we're keeping the existing implementations, but they will need to be updated
        // to work with the Drizzle D1 database instance provided by getDb()
        this.cartItemRepository = new CartItemRepository();
        // this.cartRepository = new CartRepository();
        this.categoryRepository = new CategoryRepository();
        this.interactionRepository = new InteractionRepository();
        this.logRepository = new LogRepository();
        this.preferenceRepository = new PreferenceRepository();
        this.productRepository = new ProductRepository();
        this.productTagRepository = new ProductTagRepository();
        this.tagRepository = new TagRepository();
        this.transactionItemRepository = new TransactionItemRepository();
        this.transactionRepository = new TransactionRepository();
        this.userRepository = new UserRepository();
        this.variantRepository = new VariantRepository();
    }
}
