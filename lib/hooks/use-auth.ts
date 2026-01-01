"use client";

import { useEffect, useMemo } from "react";
import { useSession as useBetterAuthSession } from "@/lib/better-auth/client";
import { useAuthStore } from "@/lib/stores/auth-store";

/**
 * Hook that syncs better-auth session to Zustand store
 * Use this hook in components that need auth state
 */
export const useAuth = () => {
  const { data: session, isPending } = useBetterAuthSession();
  const { setUser } = useAuthStore();

  // Derive user from session directly to avoid race conditions
  // Memoize to prevent infinite loops
  const user = useMemo(() => {
    if (!session?.user) return null;
    return {
      id: session.user.id,
      name: session.user.name || '',
      email: session.user.email || '',
    };
  }, [session?.user?.id, session?.user?.name, session?.user?.email]);

  // Sync to Zustand store for other components that might need it
  useEffect(() => {
    setUser(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id, session?.user?.name, session?.user?.email, setUser]);

  return {
    user,
    isLoading: isPending,
  };
};

