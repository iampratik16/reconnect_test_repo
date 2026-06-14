export function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Reconnect Wellness",
    description: "Doctor-designed strength and nutrition program for joint pain, arthritis, and bone health",
    url: "https://reconnect.health",
    image: "https://reconnect.health/og-image.jpg",
    areaServed: "IN",
    priceRange: "₹₹",
    serviceType: ["Online Fitness Program", "Nutrition Coaching"],
    founder: {
      "@type": "Person",
      name: "Dr. Shruthi Desai",
      jobTitle: "Rheumatologist",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      description: "Personalized strength training and nutrition programs for arthritis, joint pain, and bone health",
    },
    sameAs: [
      "https://www.instagram.com/reconnectwellness",
      "https://www.linkedin.com/company/reconnectwellness",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
