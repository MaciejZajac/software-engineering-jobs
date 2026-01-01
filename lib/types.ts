export type Job = {
  slug: string
  title: string
  company: {
    name: string
    logoUrl?: string
  }
  location: string
  employmentType: string
  salary?: {
    min: number
    max: number
    currency: string
  }
  techStack: string[]
  postedAt: string
}

