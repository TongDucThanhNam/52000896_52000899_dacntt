"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function AIRecommendations() {
  const [userInput, setUserInput] = useState("")
  const [recommendations, setRecommendations] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement AI recommendation logic here
    // For now, we'll just simulate some recommendations
    setRecommendations([
      "Áo thun oversize màu pastel",
      "Quần jean ống rộng",
      "Áo khoác denim vintage",
      "Giày sneaker đế cao su",
    ])
  }

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Gợi ý cá nhân hóa</h2>
        <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
          <Input
            type="text"
            placeholder="Mô tả phong cách của bạn..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Gợi ý</Button>
        </form>
        {recommendations.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Gợi ý cho bạn:</h3>
            <ul className="list-disc pl-5">
              {recommendations.map((item, index) => (
                <li key={index} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
    )
}