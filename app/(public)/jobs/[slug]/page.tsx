import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getPublicJobBySlug, getSimilarJobs } from "@/lib/actions/job.actions"
import { notFound } from "next/navigation"
import { 
  MapPin, 
  Building2, 
  Briefcase, 
  FileText, 
  GraduationCap, 
  Bookmark, 
  Share2,
  ChevronRight,
  Clock
} from "lucide-react"

function formatSalary(salary: { min: number; max: number; currency: string } | undefined) {
  if (!salary) return null;
  
  // Format based on currency
  if (salary.currency === "PLN") {
    // For PLN, show as hourly rate if it's a small number, otherwise monthly
    if (salary.max < 500) {
      return `${salary.min} - ${salary.max} PLN`;
    } else {
      return `${(salary.min / 1000).toFixed(0)} ${salary.min >= 1000 ? 'k' : ''} - ${(salary.max / 1000).toFixed(0)} ${salary.max >= 1000 ? 'k' : ''} PLN`;
    }
  }
  
  // Default formatting
  return `${salary.currency} ${(salary.min / 1000).toFixed(0)}k - ${(salary.max / 1000).toFixed(0)}k`;
}

function formatSalaryForDisplay(salary: { min: number; max: number; currency: string } | undefined) {
  if (!salary) return null;
  
  if (salary.currency === "PLN" && salary.max < 500) {
    return `${salary.min} - ${salary.max} PLN`;
  }
  
  return formatSalary(salary);
}

export default async function JobPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug;
  const [jobResult, similarJobsResult] = await Promise.all([
    getPublicJobBySlug(slug),
    getSimilarJobs(slug, 5)
  ]);

  if (!jobResult.success || !jobResult.data) {
    notFound()
  }

  const job = jobResult.data
  const similarJobs = similarJobsResult.success ? similarJobsResult.data || [] : []

  // Extract location parts for breadcrumb (simplified)
  const locationParts = job.location.split(',').map(s => s.trim());
  const primaryLocation = locationParts[0];
  const primaryTech = job.techStack && job.techStack.length > 0 ? job.techStack[0] : '';

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-4 py-6 pb-24">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            All offers
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{primaryLocation}</span>
          {primaryTech && (
            <>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">{primaryTech}</span>
            </>
          )}
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{job.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Section */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                {job.company?.logoUrl && (
                  <Image
                    src={job.company.logoUrl}
                    alt={job.company.name}
                    width={80}
                    height={80}
                    className="rounded-lg border object-contain"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold mb-3">{job.title}</h1>
                      <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        {job.company?.name && (
                          <div className="flex items-center gap-1.5">
                            <Building2 className="h-4 w-4" />
                            <span>{job.company.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {job.techStack && job.techStack.length > 0 && (
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">
                        {job.techStack[0]}
                      </Badge>
                    )}
                  </div>

                  {/* Job Attributes */}
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5">
                      <Briefcase className="h-3.5 w-3.5" />
                      {job.employmentType}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5">
                      <FileText className="h-3.5 w-3.5" />
                      B2B
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5">
                      <GraduationCap className="h-3.5 w-3.5" />
                      {job.seniorityLevel}
                    </Badge>
                    <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      Remote
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Job Description Section */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">JOB DESCRIPTION</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-muted-foreground">{job.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Type</h3>
                  <p className="text-muted-foreground">{job.employmentType}</p>
                </div>
                {job.salary && (
                  <div>
                    <h3 className="font-semibold mb-1">Salary</h3>
                    <p className="text-muted-foreground">
                      {formatSalaryForDisplay(job.salary)}
                      {job.salary.currency === "PLN" && job.salary.max < 500 && " Net per hour - B2B"}
                    </p>
                  </div>
                )}
              </div>

              {job.techStack && job.techStack.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.techStack.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar - Right Column */}
          <aside className="space-y-6">
            {/* Salary Card */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold">SALARY</h3>
                {job.salary ? (
                  <div>
                    <p className="text-2xl font-bold">
                      {formatSalaryForDisplay(job.salary)}
                    </p>
                    {job.salary.currency === "PLN" && job.salary.max < 500 ? (
                      <p className="text-sm text-muted-foreground mt-1">Net per hour - B2B</p>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">Per month</p>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Not specified</p>
                )}

                {job.company?.website ? (
                  <Button 
                    asChild 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    size="lg"
                  >
                    <a
                      href={job.company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Apply
                    </a>
                  </Button>
                ) : (
                  <Button disabled className="w-full" size="lg">
                    Apply
                  </Button>
                )}

                {job.postedAt && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                    <Clock className="h-4 w-4" />
                    <span>Posted {job.postedAt}</span>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Similar Offers */}
            {similarJobs.length > 0 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold">CHECK SIMILAR OFFERS</h3>
                  <div className="space-y-4">
                    {similarJobs.map((similarJob) => (
                      <Link 
                        key={similarJob.slug} 
                        href={`/jobs/${similarJob.slug}`}
                        className="block p-3 rounded-lg border hover:bg-accent transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          {similarJob.company?.logoUrl && (
                            <Image
                              src={similarJob.company.logoUrl}
                              alt={similarJob.company.name}
                              width={40}
                              height={40}
                              className="rounded border object-contain shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm mb-1 line-clamp-1">
                              {similarJob.title}
                            </h4>
                            {similarJob.salary && (
                              <p className="text-sm font-medium text-muted-foreground mb-2">
                                {formatSalary(similarJob.salary)}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-1.5">
                              <Badge variant="outline" className="text-xs">
                                {similarJob.location.split(',')[0]}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {similarJob.employmentType}
                              </Badge>
                              {similarJob.techStack && similarJob.techStack.length > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  {similarJob.techStack[0]}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg z-50">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{job.title}</h3>
              {job.salary && (
                <p className="text-sm text-muted-foreground">
                  {formatSalaryForDisplay(job.salary)}
                  {job.salary.currency === "PLN" && job.salary.max < 500 && " Net per hour - B2B"}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
              {job.company?.website ? (
                <Button 
                  asChild
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  size="sm"
                >
                  <a
                    href={job.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply
                  </a>
                </Button>
              ) : (
                <Button disabled size="sm">
                  Apply
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
