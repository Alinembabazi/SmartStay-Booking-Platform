import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

export default function ListingCard({ listing }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <article className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <img src={listing.image} alt={listing.title} className="h-44 w-full object-cover" />
      <div className="space-y-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold">{listing.title}</h3>
          <button
            onClick={() => toggleFavorite(listing)}
            className="rounded-md border px-2 py-1 text-xs"
            type="button"
          >
            {isFavorite(listing.id) ? "Saved" : "Save"}
          </button>
        </div>
        <p className="text-sm text-slate-600">{listing.city}</p>
        <p className="text-sm">Rating: {listing.rating}</p>
        <p className="font-medium text-amber-700">{listing.price}</p>
        <Link className="inline-block rounded-md bg-slate-900 px-3 py-1 text-sm text-white" to={`/listing/${listing.id}`}>
          View details
        </Link>
      </div>
    </article>
  );
}
