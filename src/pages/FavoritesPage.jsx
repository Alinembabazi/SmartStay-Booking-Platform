import Navbar from "../components/layout/Navbar";
import ListingCard from "../components/listings/ListingCard";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />
            <main className="mx-auto max-w-6xl px-4 py-4">
                <h1 className="mb-4 text-2xl font-bold">Favorites</h1>
                {!favorites.length ? <p>No favorites yet.</p> : null}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {favorites.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            </main>
        </div>
    );
}
