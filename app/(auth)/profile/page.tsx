import React from 'react'
import Link from 'next/link'
import { Edit, Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { getCompanyInfo } from '@/lib/actions/company.actions'
import { getCompanyJobs } from '@/lib/actions/job.actions'
import { CompanyInfoCard } from '@/app/components/CompanyInfoCard/CompanyInfoCard'

const ProfileHomepage = async () => {
  const result = await getCompanyInfo();
  const companyData = result.success && result.data ? result.data : null;
  
  const jobsResult = await getCompanyJobs();
  const jobs = jobsResult.success && jobsResult.data ? jobsResult.data : [];

  // If no company data exists, show a message prompting to add it
  if (!companyData) {
    return (
      <div className="container py-8 max-w-4xl">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Company Information</h1>
              <p className="text-muted-foreground mt-2">
                Your company profile information. This will be displayed on your company page.
              </p>
            </div>
            <Link href="/profile/edit">
              <Button className="gap-2">
                <Edit className="h-4 w-4" />
                Add Company Information
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">
                No company information has been added yet.
              </p>
              <Link href="/profile/edit">
                <Button>Add Company Information</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Company Information</h1>
            <p className="text-muted-foreground mt-2">
              Your company profile information. This will be displayed on your company page.
            </p>
          </div>
          <Link href="/profile/edit">
            <Button variant="outline" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </Link>
        </div>

        <CompanyInfoCard companyData={companyData} />

        {/* Company Job Listings section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Job Listings</h2>
            <Link href="/profile/jobs/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add New Listing
              </Button>
            </Link>
          </div>

          {jobs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  No job listings yet. Create your first job posting!
                </p>
                <Link href="/profile/jobs/new">
                  <Button>Create Job Listing</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Salary</TableHead>
                      <TableHead>Tech Stack</TableHead>
                      <TableHead>Posted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.slug}>
                        <TableCell className="font-medium">
                          {job.title}
                        </TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{job.employmentType}</Badge>
                        </TableCell>
                        <TableCell>
                          {job.salary ? (
                            <span className="text-sm">
                              {job.salary.currency} {job.salary.min / 1000}k–{job.salary.max / 1000}k
                            </span>
                          ) : (
                            <span className="text-muted-foreground text-sm">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {job.techStack.slice(0, 2).map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {job.techStack.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{job.techStack.length - 2}
                              </Badge>
                            )}
                            {job.techStack.length === 0 && (
                              <span className="text-muted-foreground text-sm">—</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {job.postedAt}
                        </TableCell>
                        <TableCell className="text-right">
                          <Link href={`/profile/jobs/${job.slug}/edit`}>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileHomepage