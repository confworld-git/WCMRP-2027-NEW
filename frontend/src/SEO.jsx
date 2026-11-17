import { Helmet } from "react-helmet-async";
import { SITE_URL } from "./seoSchemas";

const SITE_NAME = "WCMRP 2027";
const DEFAULT_IMAGE = `${SITE_URL}/wcmrp_logo.png`;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Confworld Educational Research and Development Association",
  alternateName: "Confworld",
  url: SITE_URL,
  logo: DEFAULT_IMAGE,
};

const SEO = ({
  title,
  description = "Join WCMRP 2027 in Kuala Lumpur, Malaysia.",
  keywords = "",
  path = "/",
  image = DEFAULT_IMAGE,
  noIndex = false,
  jsonLd,
}) => {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${SITE_URL}${normalizedPath}`;
  const imageUrl = image.startsWith("http")
    ? image
    : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEO;
