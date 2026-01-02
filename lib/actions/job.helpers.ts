import { z } from "zod";

// Helper function to format Zod validation errors into user-friendly messages
export function formatValidationErrors(error: z.ZodError): string {
  return error.issues
    .map((err) => {
      const path = err.path.length > 0 ? `${err.path.join(".")}: ` : "";
      return `${path}${err.message}`;
    })
    .join(", ");
}

// Helper function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

// Helper function to format postedAt date
export function formatPostedAt(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "today";
  } else if (diffInDays === 1) {
    return "1 day ago";
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return years === 1 ? "1 year ago" : `${years} years ago`;
  }
}

// Helper function to transform job document to response format
export function transformJobToResponse(job: any, company?: any) {
  return {
    slug: String(job.slug),
    title: String(job.title),
    location: String(job.location),
    employmentType: String(job.employmentType),
    seniorityLevel: String(job.seniorityLevel),
    salary: job.salary
      ? {
          min: Number(job.salary.min),
          max: Number(job.salary.max),
          currency: String(job.salary.currency),
        }
      : undefined,
    techStack: Array.isArray(job.techStack)
      ? job.techStack.map((t: any) => String(t))
      : [],
    ...(company && {
      company: {
        name: String(company.name),
        logoUrl: company.logoUrl ? String(company.logoUrl) : undefined,
        website: company.website ? String(company.website) : undefined,
        size: company.size ? String(company.size) : undefined,
        industry: company.industry ? String(company.industry) : undefined,
      },
    }),
    ...(job.createdAt && {
      postedAt: formatPostedAt(job.createdAt as Date),
    }),
  };
}

