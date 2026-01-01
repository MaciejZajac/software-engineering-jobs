import React from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { JobForm } from '@/app/components/JobForm/JobForm'

const NewJobPage = () => {
  return (
    <div className="container py-8 max-w-3xl">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create New Job Listing</h1>
            <p className="text-muted-foreground mt-2">
              Add a new job posting to your company profile.
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <JobForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default NewJobPage

