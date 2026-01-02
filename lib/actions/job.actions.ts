"use server";

import { connectToDatabase } from "@/database/mongoose";
import Job from "@/database/models/Job";
import Company from "@/database/models/Company";
import {
  JobFormDataSchema,
  SlugSchema,
} from "../validations/job.validation";
import {
  formatValidationErrors,
  generateSlug,
  transformJobToResponse,
} from "./job.helpers";
import { requireAuth } from "./job.auth";

// Create a new job listing
export const createJob = async (data: unknown) => {
  try {
    // STEP 1: Validate input data first (runtime validation)
    const validationResult = JobFormDataSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        success: false,
        error: `Validation failed: ${formatValidationErrors(validationResult.error)}`,
      };
    }
    const validatedData = validationResult.data;

    // STEP 2: Check authentication
    const session = await requireAuth();

    // STEP 3: Verify user has a company
    await connectToDatabase();
    const company = await Company.findOne({ userId: session.user.id });

    if (!company) {
      return {
        success: false,
        error: "Please create a company profile first",
      };
    }

    // Generate slug from title (using validated data)
    let slug = generateSlug(validatedData.title);
    let slugCounter = 1;
    const baseSlug = slug;

    // Ensure slug is unique
    while (await Job.findOne({ slug })) {
      slug = `${baseSlug}-${slugCounter}`;
      slugCounter++;
    }

    // STEP 4: Create the job (using validated data)
    const job = await Job.create({
      userId: session.user.id,
      title: validatedData.title,
      slug,
      location: validatedData.location,
      employmentType: validatedData.employmentType,
      seniorityLevel: validatedData.seniorityLevel,
      salary: validatedData.salary,
      techStack: validatedData.techStack || [],
    });

    // STEP 5: Transform and return response
    const jobObject = job.toObject();
    return {
      success: true,
      data: transformJobToResponse(jobObject),
    };
  } catch (error: any) {
    console.error("Error creating job:", error);

    // Handle authentication errors
    if (error.message === "Unauthorized") {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    // Handle Mongoose validation errors
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
    // Check authentication
    const session = await requireAuth();

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
      data: jobs.map((job) => {
        const transformed = transformJobToResponse(job);
        // Override company to only include name and logoUrl for company jobs list
        transformed.company = {
          name: String(company.name),
          logoUrl: company.logoUrl ? String(company.logoUrl) : undefined,
        };
        return transformed;
      }),
    };
  } catch (error: any) {
    console.error("Error fetching company jobs:", error);

    // Handle authentication errors
    if (error.message === "Unauthorized") {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    return {
      success: false,
      error: "Failed to fetch job listings",
    };
  }
};

