import { useAuth } from '@/lib/hooks/use-auth';
import { redirect } from 'next/navigation';
import React from 'react'

const Layout = async ({ children}: { children: React.ReactNode}) => {
    const { isLoading, user} = useAuth();
    if(isLoading) return null;
  
    if(!user?.id) redirect("/sign-in");

  return null
}

export default Layout