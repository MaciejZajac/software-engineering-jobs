import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type CompanyCardProps = {
  company: {
    slug: string
    name: string
    logoUrl?: string
    industry: string
    size: string
    location: string
    openRoles: number
    shortDescription: string
  }
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href={`/companies/${company.slug}`} className="block">
      <Card className="h-full transition-all hover:shadow-md hover:border-primary/40">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center gap-4">
            {company.logoUrl && (
              <Image
                src={company.logoUrl}
                alt={company.name}
                width={48}
                height={48}
                className="rounded-md border"
              />
            )}
            <div>
              <h3 className="font-semibold leading-tight">
                {company.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {company.location}
              </p>
            </div>
          </div>

          <p className="text-sm line-clamp-3">
            {company.shortDescription}
          </p>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{company.industry}</Badge>
            <Badge variant="outline">{company.size}</Badge>
            <Badge variant="outline">
              {company.openRoles} open roles
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
