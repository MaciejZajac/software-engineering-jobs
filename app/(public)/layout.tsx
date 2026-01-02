"use client";
import { useAuth } from "@/lib/hooks/use-auth";
import Footer from "../components/Footer/Footer";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import ProfileNavigation from "../components/ProfileNavigation/ProfileNavigation";
import { getSession } from "better-auth/api";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user} = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4">
      {user ? <ProfileNavigation /> : <NavigationBar />}
      <main className="py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;