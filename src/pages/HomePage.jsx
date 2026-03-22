import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import SidebarFilters from "../components/layout/SidebarFilters";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";
import ListingCard from "../components/listings/ListingCard";
import { useListingsQuery } from "../hooks/useListingsQuery";
import { useFilters } from "../context/FiltersContext";

const DEFAULT_PLACE_ID = "ChIJ7cv00DwsDogRAMDACa2m4K8";

export default function HomePage() {
    const { filters } = useFilters();
    const [searchParams] = useSearchParams();

    const queryText = searchParams.get("q") || filters.query;

    const queryInput = useMemo(
        () => ({
            placeId: DEFAULT_PLACE_ID,
            adults: 1,
            currency: "USD",
            guestFavorite: false,
            instantBook: false,
        }),
        []
    );

    const { data, isLoading, isError, error, refetch } = useListingsQuery(queryInput);

    const filtered = useMemo(() => {
        const list = data?.normalized || [];

        return list.filter((item) => {
            const textOk = !queryText || item.title.toLowerCase().includes(queryText.toLowerCase()) || item.city.toLowerCase().includes(queryText.toLowerCase());
            const locationOk = !filters.location || item.city.toLowerCase().includes(filters.location.toLowerCase());
            const ratingNumber = Number(item.rating);
            const minRatingOk = !filters.minRating || Number.isNaN(ratingNumber) || ratingNumber >= Number(filters.minRating);
            return textOk && locationOk && minRatingOk;
        });
    }, [data?.normalized, filters.location, filters.minRating, queryText]);

    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />
            <main className="mx-auto grid max-w-6xl gap-4 px-4 py-4 md:grid-cols-[260px_1fr]">
                <SidebarFilters />

                <section>
                    {isLoading ? <Loader text="Fetching listings..." /> : null}
                    {isError ? <ErrorState message={error?.userMessage || error?.message} onRetry={refetch} /> : null}
                    {data?.isFallback ? (
                        <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-amber-800">
                            {data.fallbackMessage}
                        </div>
                    ) : null}

                    {!isLoading && !isError ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((listing) => (
                                <ListingCard key={listing.id} listing={listing} />
                            ))}
                        </div>
                    ) : null}
                </section>
            </main>
        </div>
    );
}
