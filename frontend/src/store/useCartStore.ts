import {create} from "zustand"
import {persist} from "zustand/middleware"
import type {CartItem} from "@/types"


interface CartStore {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (productId: string, variantId: string) => void
    updateItemQuantity: (productId: string, variantId: string, quantity: number) => void
    clearCart: () => void
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            items: [],
            addItem: (newItem: CartItem) =>
                set((state) => {
                    const existingItemIndex = state.items.findIndex(
                        (item) => item.productId === newItem.productId && item.variantId === newItem.variantId,
                    )
                    if (existingItemIndex !== -1) {
                        const updatedItems = [...state.items]
                        updatedItems[existingItemIndex] = {
                            ...updatedItems[existingItemIndex],
                            quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
                        }
                        return {items: updatedItems}
                    }
                    return {items: [...state.items, newItem]}
                }),
            removeItem: (productId: string, variantId: string) =>
                set((state) => ({
                    items: state.items.filter((item) => !(item.productId === productId && item.variantId === variantId)),
                })),
            updateItemQuantity: (productId: string, variantId: string, quantity: number) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.productId === productId && item.variantId === variantId ? {...item, quantity} : item,
                    ),
                })),
            clearCart: () => set({items: []}),
        }),
        {
            name: "cart-storage",
        },
    ),
)