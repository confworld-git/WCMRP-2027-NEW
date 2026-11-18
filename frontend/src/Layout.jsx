import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../src/Home/Navbar/Navbar";
import Footer from "../src/Home/Footer/Footer";
import SEO from "./SEO";
import { conferenceEventSchema, SITE_URL } from "./seoSchemas";
import registrationFees from "./RegistrationFee/Registrationfees.json";
import "./public-responsive.css";

const registrationPrices = [
  ...registrationFees.physical.rows.flatMap(({ fees }) => fees),
  ...registrationFees.virtual.rows.flatMap(({ fees }) => fees),
];

const registrationEventSchema = {
  ...conferenceEventSchema,
  url: `${SITE_URL}/Registration-Fee`,
  offers: {
    "@type": "AggregateOffer",
    url: `${SITE_URL}/Registration-Fee`,
    priceCurrency: registrationFees.currency,
    lowPrice: Math.min(...registrationPrices),
    highPrice: Math.max(...registrationPrices),
    offerCount: registrationPrices.length,
  },
};

const PAGE_METADATA = {
  "/": {
    title: "World Conference on Multidisciplinary Research & Practices",
    description:
      "Join WCMRP 2027 on 24–25 May in Kuala Lumpur, Malaysia. Present your research and connect with global scholars.",
    keywords:
      "WCMRP 2027, multidisciplinary research conference, international conference",
  },
  "/contact": {
    title: "Contact WCMRP 2027",
    description:
      "Contact the WCMRP 2027 team for help with conference registration, paper submissions, partnerships, and general enquiries.",
    keywords:
      "contact WCMRP 2027, conference contact, academic conference enquiries, research conference support",
  },
  "/venue": {
    title: "Conference Venue in Kuala Lumpur",
    description:
      "Explore the venue for WCMRP 2027 in Kuala Lumpur, Malaysia, and plan your visit to the international multidisciplinary research conference.",
    keywords:
      "WCMRP 2027 venue, Kuala Lumpur conference venue, Malaysia academic conference, conference travel",
  },
  "/frequently-asked-questions": {
    title: "Frequently Asked Questions",
    description:
      "Find answers about WCMRP 2027 registration, abstract and paper submissions, conference participation, and publication opportunities.",
    keywords:
      "WCMRP 2027 FAQ, conference questions, registration questions, paper submission help, academic conference information",
  },
  "/Publication": {
    title: "Research Publication Opportunities",
    description:
      "Learn about the proceedings, journal publication opportunities, peer review, and plagiarism checks available through WCMRP 2027.",
    keywords:
      "WCMRP 2027 publication, conference proceedings, journal publication, academic peer review, research publication opportunities",
  },
  "/Committee-Members": {
    title: "Scientific Committee Members",
    description:
      "Meet the scientific committee supporting WCMRP 2027 and its multidisciplinary research programme.",
    keywords:
      "WCMRP 2027 scientific committee, conference committee members, academic research committee",
  },
  "/Submission-Guidelines": {
    title: "Research Submission Guidelines",
    description:
      "Review the abstract and full-paper preparation and submission guidelines for the WCMRP 2027 international research conference.",
    keywords:
      "WCMRP 2027 submission guidelines, abstract guidelines, full paper submission, research paper format",
  },
  "/Available-payment-methods": {
    title: "Available Payment Methods",
    description:
      "Review the available payment options for WCMRP 2027 conference registration and fees.",
    keywords:
      "WCMRP 2027 payment methods, conference registration payment, academic conference fees",
  },
  "/Registration-Instructions": {
    title: "Conference Registration Instructions",
    description:
      "Follow the registration and payment steps for attending or presenting at WCMRP 2027.",
    keywords:
      "WCMRP 2027 registration instructions, conference registration, presenter registration, registration payment",
  },
  "/Terms-and-Conditions": {
    title: "Terms and Conditions",
    description:
      "Read the terms and conditions for WCMRP 2027 conference registration, participation, and related services.",
    keywords:
      "WCMRP 2027 terms and conditions, conference registration terms, conference participation policy",
  },
  "/Essential-Downloads": {
    title: "Conference Documents and Templates",
    description:
      "Download WCMRP 2027 conference documents, including the brochure, poster, registration form, and research paper templates.",
    keywords:
      "WCMRP 2027 downloads, abstract template, full paper template, conference brochure, registration form",
  },
  "/Speakers": {
    title: "WCMRP 2027 Keynote Speakers",
    description:
      "Discover the keynote speakers sharing their expertise at the 3rd World Conference on Multidisciplinary Research and Practices.",
    keywords:
      "WCMRP 2027 keynote speakers, conference speakers, multidisciplinary research experts",
  },
  "/Registration-Fee": {
    title: "WCMRP 2027 Registration Fees",
    description:
      "View WCMRP 2027 registration fees, group discounts, paper submission charges, and important payment deadlines.",
    keywords:
      "WCMRP 2027 registration fees, conference fee, academic conference registration, group discount",
    jsonLd: registrationEventSchema,
  },
  "/Academic-Partnership": {
    title: "Academic Partnership Opportunities",
    description:
      "Learn how institutions and academic organizations can partner with WCMRP 2027 and support international research collaboration.",
    keywords:
      "WCMRP 2027 academic partnership, conference partnership, institutional collaboration, research collaboration",
  },
  "/abstract-full-paper-submission": {
    title: "Abstract and Full Paper Submission",
    description:
      "Submit an abstract or full research paper for consideration at the WCMRP 2027 multidisciplinary research conference.",
    keywords:
      "WCMRP 2027 paper submission, submit abstract, submit full paper, call for papers, research conference submission",
  },
  "/login": {
    title: "Admin Login",
    description:
      "Sign in to manage WCMRP 2027 conference content and settings.",
    noIndex: true,
  },
  "/dashboard": {
    title: "Admin Dashboard",
    description:
      "Manage WCMRP 2027 registrations, submissions, contact requests, and conference content.",
    noIndex: true,
  },
  "/Payment-success-page": {
    title: "Payment Confirmation",
    description: "Confirmation of your WCMRP 2027 registration payment.",
    noIndex: true,
  },
};

function Layout() {
  const { pathname } = useLocation();
  const pageMetadata = PAGE_METADATA[pathname];
  const isStandalonePage = [
    "/login",
    "/dashboard",
    "/Payment-success-page",
  ].includes(pathname);

  return (
    <>
      {pageMetadata && <SEO {...pageMetadata} path={pathname} />}
      {isStandalonePage ? (
        <Outlet />
      ) : (
        <div className="public-site">
          <Navbar />
          <Outlet />
          <Footer />
          <div className="floating_button">
            <a href="/abstract-full-paper-submission">Submit Paper</a>
            <a href="/Registration-Fee">Register Now</a>
          </div>
        </div>
      )}
    </>
  );
}

export default Layout;
