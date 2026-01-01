import Footer from "../components/Footer/Footer";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <NavigationBar />
      <main className="py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;