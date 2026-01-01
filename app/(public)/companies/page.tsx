import { CompanyCard } from "@/app/components/CompanyCard/CompanyCard"

const MOCK_COMPANIES = [
  {
    slug: "acme-software",
    name: "Acme Software",
    logoUrl: "/logos/acme.png",
    industry: "SaaS",
    size: "50–100",
    location: "Remote",
    openRoles: 6,
    shortDescription:
      "Building scalable SaaS solutions for modern engineering teams."
  },
  {
    slug: "datacorp",
    name: "DataCorp",
    logoUrl: "/logos/datacorp.png",
    industry: "AI / ML",
    size: "100–250",
    location: "Europe",
    openRoles: 3,
    shortDescription:
      "Applied machine learning and data infrastructure for enterprise clients."
  },
  {
    slug: "fintechly",
    name: "Fintechly",
    industry: "FinTech",
    size: "25–50",
    location: "USA",
    openRoles: 2,
    shortDescription:
      "Modern financial tools built for developers and startups."
  }
]

export default function CompaniesPage() {
  return (
    <div className="container py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Companies</h1>
        <p className="text-muted-foreground">
          Explore companies hiring software engineers
        </p>
      </div>

      {/* Company Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_COMPANIES.map((company) => (
          <CompanyCard key={company.slug} company={company} />
        ))}
      </div>
    </div>
  )
}
