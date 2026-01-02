import React from 'react'
import { JobCard } from '../components/Card/Card'
import { CategorySelector } from '../components/CategorySelector/CategorySelector'
import { getJobListings } from '@/lib/actions/job.actions'

export default async function Page() {
  const listings = await getJobListings();

  if (!listings.success || !listings.data || listings.data.length === 0) {
    return (
      <div className="space-y-4">
        <CategorySelector />
        <div className="text-center py-12 text-muted-foreground">
          <p>No job listings available at the moment.</p>
          <p className="text-sm mt-2">Check back later for new opportunities!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <CategorySelector />
      {listings.data.map((job) => (
        <JobCard
          key={job.slug}
          slug={job.slug}
          title={job.title}
          company={job.company}
          location={job.location}
          employmentType={job.employmentType}
          salary={job.salary}
          techStack={job.techStack}
          postedAt={job.postedAt}
        />
      ))}
    </div>
  )
}