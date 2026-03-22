import { useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Loader from "../components/ui/Loader";
import ErrorState from "../components/ui/ErrorState";
import BookingForm from "../components/bookings/BookingForm";
import { useListingDetailsQuery } from "../hooks/useListingDetailsQuery";

const FALLBACK = {
    placeId: "ChIJ7cv00DwsDogRAMDACa2m4K8",
    adults: 1,
    currency: "USD",
};

export default function ListingDetailsPage() {
    const { id } = useParams();
    const { data, isLoading, isError, error, refetch } = useListingDetailsQuery(id, FALLBACK);

    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />
            <main className="mx-auto max-w-5xl space-y-4 px-4 py-4">
                {isLoading ? <Loader text="Loading listing details..." /> : null}
                {isError ? <ErrorState message={error?.userMessage || error?.message} onRetry={refetch} /> : null}

                {!isLoading && !isError && data ? (
                    <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
                        <article className="space-y-3 rounded-xl bg-white p-4 shadow">
                            <img src={data.image} alt={data.title} className="h-80 w-full rounded-lg object-cover" />
                            <h1 className="text-2xl font-bold">{data.title}</h1>
                            <p className="text-slate-600">{data.city}</p>
                            <p>Rating: {data.rating}</p>
                            <p className="font-semibold text-amber-700">{data.price}</p>
                        </article>
                        <BookingForm listing={data} />
                    </div>
                ) : null}
            </main>
        </div>
    );
}
