import React from 'react'
import Link from 'next/link'
import { Building2, MapPin, Globe, Users, Briefcase, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CompanyFormData } from '@/lib/actions/company.actions'

interface CompanyInfoCardProps {
  companyData: CompanyFormData & { slug: string }
}

export function CompanyInfoCard({ companyData }: CompanyInfoCardProps) {
  return (
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
  )
}