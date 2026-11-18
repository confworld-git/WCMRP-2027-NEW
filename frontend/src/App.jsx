import Homepage from "./Home/Homepage";
import Contact from "./Contact/Contact";

import { useEffect } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Venue from "./Venue/Venue";
import Faq from "./Faq/Faq";
import Publication from "./Publication/Publication";
import About from "./About/About";
import Guidelines from "./Guidelines/Guidelines";
import Available from "./Available/Available";
import Instructions from "./Instructions/Instructions";
import TermsAndConditions from "./Terms/TermsAndConditions";
import Essential from "./Essential/Essential";
import Speaker from "./Speaker/Speaker";
import AdminLoginPage from "./Admin/AdminLoginPage";
import { AdminAuthProvider } from "./Admin/AdminAuthContext.jsx";
import RequireAdmin from "./Admin/RequireAdmin";
import Dashboard from "./Dashboard/Dashboard";
import Organizer from "./Organizer/Organizer";
import Committee from "./Speaker/Committee/Committee";
import CallForPapers from "./CallForPapers/CallForPapers";
import CommitteeForm from "./CommitteeForm/CommitteeForm";
import PaperSubmit from "./PaperSubmit/PaperSubmit";
import RegistrationFee from "./RegistrationFee/RegistrationFee";
import Partnership from "./Partnership/Partnership";
import ScrollToTop from "./ScrollToTop";
import PaymentSuccess from "./PaymentSuccess/PaymentSuccess.jsx";

import Layout from "./Layout";

function App() {
  useEffect(() => {
    window.AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <AdminAuthProvider>
      <ScrollToTop />
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerStyle={{ zIndex: 100000 }}
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            borderRadius: "10px",
          },
        }}
      />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/Payment-success-page" element={<PaymentSuccess />} />
          <Route path="/login" element={<AdminLoginPage />} />
          <Route
            path="/dashboard"
            element={
              <RequireAdmin>
                <Dashboard />
              </RequireAdmin>
            }
          />
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/frequently-asked-questions" element={<Faq />} />
          <Route path="/Publication" element={<Publication />} />
          <Route path="/Committee-Members" element={<Committee />} />
          <Route
            path="/Session-Tracks-&-Call-For-Papers"
            element={<CallForPapers />}
          />
          <Route path="/About-WCMRP" element={<About />} />
          <Route path="/About-Organizer" element={<Organizer />} />
          <Route path="/Submission-Guidelines" element={<Guidelines />} />
          <Route path="/Available-payment-methods" element={<Available />} />
          <Route
            path="/Registration-Instructions"
            element={<Instructions />}
          />
          <Route
            path="/Terms-and-Conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/Essential-Downloads" element={<Essential />} />
          <Route path="/Speakers" element={<Speaker />} />
          <Route path="/Registration-Fee" element={<RegistrationFee />} />
          <Route path="/Academic-Partnership" element={<Partnership />} />
          <Route
            path="/abstract-full-paper-submission"
            element={<PaperSubmit />}
          />
          <Route
            path="/organizing-committee-member-form"
            element={<CommitteeForm />}
          />
        </Route>
      </Routes>
    </AdminAuthProvider>
  );
}

export default App;