// Get a single job by slug (for editing - only returns if user owns it)
export const getJobBySlug = async (slug: string) => {
  try {
    // Check authentication
    const session = await requireAuth();

    await connectToDatabase();
    const job = await Job.findOne({ slug, userId: session.user.id }).lean();

    if (!job) {
      return {
        success: false,
        error: "Job not found",
      };
    }

    // For edit view, don't include company or postedAt
    const transformed = transformJobToResponse(job);
    delete transformed.company;
    delete transformed.postedAt;

    return {
      success: true,
      data: transformed,
    };
  } catch (error: any) {
    console.error("Error fetching job:", error);

    // Handle authentication errors
    if (error.message === "Unauthorized") {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    return {
      success: false,
      error: "Failed to fetch job",
    };
  }
};

// Update an existing job listing
export const updateJob = async (slug: unknown, data: unknown) => {
  try {
    // STEP 1: Validate inputs
    const slugValidation = SlugSchema.safeParse(slug);
    if (!slugValidation.success) {
      return {
        success: false,
        error: `Invalid slug: ${formatValidationErrors(slugValidation.error)}`,
      };
    }
    const validatedSlug = slugValidation.data;

    const dataValidation = JobFormDataSchema.safeParse(data);
    if (!dataValidation.success) {
      return {
        success: false,
        error: `Validation failed: ${formatValidationErrors(dataValidation.error)}`,
      };
    }
    const validatedData = dataValidation.data;

    // STEP 2: Check authentication
    const session = await requireAuth();

    await connectToDatabase();

    // STEP 3: Verify job exists and belongs to user
    const existingJob = await Job.findOne({
      slug: validatedSlug,
      userId: session.user.id,
    });

    if (!existingJob) {
      return {
        success: false,
        error: "Job not found",
      };
    }

    // STEP 4: Update the job (using validated data)
    const updatedJob = await Job.findOneAndUpdate(
      { slug: validatedSlug, userId: session.user.id },
      {
        title: validatedData.title,
        location: validatedData.location,
        employmentType: validatedData.employmentType,
        seniorityLevel: validatedData.seniorityLevel,
        salary: validatedData.salary,
        techStack: validatedData.techStack || [],
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

    // STEP 5: Transform and return response
    const jobObject = updatedJob.toObject();
    return {
      success: true,
      data: transformJobToResponse(jobObject),
    };
  } catch (error: any) {
    console.error("Error updating job:", error);

    // Handle authentication errors
    if (error.message === "Unauthorized") {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    // Handle Mongoose validation errors
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

// Get a single job by slug (public access - no authentication required)
export const getPublicJobBySlug = async (slug: string) => {
  try {
    await connectToDatabase();
    const job = await Job.findOne({ slug }).lean();

    if (!job) {
      return {
        success: false,
        error: "Job not found",
      };
    }

    // Fetch company information
    const company = await Company.findOne({ userId: job.userId }).lean();

    return {
      success: true,
      data: transformJobToResponse(job, company),
    };
  } catch (error) {
    console.error("Error fetching public job:", error);
    return {
      success: false,
      error: "Failed to fetch job",
    };
  }
};

export const getJobListings = async () => {
  try {
    await connectToDatabase();

    const jobs = await Job.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Get all unique user IDs from jobs
    const userIds = [...new Set(jobs.map((job) => job.userId))];

    // Fetch all companies for these users
    const companies = await Company.find({ userId: { $in: userIds } }).lean();

    // Create a map of userId to company for quick lookup
    const companyMap = new Map(
      companies.map((company) => [company.userId, company])
    );

    return {
      success: true,
      count: jobs.length,
      data: jobs.map((job) => {
        const company = companyMap.get(job.userId);
        // Use helper but only include basic company info for listings
        const transformed = transformJobToResponse(job, company);
        // Override company to only include name and logoUrl for listings
        if (company) {
          transformed.company = {
            name: String(company.name),
            logoUrl: company.logoUrl ? String(company.logoUrl) : undefined,
          };
        }
        return transformed;
      }),
    };
  } catch (error) {
    console.error("Error fetching homepage jobs:", error);
    return {
      success: false,
      error: "Failed to fetch job listings",
    };
  }
};

// Get similar jobs (exclude current job)
export const getSimilarJobs = async (
  currentSlug: string,
  limit: number = 5
) => {
  try {
    await connectToDatabase();

    const jobs = await Job.find({ slug: { $ne: currentSlug } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    // Get all unique user IDs from jobs
    const userIds = [...new Set(jobs.map((job) => job.userId))];

    // Fetch all companies for these users
    const companies = await Company.find({ userId: { $in: userIds } }).lean();

    // Create a map of userId to company for quick lookup
    const companyMap = new Map(
      companies.map((company) => [company.userId, company])
    );

    return {
      success: true,
      data: jobs.map((job) => {
        const company = companyMap.get(job.userId);
        // Use helper but only include basic company info for listings
        const transformed = transformJobToResponse(job, company);
        // Override company to only include name and logoUrl for listings
        if (company) {
          transformed.company = {
            name: String(company.name),
            logoUrl: company.logoUrl ? String(company.logoUrl) : undefined,
          };
        }
        return transformed;
      }),
    };
  } catch (error) {
    console.error("Error fetching similar jobs:", error);
    return {
      success: false,
      error: "Failed to fetch similar jobs",
    };
  }
};
