import type {IBaseUnitOfWork} from "./IBaseUnitOfWork";
import type {IUserRepository} from "./IUserRepository.ts";
import type {ILogRepository} from "./ILogRepository.ts";
import type {ICategoryRepository} from "./ICategoryRepository.ts";
import type {IProductRepository} from "./IProductRepository.ts";
import type {ITagRepository} from "./ITagRepository.ts";
import type {IInteractionRepository} from "./IInteractionRepository.ts";
import type {IVariantRepository} from "./IVariantRepository.ts";
import type {ICartItemRepository} from "./ICartItemRepository.ts";
import type {ICartRepository} from "./ICartRepository.ts";
import type {IPreferenceRepository} from "./IPreferenceRepository.ts";
import type {IProductTagRepository} from "./IProductTagRepository.ts";
import type {ITransactionRepository} from "./ITransactionRepository.ts";
import type {ITransactionItemRepository} from "./ITransactionItemRepository.ts";

export interface IUnitOfWork extends IBaseUnitOfWork {
    // cartItemRepository: ICartItemRepository;
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
}