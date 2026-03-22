import { useQuery } from "@tanstack/react-query";
import { fetchListings } from "../services/listings";
import { normalizeListings } from "../utils/normalizeListing";
import { FALLBACK_LISTINGS } from "../data/fallbackListings";

export function useListingsQuery(searchParams) {
  return useQuery({
    queryKey: ["listings", searchParams],
    queryFn: async () => {
      try {
        const response = await fetchListings(searchParams);
        return {
          normalized: normalizeListings(response),
          raw: response,
          isFallback: false,
        };
      } catch (error) {
        if (error?.response?.status === 429) {
          return {
            normalized: FALLBACK_LISTINGS,
            raw: null,
            isFallback: true,
            fallbackMessage: "Rate limit reached, showing 100 demo listings.",
          };
        }

        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

