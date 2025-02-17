import type {ProductWithBase} from "../../../Domain/Entities/ProductEntities.ts";
import type {VariantWithBase} from "../../../Domain/Entities/VariantEntities.ts";
import type {CategoryWithBase} from "../../../Domain/Entities/CategoryEntities.ts";
import type {ProductTagWithBase} from "../../../Domain/Entities/ProductTagEntities.ts";

export interface IProductServices {
    // Product operations
    createProduct(data: any): Promise<typeof ProductWithBase>;

    getProductById(data: any): Promise<typeof ProductWithBase | null>;

    getProductByVariantId(data: any): Promise<typeof ProductWithBase | null>;

    getAllProducts(data: any): Promise<typeof ProductWithBase[] | null>;

    updateProduct(data: any): Promise<typeof ProductWithBase | null>;

    deleteProduct(data: any): Promise<typeof ProductWithBase | null>;

    createProductWithVariants(data: any): Promise<typeof ProductWithBase>;

    // Variant operations
    createVariant(data: any): Promise<typeof VariantWithBase>;

    getVariantsByProduct(data: any): Promise<typeof VariantWithBase[] | null>;

    updateVariant(data: any): Promise<typeof VariantWithBase | null>;

    deleteVariant(data: any): Promise<typeof VariantWithBase | null>;

    // Category operations
    createCategory(data: any): Promise<typeof CategoryWithBase>;

    getCategories(data: any): Promise<typeof CategoryWithBase[] | null>;

    updateCategory(data: any): Promise<typeof CategoryWithBase | null>;

    // Tag operations
    createTag(data: any): Promise<typeof ProductTagWithBase>;

    addTagToProduct(data: any): Promise<typeof ProductTagWithBase>;

    removeTagFromProduct(data: any): Promise<void>;

    getProductsByTag(data: any): Promise<typeof ProductWithBase[] | null>;
}