import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Job } from "@/lib/types"

type JobCardProps = Job

export function JobCard({
  slug,
  title,
  company,
  location,
  employmentType,
  salary,
  techStack,
  postedAt
}: JobCardProps) {
  return (
    <Link href={`/jobs/${slug}`} className="block">
      <Card className="transition-all hover:shadow-md hover:border-primary/40">
        <CardContent className="p-5 flex gap-4">
          {/* Company Logo */}
          <Avatar className="h-12 w-12">
            <AvatarImage src={company.logoUrl} alt={company.name} />
            <AvatarFallback>
              {company.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Job Info */}
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold leading-tight">
                  {title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {company.name} · {location}
                </p>
              </div>

              {salary && (
                <div className="text-sm font-medium whitespace-nowrap">
                  {salary.currency} {salary.min / 1000}k–{salary.max / 1000}k
                </div>
              )}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{employmentType}</Badge>
              {techStack.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
              {techStack.length > 4 && (
                <Badge variant="outline">+{techStack.length - 4}</Badge>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              Posted {postedAt}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
