import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJob extends Document {
  userId: string; // Links to better-auth user ID (company owner)
  title: string;
  slug: string;
  location: string;
  employmentType: string;
  seniorityLevel: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  techStack: string[];
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
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
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    employmentType: {
      type: String,
      required: true,
      trim: true,
    },
    seniorityLevel: {
      type: String,
      required: true,
      trim: true,
      enum: ["Junior", "Mid", "Senior", "Principal"],
    },
    salary: {
      min: {
        type: Number,
        min: 0,
      },
      max: {
        type: Number,
        min: 0,
      },
      currency: {
        type: String,
        trim: true,
        uppercase: true,
      },
    },
    techStack: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model re-compilation during hot reloads
const Job: Model<IJob> =
  mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);

export default Job;

