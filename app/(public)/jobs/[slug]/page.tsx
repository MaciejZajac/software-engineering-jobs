import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CategorySelector } from "@/app/components/CategorySelector/CategorySelector"

/**
 * Mocked job data
 * In a real app this would come from an API
 */
const MOCK_JOB = {
  title: "Senior Backend Engineer",
  company: {
    name: "Acme Software",
    logoUrl: "/logos/acme.png",
    website: "https://acme.com",
    size: "50–100",
    industry: "SaaS"
  },
  location: "Remote (EU)",
  employmentType: "Full-time",
  experienceLevel: "Senior",
  salary: {
    min: 120000,
    max: 160000,
    currency: "USD"
  },
  techStack: ["Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
  postedAt: "2 days ago",
  applyUrl: "https://acme.com/careers/senior-backend-engineer",
  description: `
We are looking for a Senior Backend Engineer to join our growing platform team.

You will work on scalable APIs, distributed systems, and data-intensive services used by thousands of customers worldwide.
  `,
  responsibilities: [
    "Design and build scalable backend services",
    "Own features end-to-end from design to production",
    "Collaborate with frontend, product, and DevOps teams",
    "Improve system reliability and performance"
  ],
  requirements: [
    "5+ years of experience in backend development",
    "Strong knowledge of Node.js and TypeScript",
    "Experience with relational databases (PostgreSQL)",
    "Cloud experience (AWS preferred)"
  ],
  benefits: [
    "Fully remote work",
    "Competitive salary",
    "Flexible working hours",
    "Private healthcare",
    "Learning budget"
  ]
}

export default function JobPage({
  params
}: {
  params: { slug: string }
}) {
  const job = MOCK_JOB

  return (
    <div className="container max-w-5xl py-8">
      {/* Header */}
      <header className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-6">
          <div className="flex gap-4">
            {job.company.logoUrl && (
              <Image
                src={job.company.logoUrl}
                alt={job.company.name}
                width={64}
                height={64}
                className="rounded-md border"
              />
            )}

            <div>
              <h1 className="text-2xl font-bold">{job.title}</h1>
              <p className="text-muted-foreground">
                {job.company.name} · {job.location}
              </p>
            </div>
          </div>

          <Button asChild size="lg">
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply now
            </a>
          </Button>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{job.employmentType}</Badge>
          <Badge variant="secondary">{job.experienceLevel}</Badge>

          {job.salary && (
            <Badge variant="outline">
              {job.salary.currency}{" "}
              {job.salary.min / 1000}k–{job.salary.max / 1000}k
            </Badge>
          )}

          {job.techStack.map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
        </div>
      </header>

      <Separator className="my-8" />

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main content */}
        <article className="md:col-span-2 space-y-8 prose max-w-none">
          <section>
            <h2>About the role</h2>
            <p>{job.description}</p>
          </section>

          <section>
            <h2>Responsibilities</h2>
            <ul>
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Requirements</h2>
            <ul>
              {job.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Benefits</h2>
            <ul>
              {job.benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </article>

        {/* Sidebar */}
        <aside className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-2 text-sm">
              <h3 className="font-semibold">Company</h3>
              <p>{job.company.name}</p>
              <p>Size: {job.company.size}</p>
              <p>Industry: {job.company.industry}</p>

              <a
                href={job.company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Company website
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-3">
              <Button asChild className="w-full">
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apply now
                </a>
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Posted {job.postedAt}
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
