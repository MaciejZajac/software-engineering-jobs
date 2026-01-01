import ProfileNavigation from "@/app/components/ProfileNavigation/ProfileNavigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <ProfileNavigation />
      {children}
    </div>
  );
};

export default Layout;
