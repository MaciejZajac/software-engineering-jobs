import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { JobCard } from "@/app/components/Card/Card"

const MOCK_COMPANY = {
    slug: "acme-software",
    name: "Acme Software",
    logoUrl: "/logos/acme.png",
    industry: "SaaS",
    size: "50–100",
    location: "Remote",
    website: "https://acme.com",
    shortDescription:
      "Acme Software builds scalable SaaS solutions for modern engineering teams.",
    openRoles: [
      {
        slug: "senior-backend-engineer",
        title: "Senior Backend Engineer",
        employmentType: "Full-time",
        location: "Remote (EU)",
        salary: { min: 120000, max: 160000, currency: "USD" },
        techStack: ["Node.js", "PostgreSQL", "AWS"],
        postedAt: "2 days ago"
      },
      {
        slug: "frontend-engineer",
        title: "Frontend Engineer",
        employmentType: "Full-time",
        location: "Remote (EU)",
        salary: { min: 100000, max: 140000, currency: "USD" },
        techStack: ["React", "TypeScript", "Tailwind"],
        postedAt: "5 days ago"
      }
    ]
  }

export default function CompanyPage({
  params
}: {
  params: { slug: string }
}) {
  const company = MOCK_COMPANY

  return (
    <div className="container py-10 space-y-10">
      {/* Company Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {company.logoUrl && (
          <Image
            src={company.logoUrl}
            alt={company.name}
            width={96}
            height={96}
            className="rounded-md border"
          />
        )}
        <div className="flex-1 space-y-2">
          <h1 className="text-2xl font-bold">{company.name}</h1>
          <p className="text-muted-foreground">{company.shortDescription}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">{company.industry}</Badge>
            <Badge variant="outline">{company.size}</Badge>
            <Badge variant="outline">{company.location}</Badge>
          </div>
        </div>
      </header>

      <Separator />

      {/* Open Roles */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Open positions</h2>
        {company.openRoles.length === 0 ? (
          <p className="text-muted-foreground">No open roles at the moment.</p>
        ) : (
          <div className="space-y-4">
            {company.openRoles.map((job) => (
              <JobCard
                key={job.slug}
                slug={job.slug}
                title={job.title}
                company={{ name: company.name, logoUrl: company.logoUrl }}
                location={job.location}
                employmentType={job.employmentType}
                salary={job.salary}
                techStack={job.techStack}
                postedAt={job.postedAt}
              />
            ))}
          </div>
        )}
      </section>

      <Separator />

      {/* Company Website */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Company website</h2>
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          {company.website}
        </a>
      </section>
    </div>
  )
}
