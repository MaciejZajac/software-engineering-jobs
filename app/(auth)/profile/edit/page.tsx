import { CompanyInfoForm } from '@/app/components/CompanyInfoForm/CompanyInfoForm'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const EditCompanyPage = () => {
  return (
    <div className="container py-8 max-w-4xl">
      <div className="space-y-6">
          <Link href="/profile">
            <Button variant="ghost" size="lg" className="gap-2 mb-2 cursor-pointer">
              <ArrowLeft className="h-10 w-10" />
              Back
            </Button>
          </Link>
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Edit Company Information</h1>
            <p className="text-muted-foreground mt-2">
              Update your company profile information.
            </p>
          </div>
        </div>
        <CompanyInfoForm />
      </div>
    </div>
  )
}

export default EditCompanyPage