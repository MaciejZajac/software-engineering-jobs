"use server";

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";

// Helper function to check authentication and return session
// Must be in a "use server" file because it uses headers()
export async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return session;
}

