"use client";

import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/hooks/use-auth";
import { signOut } from "@/lib/better-auth/client";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="h-9 w-9">
        <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
      </div>
    );
  }

  return (
    <div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarFallback>
                {user.name?.slice(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/sign-in">
          <Button variant="outline">Sign In</Button>
        </Link>
      )}
    </div>
  );
};

export default AuthButton;
