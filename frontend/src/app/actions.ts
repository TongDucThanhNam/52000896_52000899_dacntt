'use server'
import {cookies} from "next/headers"
import {Interaction, Product, ProductAttributes, Transaction, UserProfile, Variant} from "@/types";

//------------------------------------------------------------------------------
export async function getProduct(id: string): Promise<Product> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`, {
            headers: {
                Accept: "application/json",
            },
        })

        if (!res.ok) {
            console.error("Lỗi khi tải thông tin sản phẩm:", res.statusText)
            if (res.status === 500) {
                throw new Error("Lỗi Server")
            }
            throw new Error(`Lỗi: ${res.status}`)
        }

        return await res.json()


    } catch (error) {
        console.error("Lỗi khi tải thông tin sản phẩm:", error)
        throw error
    }
}


export async function createProduct(productData: Omit<Product, '_id' | 'productId'>) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/variants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            throw new Error(`Failed to create product: ${response.status} - ${response.statusText}`);
        }

        const createdProduct = await response.json();

        return {
            success: true,
            productId: createdProduct.productId,
            message: 'Product and variants created successfully'
        };

    } catch (error) {
        console.error('Error creating product:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to create product'
        };
    }
}

export async function updateProduct(productData: Product) {
    try {
        // console.log('Updating product:', productData)
        await updateProductDetails(productData.productId, {
            productName: productData.productName,
            productSlug: "",
            productDescription: productData.productDescription,
            productBrand: productData.productBrand,
            imageUrls: productData.imageUrls,
            categoryId: productData.categoryId,
            productTag: productData.productTag,
            productAvgRating: 0,
            productTotalViews: 0,
        })
        // Update variants
        if (!productData.variants) {
            return {
                success: false,
                error: 'No variants found'
            }
        }

        for (const variant of productData.variants) {
            if (variant._id) {
                // Existing variant, update it
                await updateVariant(variant._id, variant)
            } else {
                // New variant, create it
                await createVariant(productData.productId, variant)
            }
        }
        return {success: true}
    } catch (error) {
        console.error('Error updating product:', error)
        return {success: false, error: 'Failed to update product'}
    }
}

async function updateProductDetails(id: string, productData: ProductAttributes) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "productName": productData.productName,
                "productDescription": productData.productDescription,
                "productBrand": productData.productBrand,
                "imageUrls": productData.imageUrls,
                "categoryId": productData.categoryId,
                "productAvgRating": productData.productAvgRating,
                "productTotalViews": productData.productTotalViews
            })
    })

    if (!res.ok) {
        throw new Error('Failed to update product')
    }

    return res.json()
}

async function updateVariant(variantId: string, variantData: Variant) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/variants/${variantId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "variantSku": variantData.variantSku,
            "variantName": variantData.variantName,
            "variantKeyIndex": variantData.variantKeyIndex,
            "variantImageUrl": variantData.variantImageUrl,
            "variantSize": variantData.variantSize,
            "variantColor": variantData.variantColor,
            "variantStyle": variantData.variantStyle,
            "variantMaterial": variantData.variantMaterial,
            "variantSeason": variantData.variantSeason,
            "variantPrice": variantData.variantPrice,
            "variantPromotionPrice": variantData.variantPromotionPrice,
            "variantStockQuantity": variantData.variantStockQuantity,
        })
    })

    if (!res.ok) {
        throw new Error('Failed to update variant')
    }

    return res.json()
}

async function createVariant(productId: string, variantData: Variant) {
    console.log('Creating variant:', productId, variantData)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${productId}/variants`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "variantSku": variantData.variantSku,
                "variantName": variantData.variantName,
                "variantKeyIndex": variantData.variantKeyIndex,
                "variantImageUrl": variantData.variantImageUrl,
                "variantSize": variantData.variantSize,
                "variantColor": variantData.variantColor,
                "variantStyle": variantData.variantStyle,
                "variantMaterial": variantData.variantMaterial,
                "variantSeason": variantData.variantSeason,
                "variantPrice": variantData.variantPrice,
                "variantPromotionPrice": variantData.variantPromotionPrice,
                "variantStockQuantity": variantData.variantStockQuantity,
            }
        )
    })

    if (!res.ok) {
        throw new Error('Failed to create variant')
    }
}

export async function fetchProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, {
            headers: {
                Accept: "application/json",
            },
        })

        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`)
        }

        return res.json()
    } catch (error) {
        console.error("Error fetching products:", error)
        throw new Error("Failed to load products. Please try again later.")
    }
}


export async function getVariantsOfProduct(productId: string): Promise<Variant[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${productId}/variants`, {
            headers: {
                Accept: "application/json",
            },
        })

        if (!res.ok) {
            if (res.status === 500) {
                throw new Error("Internal server error. Please try again later.")
            }
            throw new Error(`HTTP error! status: ${res.status}`)
        }

        return await res.json()
    } catch (error) {
        console.error("Error fetching product variants:", error)
        throw error
    }
}

