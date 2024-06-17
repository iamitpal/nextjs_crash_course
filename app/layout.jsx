import "@/assets/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import 'photoswipe/dist/photoswipe.css'
import { GlobalProvider } from "@/context/GlobalContext";

export const metadata = {
  title: "PropertyPulse | Find The Perfect Rental Property",
  keywords: "PropertyPulse, Find The Perfect Rental property",
  description: "Find Your Dream Rental Property",
};

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
