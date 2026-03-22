export function extractListingArray(payload) {
  if (Array.isArray(payload)) return payload;
  return payload?.data?.list || payload?.data?.results || [];
}

export function normalizeListing(item) {
  return {
    id: item?.listing?.id || item?.id || "unknown-id",
    title: item?.listing?.title || item?.title || item?.listing?.legacyName || "Untitled stay",
    city: item?.demandStayListing?.location?.city || item?.listing?.legacyCity || "Unknown location",
    image: item?.contextualPictures?.[0]?.picture || "logo.png",
    rating: item?.avgRatingLocalized || "New",
    price:
      item?.structuredDisplayPrice?.primaryLine?.discountedPrice ||
      item?.structuredDisplayPrice?.primaryLine?.price ||
      "N/A",
    raw: item,
  };
}

export function normalizeListings(payload) {
  return extractListingArray(payload).map(normalizeListing);
}