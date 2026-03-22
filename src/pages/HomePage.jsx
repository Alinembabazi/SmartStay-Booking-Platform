import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import SidebarFilters from "../components/layout/SidebarFilters";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";
import ListingCard from "../components/listings/ListingCard";
import { useListingsQuery } from "../hooks/useListingsQuery";
import { useFilters } from "../context/FiltersContext";

const DEFAULT_PLACE_ID = "ChIJ7cv00DwsDogRAMDACa2m4K8";

function parsePrice(value) {
    if (!value) return NaN;
    const normalized = String(value).replace(/,/g, "");
    const match = normalized.match(/\$\s*(\d+(?:\.\d+)?)/);
    if (!match?.[1]) return NaN;
    return Number(match[1]);
}

export default function HomePage() {
    const { filters, setFilters } = useFilters();
    const [searchParams] = useSearchParams();

    const queryText = searchParams.get("q") || filters.query;

    useEffect(() => {
        if (queryText !== filters.query) {
            setFilters((prev) => ({ ...prev, query: queryText }));
        }
    }, [filters.query, queryText, setFilters]);

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
        const minPrice = Number(filters.minPrice);
        const maxPrice = Number(filters.maxPrice);
        const minRating = Number(filters.minRating);

        return list.filter((item) => {
            const textOk = !queryText || item.title.toLowerCase().includes(queryText.toLowerCase()) || item.city.toLowerCase().includes(queryText.toLowerCase());
            const locationOk = !filters.location || item.city.toLowerCase().includes(filters.location.toLowerCase());
            const priceNumber = parsePrice(item.price);
            const minPriceOk = !filters.minPrice || (!Number.isNaN(priceNumber) && priceNumber >= minPrice);
            const maxPriceOk = !filters.maxPrice || (!Number.isNaN(priceNumber) && priceNumber <= maxPrice);
            const ratingNumber = Number(item.rating);
            const minRatingOk = !filters.minRating || (!Number.isNaN(ratingNumber) && ratingNumber >= minRating);
            return textOk && locationOk && minPriceOk && maxPriceOk && minRatingOk;
        });
    }, [data?.normalized, filters.location, filters.maxPrice, filters.minPrice, filters.minRating, queryText]);

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
                        <>
                            {!filtered.length ? (
                                <div className="rounded-xl border border-slate-200 bg-white p-5 text-slate-600">
                                    No listings match your current search and filters.
                                </div>
                            ) : null}
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {filtered.map((listing) => (
                                    <ListingCard key={listing.id} listing={listing} />
                                ))}
                            </div>
                        </>
                    ) : null}
                </section>
            </main>
        </div>
    );
}
