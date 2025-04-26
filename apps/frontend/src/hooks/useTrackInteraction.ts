"use client"

import {useState} from "react"
import {useAuthStore} from "@/store/useAuthStore"
import type {Interaction} from "@/types"
import {trackInteractionAction} from "@/app/actions";

type InteractionWithoutUserIdAndType = Omit<Interaction, "userId" | "interactionType">

export function useTrackInteraction() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const user = useAuthStore((state) => state.user)

    const trackInteraction = async (interaction: Omit<Interaction, "userId">) => {
        if (!user) {
            console.warn("Chưa đăng nhập, không thực hiện theo dõi tương tác.")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            // console.log("@@Tracking interaction:", interaction)
            const result = await trackInteractionAction({
                ...interaction,
                userId: user.id,
            })

            if (!result.success) {
                throw new Error(result.error)
            }

            // Optional: You can handle the successful result here if needed
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred")
            console.error("Error tracking interaction:", err)
        } finally {
            setIsLoading(false)
        }
    }

    const trackViewInteraction = (interaction: InteractionWithoutUserIdAndType) => {
        return trackInteraction({...interaction, interactionType: "view"})
    }

    const trackCartInteraction = (interaction: InteractionWithoutUserIdAndType) => {
        return trackInteraction({...interaction, interactionType: "cart"})
    }

    const trackPurchaseInteraction = (interaction: InteractionWithoutUserIdAndType) => {
        return trackInteraction({...interaction, interactionType: "purchase"})
    }

    return {
        trackViewInteraction,
        trackCartInteraction,
        trackPurchaseInteraction,
        isLoading,
        error,
    }
}