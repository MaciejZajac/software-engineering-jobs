import React from 'react'
import Link from 'next/link'
import { Building2, MapPin, Globe, Users, Briefcase, Edit, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getCompanyInfo } from '@/lib/actions/company.actions'

const ProfileHomepage = async () => {
  const result = await getCompanyInfo();
  const companyData = result.success && result.data ? result.data : null;

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

        <Card>
          <CardHeader>
            <div className="flex items-start gap-6">
              {companyData.logoUrl && (
                <div className="flex-shrink-0">
                  <img
                    src={companyData.logoUrl}
                    alt={`${companyData.name} logo`}
                    className="w-24 h-24 rounded-lg object-cover border"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <CardTitle className="text-2xl mb-2">{companyData.name}</CardTitle>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  {companyData.industry && (
                    <Badge variant="secondary" className="gap-1.5">
                      <Briefcase className="h-3 w-3" />
                      {companyData.industry}
                    </Badge>
                  )}
                  {companyData.size && (
                    <Badge variant="secondary" className="gap-1.5">
                      <Users className="h-3 w-3" />
                      {companyData.size} employees
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Description */}
            {companyData.description && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">About</h3>
                <p className="text-sm leading-relaxed">{companyData.description}</p>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              {companyData.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">{companyData.location}</p>
                  </div>
                </div>
              )}

              {companyData.website && (
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Website</p>
                    <a
                      href={companyData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      {companyData.website.replace(/^https?:\/\//, '')}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}

              {companyData.slug && (
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Company URL</p>
                    <Link 
                      href={`/companies/${companyData.slug}`}
                      className="text-sm text-primary hover:underline"
                    >
                      /companies/{companyData.slug}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProfileHomepage