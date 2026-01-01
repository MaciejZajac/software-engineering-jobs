"use server";

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";
import { connectToDatabase } from "@/database/mongoose";
import Job from "@/database/models/Job";
import Company from "@/database/models/Company";

export interface JobFormData {
  title: string;
  location: string;
  employmentType: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  techStack: string[];
}

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

// Helper function to format postedAt date
function formatPostedAt(date: Date): string {
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

// Create a new job listing
export const createJob = async (data: JobFormData) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    // Verify user has a company
    await connectToDatabase();
    const company = await Company.findOne({ userId: session.user.id });

    if (!company) {
      return {
        success: false,
        error: "Please create a company profile first",
      };
    }

    // Generate slug from title
    let slug = generateSlug(data.title);
    let slugCounter = 1;
    const baseSlug = slug;

    // Ensure slug is unique
    while (await Job.findOne({ slug })) {
      slug = `${baseSlug}-${slugCounter}`;
      slugCounter++;
    }

    // Create the job
    const job = await Job.create({
      userId: session.user.id,
      title: data.title,
      slug,
      location: data.location,
      employmentType: data.employmentType,
      salary: data.salary,
      techStack: data.techStack || [],
    });

    // Convert Mongoose document to plain object
    const jobObject = job.toObject();

    return {
      success: true,
      data: {
        slug: String(jobObject.slug),
        title: String(jobObject.title),
        location: String(jobObject.location),
        employmentType: String(jobObject.employmentType),
        salary: jobObject.salary
          ? {
              min: Number(jobObject.salary.min),
              max: Number(jobObject.salary.max),
              currency: String(jobObject.salary.currency),
            }
          : undefined,
        techStack: Array.isArray(jobObject.techStack)
          ? jobObject.techStack.map((t: any) => String(t))
          : [],
        postedAt: formatPostedAt(jobObject.createdAt as Date),
      },
    };
  } catch (error: any) {
    console.error("Error creating job:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return {
        success: false,
        error:
          Object.values(error.errors)
            .map((err: any) => err.message)
            .join(", ") || "Validation error",
      };
    }

    return {
      success: false,
      error: error.message || "Failed to create job listing",
    };
  }
};

// Get all jobs for the current user's company
export const getCompanyJobs = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await connectToDatabase();

    // Get company info
    const company = await Company.findOne({ userId: session.user.id }).lean();

    if (!company) {
      return {
        success: true,
        data: [],
      };
    }

    // Get all jobs for this user
    const jobs = await Job.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return {
      success: true,
      data: jobs.map((job) => ({
        slug: String(job.slug),
        title: String(job.title),
        company: {
          name: String(company.name),
          logoUrl: company.logoUrl ? String(company.logoUrl) : undefined,
        },
        location: String(job.location),
        employmentType: String(job.employmentType),
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
        postedAt: formatPostedAt(job.createdAt as Date),
      })),
    };
  } catch (error) {
    console.error("Error fetching company jobs:", error);
    return {
      success: false,
      error: "Failed to fetch job listings",
    };
  }
};

// Get a single job by slug (for editing - only returns if user owns it)
export const getJobBySlug = async (slug: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await connectToDatabase();
    const job = await Job.findOne({ slug, userId: session.user.id }).lean();

    if (!job) {
      return {
        success: false,
        error: "Job not found",
      };
    }

    return {
      success: true,
      data: {
        slug: String(job.slug),
        title: String(job.title),
        location: String(job.location),
        employmentType: String(job.employmentType),
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
      },
    };
  } catch (error) {
    console.error("Error fetching job:", error);
    return {
      success: false,
      error: "Failed to fetch job",
    };
  }
};

// Update an existing job listing
export const updateJob = async (slug: string, data: JobFormData) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    await connectToDatabase();

    // Verify job exists and belongs to user
    const existingJob = await Job.findOne({
      slug,
      userId: session.user.id,
    });

    if (!existingJob) {
      return {
        success: false,
        error: "Job not found",
      };
    }

    // Update the job
    const updatedJob = await Job.findOneAndUpdate(
      { slug, userId: session.user.id },
      {
        title: data.title,
        location: data.location,
        employmentType: data.employmentType,
        salary: data.salary,
        techStack: data.techStack || [],
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedJob) {
      return {
        success: false,
        error: "Failed to update job",
      };
    }

    // Convert Mongoose document to plain object
    const jobObject = updatedJob.toObject();

    return {
      success: true,
      data: {
        slug: String(jobObject.slug),
        title: String(jobObject.title),
        location: String(jobObject.location),
        employmentType: String(jobObject.employmentType),
        salary: jobObject.salary
          ? {
              min: Number(jobObject.salary.min),
              max: Number(jobObject.salary.max),
              currency: String(jobObject.salary.currency),
            }
          : undefined,
        techStack: Array.isArray(jobObject.techStack)
          ? jobObject.techStack.map((t: any) => String(t))
          : [],
        postedAt: formatPostedAt(jobObject.createdAt as Date),
      },
    };
  } catch (error: any) {
    console.error("Error updating job:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      return {
        success: false,
        error:
          Object.values(error.errors)
            .map((err: any) => err.message)
            .join(", ") || "Validation error",
      };
    }

    return {
      success: false,
      error: error.message || "Failed to update job listing",
    };
  }
};

