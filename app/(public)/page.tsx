import React from 'react'
import { JobCard } from '../components/Card/Card'
import { Job } from '@/lib/types'
import { mockJobs } from '@/consts/mockData'
import { CategorySelector } from '../components/CategorySelector/CategorySelector'

// Simulate API fetch
const fetchJobs = async (): Promise<Job[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return mockJobs
}

type HomePageProps = {
  jobs: Job[]
}

const HomePage = ({ jobs }: HomePageProps) => {
  return (
    <div className="space-y-4">
      <CategorySelector />
      {jobs.map((job) => (
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

// Server Component that fetches data
export default async function Page() {
  const jobs = await fetchJobs()
  
  return <HomePage jobs={jobs} />
}