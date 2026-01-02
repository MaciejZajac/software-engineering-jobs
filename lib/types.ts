export type Job = {
  slug: string
  title: string
  location: string
  employmentType: string
  seniorityLevel: string
  salary?: {
    min: number
    max: number
    currency: string
  }
  company?: {
    name: string
    logoUrl?: string
  }
  techStack?: string[]
  postedAt?: string
}

export type Company = {
  name: string
  slug: string
  logoUrl?: string
  industry?: string
  size?: string
  location?: string
  website?: string
  description?: string
}

