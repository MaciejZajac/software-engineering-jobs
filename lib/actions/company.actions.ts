"use server";

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";
import { connectToDatabase } from "@/database/mongoose";
import Company from "@/database/models/Company";

export interface CompanyFormData {
  name: string;
  slug?: string;
  logoUrl?: string;
  industry?: string;
  size?: string;
  location?: string;
  website?: string;
  description?: string;
}

// Helper function to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

// Get current user's company information
export const getCompanyInfo = async () => {
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
    const company = await Company.findOne({ userId: session.user.id });

    if (!company) {
      return {
        success: true,
        data: null, // No company info yet
      };
    }

    return {
      success: true,
      data: {
        name: company.name,
        slug: company.slug,
        logoUrl: company.logoUrl,
        industry: company.industry,
        size: company.size,
        location: company.location,
        website: company.website,
        description: company.description,
      },
    };
  } catch (error) {
    console.error("Error fetching company info:", error);
    return {
      success: false,
      error: "Failed to fetch company information",
    };
  }
};

// Save or update company information
export const saveCompanyInfo = async (data: CompanyFormData) => {
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

    // Generate slug if not provided
    const slug = data.slug || generateSlug(data.name);

    // Check if slug is already taken by another user
    const existingCompany = await Company.findOne({
      slug,
      userId: { $ne: session.user.id },
    });

    if (existingCompany) {
      return {
        success: false,
        error: "This company slug is already taken",
      };
    }

    // Upsert company information
    const company = await Company.findOneAndUpdate(
      { userId: session.user.id },
      {
        userId: session.user.id,
        name: data.name,
        slug,
        logoUrl: data.logoUrl,
        industry: data.industry,
        size: data.size,
        location: data.location,
        website: data.website,
        description: data.description,
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    return {
      success: true,
      data: {
        name: company.name,
        slug: company.slug,
        logoUrl: company.logoUrl,
        industry: company.industry,
        size: company.size,
        location: company.location,
        website: company.website,
        description: company.description,
      },
    };
  } catch (error: any) {
    console.error("Error saving company info:", error);
    
    // Handle validation errors
    if (error.name === "ValidationError") {
      return {
        success: false,
        error: Object.values(error.errors)
          .map((err: any) => err.message)
          .join(", "),
      };
    }

    return {
      success: false,
      error: error.message || "Failed to save company information",
    };
  }
};

