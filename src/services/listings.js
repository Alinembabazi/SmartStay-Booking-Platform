import { api } from "./api";

export async function fetchListings(params) {
  const response = await api.get("/searchPropertyByPlaceId", {
    params: {
      placeId: params.placeId,
      adults: params.adults ?? 1,
      currency: params.currency ?? "USD",
      checkin: params.checkin,
      checkout: params.checkout,
      ib: params.instantBook ?? false,
      guestFavorite: params.guestFavorite ?? false,
    },
  });

  return response.data;
}