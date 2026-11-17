export const SITE_URL = import.meta.env.VITE_FRONT_END_ULR.replace(/\/+$/, "");

const DEFAULT_IMAGE = `${SITE_URL}/wcmrp_logo.png`;

export const conferenceEventSchema = {
  "@context": "https://schema.org",
  "@type": "Event",
  "@id": `${SITE_URL}/#wcmrp-2027`,
  name: "3rd World Conference on Multidisciplinary Research & Practices (WCMRP 2027)",
  description:
    "A hybrid international conference bringing researchers and professionals together for multidisciplinary research and practices.",
  url: SITE_URL,
  image: DEFAULT_IMAGE,
  startDate: "2027-05-24",
  endDate: "2027-05-25",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Kuala Lumpur, Malaysia",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kuala Lumpur",
      addressCountry: "MY",
    },
  },
  organizer: { "@id": `${SITE_URL}/#organization` },
};
