const CITIES = [
  "Kigali",
  "Musanze",
  "Huye",
  "Rubavu",
  "Nyagatare",
  "Rwamagana",
  "Muhanga",
  "Karongi",
  "Nyanza",
  "Rusizi",
];

export const FALLBACK_LISTINGS = Array.from({ length: 100 }, (_, index) => {
  const id = `fallback-${index + 1}`;
  const city = CITIES[index % CITIES.length];
  const nightly = 35 + ((index * 7) % 120);
  const nights = 5;
  const total = nightly * nights;

  return {
    id,
    title: `Demo Stay ${index + 1}`,
    city,
    image: `https://picsum.photos/seed/stay-${index + 1}/800/500`,
    rating: (4 + ((index % 10) / 10)).toFixed(1),
    price: `$${total} for ${nights} nights`,
    raw: {
      listing: { id, title: `Demo Stay ${index + 1}`, legacyCity: city },
      demandStayListing: { location: { city } },
      contextualPictures: [{ picture: `https://picsum.photos/seed/stay-${index + 1}/800/500` }],
      avgRatingLocalized: (4 + ((index % 10) / 10)).toFixed(1),
      structuredDisplayPrice: { primaryLine: { price: `$${total} for ${nights} nights` } },
    },
  };
});
