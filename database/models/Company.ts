import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICompany extends Document {
  userId: string; // Links to better-auth user ID
  name: string;
  slug: string;
  logoUrl?: string;
  industry?: string;
  size?: string;
  location?: string;
  website?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema = new Schema<ICompany>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      // Generate slug from name if not provided
    },
    logoUrl: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
    },
    size: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          if (!v) return true; // Optional field
          return /^https?:\/\/.+/.test(v);
        },
        message: "Website must be a valid URL",
      },
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model re-compilation during hot reloads
const Company: Model<ICompany> =
  mongoose.models.Company || mongoose.model<ICompany>("Company", CompanySchema);

export default Company;

