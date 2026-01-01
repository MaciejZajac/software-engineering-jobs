"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveCompanyInfo, getCompanyInfo, type CompanyFormData } from "@/lib/actions/company.actions";

export function CompanyInfoForm() {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CompanyFormData>({
    defaultValues: {
      name: "",
      slug: "",
      logoUrl: "",
      industry: "",
      size: "",
      location: "",
      website: "",
      description: "",
    },
  });

  // Fetch existing company info on mount
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        setIsFetching(true);
        const result = await getCompanyInfo();
        
        if (result.success && result.data) {
          reset({
            name: result.data.name || "",
            slug: result.data.slug || "",
            logoUrl: result.data.logoUrl || "",
            industry: result.data.industry || "",
            size: result.data.size || "",
            location: result.data.location || "",
            website: result.data.website || "",
            description: result.data.description || "",
          });
        }
      } catch (err) {
        console.error("Error fetching company info:", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchCompanyInfo();
  }, [reset]);

  const onSubmit = async (data: CompanyFormData) => {
    try {
      const result = await saveCompanyInfo(data);

      if (result.success) {
        toast.success("Company information saved successfully!");
        // Redirect to profile page after successful save
        router.push("/profile");
      } else {
        toast.error(result.error || "Failed to save company information");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      console.error("Error saving company info:", err);
    }
  };

  if (isFetching) {
    return (
      <div className="space-y-4">
        <div className="h-4 w-32 bg-muted animate-pulse rounded" />
        <div className="h-10 w-full bg-muted animate-pulse rounded" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="name">
          Company Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          {...register("name", { required: "Company name is required" })}
          placeholder="Acme Software"
        />
      </div>

      {/* Logo URL */}
      <div className="space-y-2">
        <Label htmlFor="logoUrl">Logo URL</Label>
        <Input
          id="logoUrl"
          type="url"
          {...register("logoUrl")}
          placeholder="https://example.com/logo.png"
        />
      </div>

      {/* Industry */}
      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Input
          id="industry"
          type="text"
          {...register("industry")}
          placeholder="SaaS, FinTech, AI/ML, etc."
        />
      </div>

      {/* Company Size */}
      <div className="space-y-2">
        <Label htmlFor="size">Company Size</Label>
        <Input
          id="size"
          type="text"
          {...register("size")}
          placeholder="50-100, 100-250, etc."
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          type="text"
          {...register("location")}
          placeholder="Remote, San Francisco, New York, etc."
        />
      </div>

      {/* Website */}
      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          type="url"
          {...register("website")}
          placeholder="https://example.com"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          rows={4}
          {...register("description")}
          className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          placeholder="Brief description of your company..."
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Saving..." : "Save Company Information"}
      </Button>
    </form>
  );
}

