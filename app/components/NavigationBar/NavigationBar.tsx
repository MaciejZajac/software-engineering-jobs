"use client"

import Link from "next/link"
import { Menu, Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const NavigationBar = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark)
    setIsDark(shouldBeDark)
    
    if (shouldBeDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    
    if (newIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Left: Logo + Navigation */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold">
            DevJobs
          </Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-4">
              <NavigationMenuItem>
                <Link href="/" className="text-sm font-medium">
                  Jobs
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/companies" className="text-sm font-medium">
                  Companies
                </Link>
              </NavigationMenuItem>
              
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden sm:inline-flex">
            Post a job
          </Button>

          {/* Theme Toggle */}
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-4">
                <Link href="/" className="text-lg font-bold">
                  DevJobs
                </Link>

                <Separator />

                <nav className="flex flex-col gap-3 text-sm">
                  <Link href="/jobs">Jobs</Link>
                  <Link href="/companies">Companies</Link>
                  <Link href="/jobs?remote=true">Remote jobs</Link>
                  <Link href="/post-job">Post a job</Link>
                </nav>

                <Separator />

                <Button
                  variant="ghost"
                  onClick={toggleTheme}
                  className="w-full justify-start"
                >
                  {isDark ? (
                    <>
                      <Sun className="mr-2 h-4 w-4" />
                      Light mode
                    </>
                  ) : (
                    <>
                      <Moon className="mr-2 h-4 w-4" />
                      Dark mode
                    </>
                  )}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default NavigationBar;
