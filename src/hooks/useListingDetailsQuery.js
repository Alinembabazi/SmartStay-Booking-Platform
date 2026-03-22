import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchListings } from "../services/listings";
import { normalizeListing } from "../utils/normalizeListing";
import { FALLBACK_LISTINGS } from "../data/fallbackListings";

export function useListingDetailsQuery(listingId, fallbackSearchParams) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["listing", listingId],
    queryFn: async () => {
      const cachedListingQueries = queryClient
        .getQueryCache()
        .findAll({ queryKey: ["listings"] })
        .map((entry) => entry.state.data?.normalized || []);

      const cached = cachedListingQueries.flat().find((item) => item.id === listingId);
      if (cached) return cached;

      const fallback = FALLBACK_LISTINGS.find((item) => item.id === listingId);
      if (fallback) return fallback;

      const response = await fetchListings(fallbackSearchParams);
      const found = (response?.data?.list || []).find((item) => item?.listing?.id === listingId);
      if (!found) throw new Error("Listing not found");
      return normalizeListing(found);
    },
    enabled: Boolean(listingId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}