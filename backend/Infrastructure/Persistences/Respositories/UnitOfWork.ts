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
import CategoryRepository from "./CategoryRepository.ts";
import ProductRepository from "./ProductRepository.ts";
import TagRepository from "./TagRepository.ts";
import InteractionRepository from "./InteractionRepository.ts";
import VariantRepository from "./VariantRepository.ts";
import UserRepository from "./UserRepository.ts";
import type {ICartItemRepository} from "../../../Application/Persistences/IRepositories/ICartItemRepository.ts";
import type {ICartRepository} from "../../../Application/Persistences/IRepositories/ICartRepository.ts";
import type {IPreferenceRepository} from "../../../Application/Persistences/IRepositories/IPreferenceRepository.ts";
import type {IProductTagRepository} from "../../../Application/Persistences/IRepositories/IProductTagRepository.ts";
import type {
    ITransactionItemRepository
} from "../../../Application/Persistences/IRepositories/ITransactionItemRepository.ts";
import type {ITransactionRepository} from "../../../Application/Persistences/IRepositories/ITransactionRepository.ts";
import CartItemRepository from "./CartItemRepository.ts";
import CartRepository from "./CartRepository.ts";
import PreferenceRepository from "./PreferenceRepository.ts";
import ProductTagRepository from "./ProductTagRepository.ts";
import TransactionItemRepository from "./TransactionItemRepository.ts";
import TransactionRepository from "./TransactionRepository.ts";

export class UnitOfWork extends BaseUnitOfWork implements IUnitOfWork {
    cartItemRepository: ICartItemRepository;
    cartRepository: ICartRepository;
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


    constructor() {
        super();
        this.cartItemRepository = new CartItemRepository();
        this.cartRepository = new CartRepository();
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