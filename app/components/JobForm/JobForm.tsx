"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createJob, updateJob, type JobFormData } from "@/lib/actions/job.actions";

const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
];

const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD"];

interface JobFormProps {
  initialData?: JobFormData & { slug: string };
  mode?: "create" | "edit";
}

export function JobForm({ initialData, mode = "create" }: JobFormProps) {
  const router = useRouter();
  const [techStackInput, setTechStackInput] = useState("");
  const isEditMode = mode === "edit";

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm<JobFormData>({
    defaultValues: initialData
      ? {
          title: initialData.title || "",
          location: initialData.location || "",
          employmentType: initialData.employmentType || "",
          techStack: initialData.techStack || [],
          salary: initialData.salary,
        }
      : {
          title: "",
          location: "",
          employmentType: "",
          techStack: [],
          salary: undefined,
        },
  });

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || "",
        location: initialData.location || "",
        employmentType: initialData.employmentType || "",
        techStack: initialData.techStack || [],
        salary: initialData.salary,
      });
      // Set salary state if it exists
      if (initialData.salary) {
        setValue("salary", initialData.salary);
      }
    }
  }, [initialData, reset, setValue]);

  const techStack = watch("techStack");
  const hasSalary = watch("salary") !== undefined;

  const addTechStackItem = () => {
    const items = techStackInput
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0 && !techStack.includes(item));

    if (items.length > 0) {
      setValue("techStack", [...techStack, ...items]);
      setTechStackInput("");
    }
  };

  const removeTechStackItem = (item: string) => {
    setValue(
      "techStack",
      techStack.filter((t) => t !== item)
    );
  };

  const onSubmit = async (data: JobFormData) => {
    try {
      const result = isEditMode && initialData?.slug
        ? await updateJob(initialData.slug, data)
        : await createJob(data);

      if (result.success) {
        toast.success(
          isEditMode
            ? "Job listing updated successfully!"
            : "Job listing created successfully!"
        );
        router.push("/profile");
      } else {
        toast.error(
          result.error ||
            (isEditMode
              ? "Failed to update job listing"
              : "Failed to create job listing")
        );
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error(`Error ${isEditMode ? "updating" : "creating"} job:`, err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Job Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          type="text"
          {...register("title", { required: "Job title is required" })}
          placeholder="Senior Backend Engineer"
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">
          Location <span className="text-destructive">*</span>
        </Label>
        <Input
          id="location"
          type="text"
          {...register("location", { required: "Location is required" })}
          placeholder="Remote (EU), San Francisco, CA, etc."
        />
      </div>

      {/* Employment Type */}
      <div className="space-y-2">
        <Label htmlFor="employmentType">
          Employment Type <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="employmentType"
          control={control}
          rules={{ required: "Employment type is required" }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id="employmentType" className="w-full">
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                {EMPLOYMENT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Salary Section */}
      <div className="space-y-4 border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <Label>Salary (Optional)</Label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setValue("salary", hasSalary ? undefined : { min: 0, max: 0, currency: "USD" })}
          >
            {hasSalary ? "Remove" : "Add Salary"}
          </Button>
        </div>

        {hasSalary && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="salaryMin">Min Salary</Label>
              <Controller
                name="salary.min"
                control={control}
                render={({ field }) => (
                  <Input
                    id="salaryMin"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    placeholder="100000"
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salaryMax">Max Salary</Label>
              <Controller
                name="salary.max"
                control={control}
                render={({ field }) => (
                  <Input
                    id="salaryMax"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    placeholder="150000"
                  />
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salaryCurrency">Currency</Label>
              <Controller
                name="salary.currency"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="salaryCurrency">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        )}
      </div>

      {/* Tech Stack */}
      <div className="space-y-2">
        <Label htmlFor="techStack">Tech Stack</Label>
        <div className="flex gap-2">
          <Input
            id="techStack"
            type="text"
            value={techStackInput}
            onChange={(e) => setTechStackInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTechStackItem();
              }
            }}
            placeholder="React, TypeScript, Node.js (comma-separated)"
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={addTechStackItem}
            disabled={!techStackInput.trim()}
          >
            Add
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Enter technologies separated by commas and click Add, or press Enter
        </p>

        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="gap-1.5 pr-1.5"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechStackItem(tech)}
                  className="ml-1 rounded-full hover:bg-secondary-foreground/20 p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1 sm:flex-initial">
          {isSubmitting
            ? isEditMode
              ? "Updating..."
              : "Creating..."
            : isEditMode
            ? "Update Job Listing"
            : "Create Job Listing"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

