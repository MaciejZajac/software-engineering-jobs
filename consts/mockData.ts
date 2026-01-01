import { Job } from '@/lib/types'

export const mockJobs: Job[] = [
    {
      slug: "senior-backend-engineer-acme",
      title: "Senior Backend Engineer",
      company: {
        name: "Acme Corp",
        logoUrl: "/logos/acme.png"
      },
      location: "Remote (EU)",
      employmentType: "Full-time",
      salary: {
        min: 120000,
        max: 160000,
        currency: "USD"
      },
      techStack: ["Node.js", "PostgreSQL", "AWS", "Docker"],
      postedAt: "2 days ago"
    },
    {
      slug: "frontend-developer-techstart",
      title: "Frontend Developer",
      company: {
        name: "TechStart",
        logoUrl: "/logos/techstart.png"
      },
      location: "San Francisco, CA",
      employmentType: "Full-time",
      salary: {
        min: 100000,
        max: 140000,
        currency: "USD"
      },
      techStack: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"],
      postedAt: "1 day ago"
    },
    {
      slug: "full-stack-engineer-innovate",
      title: "Full Stack Engineer",
      company: {
        name: "Innovate Labs",
        logoUrl: "/logos/innovate.png"
      },
      location: "New York, NY",
      employmentType: "Full-time",
      salary: {
        min: 130000,
        max: 180000,
        currency: "USD"
      },
      techStack: ["Python", "Django", "React", "PostgreSQL", "Redis", "Kubernetes"],
      postedAt: "3 days ago"
    },
    {
      slug: "devops-engineer-cloudscale",
      title: "DevOps Engineer",
      company: {
        name: "CloudScale",
        logoUrl: "/logos/cloudscale.png"
      },
      location: "Remote (US)",
      employmentType: "Full-time",
      salary: {
        min: 110000,
        max: 150000,
        currency: "USD"
      },
      techStack: ["AWS", "Terraform", "Kubernetes", "Jenkins", "Prometheus"],
      postedAt: "5 days ago"
    },
    {
      slug: "machine-learning-engineer-ai-ventures",
      title: "Machine Learning Engineer",
      company: {
        name: "AI Ventures",
        logoUrl: "/logos/aiventures.png"
      },
      location: "Boston, MA",
      employmentType: "Full-time",
      salary: {
        min: 150000,
        max: 200000,
        currency: "USD"
      },
      techStack: ["Python", "TensorFlow", "PyTorch", "MLflow", "Docker", "AWS"],
      postedAt: "1 week ago"
    },
    {
      slug: "mobile-developer-appcraft",
      title: "Senior Mobile Developer",
      company: {
        name: "AppCraft",
        logoUrl: "/logos/appcraft.png"
      },
      location: "Austin, TX",
      employmentType: "Full-time",
      salary: {
        min: 115000,
        max: 155000,
        currency: "USD"
      },
      techStack: ["React Native", "TypeScript", "Firebase", "Swift", "Kotlin"],
      postedAt: "4 days ago"
    },
    {
      slug: "data-engineer-datastream",
      title: "Data Engineer",
      company: {
        name: "DataStream",
        logoUrl: "/logos/datastream.png"
      },
      location: "Seattle, WA",
      employmentType: "Full-time",
      salary: {
        min: 125000,
        max: 170000,
        currency: "USD"
      },
      techStack: ["Python", "Apache Spark", "Kafka", "Airflow", "Snowflake", "dbt"],
      postedAt: "6 days ago"
    },
    {
      slug: "security-engineer-securenet",
      title: "Security Engineer",
      company: {
        name: "SecureNet",
        logoUrl: "/logos/securenet.png"
      },
      location: "Remote (Global)",
      employmentType: "Full-time",
      salary: {
        min: 140000,
        max: 190000,
        currency: "USD"
      },
      techStack: ["Python", "Go", "Kubernetes", "SIEM", "Penetration Testing"],
      postedAt: "2 days ago"
    }
  ]