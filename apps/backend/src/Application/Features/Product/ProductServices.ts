import type { IProductServices } from "../../Persistences/IServices/IProductServices";
import type { IUnitOfWork } from "../../Persistences/IRepositories/IUnitOfWork";
import { UnitOfWorkFactory } from "../../../Infrastructure/Persistences/Factories/UnitOfWorkFactory.js";

class ProductServices implements IProductServices {
  private get unitOfWork(): IUnitOfWork {
    return UnitOfWorkFactory.getInstance().createUnitOfWork();
  }

  async addTagToProduct(data: any): Promise<any> {
    try {
      const tag =
        await this.unitOfWork.productTagRepository.createProductTag(data);
      return tag;
    } catch (error) {
      throw new Error(`Error at ProductServices.addTagToProduct: ${error}`);
    }
  }

  async createCategory(data: any): Promise<any> {
    try {
      const category =
        await this.unitOfWork.categoryRepository.createCategory(data);
      return category;
    } catch (error) {
      throw new Error(`Error at ProductServices.createCategory: ${error}`);
    }
  }

  async createProduct(data: any): Promise<any> {
    try {
      const product =
        await this.unitOfWork.productRepository.createProduct(data);
      return product[0];
    } catch (error) {
      throw Error(`Error at ProductServices.createProduct: ${error}`);
    }
  }

  async createVariant(data: any): Promise<any> {
    try {
      const variant =
        await this.unitOfWork.variantRepository.createVariant(data);
      return variant;
    } catch (error) {
      throw new Error(`Error at ProductServices.createVariant: ${error}`);
    }
  }

  async deleteProduct(data: any): Promise<any> {
    try {
      const product =
        await this.unitOfWork.productRepository.deleteProductById(data);
      return product;
    } catch (error) {
      throw new Error(`Error at ProductServices.deleteProduct: ${error}`);
    }
  }

  async deleteVariant(data: any): Promise<any> {
    try {
      const variant =
        await this.unitOfWork.variantRepository.deleteVariantById(data);
      return variant;
    } catch (error) {
      throw new Error(`Error at ProductServices.deleteVariant: ${error}`);
    }
  }

  async getAllProducts(data: any): Promise<any> {
    try {
      const { page, limit, ...restData } = data;

      const queryData = {
        ...restData,
      };

      const products =
        await this.unitOfWork.productRepository.getAllProducts(queryData);
      const result = products.map((product: any) => ({
        ...product,
        imageUrls: JSON.parse(product.imageUrls),
      }));
      return result;
    } catch (error) {
      throw new Error(`Error at ProductServices.getAllProducts: ${error}`);
    }
  }

  async getCategories(data: any): Promise<any> {
    try {
      const categories =
        await this.unitOfWork.categoryRepository.getAllCategories(data);
      return categories;
    } catch (error) {
      throw new Error(`Error at ProductServices.getCategories: ${error}`);
    }
  }

  async getProductById(data: any): Promise<any> {
    try {
      const queryData = {
        isDeleted: false,
        isActive: true,
      };
      const product = await this.unitOfWork.productRepository.getProductById(
        data,
        queryData,
      );
      if (product) {
        return {
          ...product,
          imageUrls: JSON.parse(product.imageUrls),
        };
      }
      return product;
    } catch (error) {
      throw new Error(`Error at ProductServices.getProductById: ${error}`);
    }
  }

  async getProductByVariantId(data: any): Promise<any> {
    try {
      const queryData = {
        isDeleted: false,
        isActive: true,
      };
      const variant: any =
        await this.unitOfWork.variantRepository.getVariantById(data, queryData);
      if (!variant) {
        return null;
      }
      const productId = variant.productId;
      const product = await this.unitOfWork.productRepository.getProductById(
        productId,
        queryData,
      );
      if (product) {
        return {
          ...product,
          imageUrls: JSON.parse(product.imageUrls),
        };
      }
      return product;
    } catch (error) {
      throw new Error(
        `Error at ProductServices.getProductByVariantId: ${error}`,
      );
    }
  }

  async createTag(data: any): Promise<any> {
    try {
      const tag =
        await this.unitOfWork.productTagRepository.createProductTag(data);
      return tag;
    } catch (error) {
      throw new Error(`Error at ProductServices.createTag: ${error}`);
    }
  }

  async getProductsByTag(data: any): Promise<any> {
    try {
      //TODO: implement this
      // const products = await this.unitOfWork.productTagRepository.getProductsByTag(data);
      // const result = products.map((product: any) => ({
      //     ...product,
      //     imageUrls: JSON.parse(product.imageUrls),
      // }));
      // return result;

      return null;
    } catch (error) {
      throw new Error(`Error at ProductServices.getProductsByTag: ${error}`);
    }
  }

  async getVariantsByProduct(data: any): Promise<any> {
    try {
      const queryData = {
        productId: data,
        isDeleted: false,
        isActive: true,
      };
      const variants =
        await this.unitOfWork.variantRepository.getAllVariants(queryData);
      return variants;
    } catch (error) {
      throw new Error(
        `Error at ProductServices.getVariantsByProduct: ${error}`,
      );
    }
  }

  async removeTagFromProduct(data: any): Promise<any> {
    try {
      const { productId, tagId } = data;
      await this.unitOfWork.productTagRepository.deleteProductTag(
        productId,
        tagId,
      );
    } catch (error) {
      throw new Error(
        `Error at ProductServices.removeTagFromProduct: ${error}`,
      );
    }
  }

  async updateCategory(data: any): Promise<any> {
    try {
      const { categoryId, ...restData } = data;
      const category =
        await this.unitOfWork.categoryRepository.updateCategoryById(
          categoryId,
          restData,
        );
      return category;
    } catch (error) {
      throw new Error(`Error at ProductServices.updateCategory: ${error}`);
    }
  }

  async updateProduct(data: any): Promise<any> {
    try {
      const session = await this.unitOfWork.startTransaction();

      const { productId, ...restData } = data;
      const product = await this.unitOfWork.productRepository.updateProductById(
        productId,
        restData,
      );
      if (product) {
        return {
          ...product,
        };
      }
      return product;
    } catch (error) {
      throw new Error(`Error at ProductServices.updateProduct: ${error}`);
    }
  }

  async updateVariant(data: any): Promise<any> {
    try {
      const session = await this.unitOfWork.startTransaction();

      const { variantId, ...restData } = data;
      const variant = await this.unitOfWork.variantRepository.updateVariantById(
        variantId,
        restData,
      );
      return variant;
    } catch (error) {
      throw new Error(`Error at ProductServices.updateVariant: ${error}`);
    }
  }

  async createProductWithVariants(data: any): Promise<any> {
    try {
      const { variants, ...productData } = data;

      console.log("productData", productData);
      console.log("variants", variants);

      const product: any =
        await this.unitOfWork.productRepository.createProduct(productData);
      console.log("product", product);
      const resultProduct = product[0];

      // console.log('product', product)
      // console.log('productID', resultProduct.id)

      const variantPromises = variants.map((variant: any) => {
        return this.unitOfWork.variantRepository.createVariant({
          ...variant,
          productId: resultProduct.id,
        });
      });

      await Promise.all(variantPromises);

      if (resultProduct) {
        return [
          {
            ...resultProduct,
          },
        ];
      }
      return product;
    } catch (error) {
      throw new Error(
        `Error at ProductServices.createProductWithVariants: ${error}`,
      );
    }
  }
}

export default ProductServices;