//------------------------------------------------------------------------------
export async function register(formData: FormData) {
    const data = {
        userName: formData.get("userName"),
        userPasswordHash: formData.get("userPasswordHash"),
        userEmail: formData.get("userEmail"),
        userPhone: formData.get("userPhone"),
        userHeight: Number(formData.get("userHeight")),
        userWeight: Number(formData.get("userWeight")),
        userDateOfBirth: formData.get("userDateOfBirth"),
        userAddress: formData.get("userAddress"),
        userImageUrl: formData.get("userImageUrl"),
        userGender: formData.get("userGender"),
        userJob: formData.get("userJob"),
        userCity: formData.get("userCity"),
    }

    console.log('Registering user:', data)

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const errorData = await response.json()
            return {error: errorData.message || "Đăng ký thất bại"}
        }

        const result = await response.json()
        return {success: true, data: result}
    } catch (error) {
        console.error("Registration error:", error)
        return {error: "Đã xảy ra lỗi khi đăng ký"}
    }
}

export async function login(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userEmail: email,
                userPasswordHash: password,
            }),
        })

        if (res.ok) {
            const data = await res.json()
            if (data.accessToken) {
                // set cookies
                (await cookies()).set('token', data.accessToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                    maxAge: 60 * 60 * 24 // 1 day
                })

                return {success: true, token: data.accessToken}
            } else {
                throw new Error("Token not received from server")
            }
        } else {
            const errorData = await res.json()
            return {error: errorData.message || "Đăng nhập thất bại"}
        }
    } catch (error) {
        console.error("Login error:", error)
        return {error: "Có lỗi xảy ra, vui lòng thử lại sau"}
    }
}

export async function logout() {
    (await cookies()).delete('token')
}

//------------------------------------------------------------------------------
export async function fetchUsers(): Promise<UserProfile[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, {})
    if (!response.ok) throw new Error('Failed to fetch users')
    return response.json()
}

export async function getUserProfile(token: string): Promise<UserProfile | null> {
    // console.log('Getting user profile', token)
    if (!token) {
        return null
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!res.ok) {
            throw new Error("Failed to fetch user profile")
            //clean local storage
        }

        const data = await res.json()
        return {
            _id: data._id,
            userCity: data.userCity,
            userRole: data.userRole,
            userName: data.userName,
            userPasswordHash: data.userPasswordHash,
            userEmail: data.userEmail,
            userPhone: data.userPhone,
            userHeight: data.userHeight,
            userWeight: data.userWeight,
            userDateOfBirth: data.userDateOfBirth,
            userAddress: data.userAddress,
            userImageUrl: data.userImageUrl,
            userGender: data.userGender,
            userJob: data.userJob
        }
    } catch (error) {
        console.error("Error fetching user profile:", error)
        return null
    }
}

export async function createUser(userData: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })

    if (!response.ok) {
        const errorData = await response.json()
        return {error: errorData.message || "Đăng ký thất bại"}
    }

    return await response.json()
}

export async function updateUser(userId: string, userData: any): Promise<UserProfile> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })

    if (!response.ok) {
        throw new Error("Failed to update user")
    }

    return await response.json()
}

//------------------------------------------------------------------------------
export async function checkoutCart(items: any[], total: number, userId: string, paymentMethod: string = "cash") {
    try {
        console.log('Checking out cart:', items, total, userId)

        const checkoutData = {
            userId,
            orderStatus: "pending",
            totalValue: total,
            paymentMethod: paymentMethod,
            items: items.map((item) => ({
                productId: item.productId,
                variantId: item.variantId,
                quantity: item.quantity,
                purchasePrice: item.variantPromotionPrice,
            })),
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transactions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkoutData),
        })

        if (!response.ok) {
            throw new Error("Checkout failed")
        }

        const data = await response.json()
        return {success: true, data}
    } catch (error) {
        console.error("Checkout error:", error)
        return {success: false, error: "Checkout failed. Please try again."}
    }
}

export async function fetchTransactions(): Promise<Transaction[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transactions`, {
        cache: 'no-store'
    })
    if (!response.ok) throw new Error('Failed to fetch transactions')
    return response.json()
}

export async function fetchUserTransactions(key: string): Promise<Transaction[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${key}`, {
        cache: 'no-store'
    })
    if (!response.ok) throw new Error('Failed to fetch user transactions')
    return response.json()
}

export async function fetchTransactionItems(url: string): Promise<any> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
        cache: 'no-store'
    })
    if (!response.ok) throw new Error('Failed to fetch transaction items')
    return response.json()
}

//------------------------------------------------------------------------------
export async function fetchRecommendations(url: string): Promise<any> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_AI_URL}${url}`, {})
    if (!response.ok) throw new Error('Failed to fetch recommendations')
    return response.json()
}

//------------------------------------------------------------------------------
export async function trackInteractionAction(interaction: Interaction) {
    try {
        // console.log("##Tracking interaction:", interaction)
        const response = await fetch(`${process.env.BACKEND_URL}/api/interactions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: interaction.userId,
                productId: interaction.productId,
                variantId: interaction.variantId,
                interactionType: interaction.interactionType,
                interactionScore: interaction.interactionScore,
                interactionContent: interaction.interactionContent,
            })
        })

        if (!response.ok) {
            throw new Error("Failed to track interaction")
        }

        const data = await response.json()
        console.log("Track success", data)
        return {success: true, data}
    } catch (error) {
        console.error("Error tracking interaction:", error)
        return {success: false, error: error instanceof Error ? error.message : "An unknown error occurred"}
    }
}