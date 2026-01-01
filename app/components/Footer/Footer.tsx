import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const Footer = () => {
  return (
    <footer className="border-t bg-background/50 py-8">
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        {/* Branding */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">DevJobs</h2>
          <p className="text-sm text-muted-foreground">
            Connecting software engineers with top companies
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <Link href="/jobs" className="hover:text-primary">
            Jobs
          </Link>
          <Link href="/companies" className="hover:text-primary">
            Companies
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
          <Link href="/terms" className="hover:text-primary">
            Terms
          </Link>
          <Link href="/privacy" className="hover:text-primary">
            Privacy
          </Link>
        </div>

        {/* Optional badges or small info */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline">© 2026 DevJobs</Badge>
          <span className="hidden sm:inline">— Made for engineers</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer;