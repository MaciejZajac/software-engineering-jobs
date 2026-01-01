"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const CATEGORIES = [
  { key: "backend", label: "Backend", description: "APIs, databases, systems" },
  { key: "frontend", label: "Frontend", description: "UI, React, performance" },
  { key: "fullstack", label: "Fullstack", description: "End-to-end development" },
  { key: "ai-ml", label: "AI / ML", description: "ML, LLMs, data pipelines" },
  { key: "mobile", label: "Mobile", description: "iOS, Android, RN" },
  { key: "pm", label: "Product / PM", description: "Product & delivery" }
]

export function CategorySelector() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get("category")

  function handleSelect(category: string) {
    const params = new URLSearchParams(searchParams)
    params.set("category", category)
    router.push(`/?${params.toString()}`)
  }

  return (
    <section className="container py-10">
      <h2 className="text-2xl font-bold mb-2">
        Browse jobs by role
      </h2>
      <p className="text-muted-foreground mb-6">
        Pick your specialization and see matching offers
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((cat) => (
          <Card
            key={cat.key}
            onClick={() => handleSelect(cat.key)}
            className={cn(
              "cursor-pointer transition-all hover:border-primary hover:shadow-sm",
              active === cat.key && "border-primary shadow-sm"
            )}
          >
            <CardContent className="p-4 text-center space-y-1">
              <h3 className="font-medium">{cat.label}</h3>
              <p className="text-xs text-muted-foreground">
                {cat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
