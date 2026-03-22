import { useState } from "react";
import { useBookingStore } from "../../store/useBookingStore";

export default function BookingForm({ listing }) {
    const addBooking = useBookingStore((state) => state.addBooking);
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [feedback, setFeedback] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault(); // stop the page from refreshing
        if (!checkin || !checkout) {
            setFeedback({
                type: "error",
                text: "Please select check-in and check-out dates.",
            });
            return;
        }

        addBooking({
            listingId: listing.id,
            title: listing.title,
            city: listing.city,
            checkin,
            checkout,
            price: listing.price,
        });

        setFeedback({
            type: "success",
            text: "Booking confirmed. Your stay has been added successfully.",
        });
        setCheckin("");
        setCheckout("");
    };

    return (
        <form onSubmit={onSubmit} className="space-y-3 rounded-xl border bg-white p-4">
            <h3 className="font-semibold">Book this listing</h3>
            <input type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} className="w-full rounded-md border p-2" />
            <input type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} className="w-full rounded-md border p-2" />
            <button type="submit" className="rounded-md bg-slate-900 px-4 py-2 text-white">
                Confirm booking
            </button>
            {feedback ? (
                <div
                    role="alert"
                    aria-live="polite"
                    className={`rounded-lg border px-3 py-2 text-sm ${
                        feedback.type === "success"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                            : "border-red-200 bg-red-50 text-red-800"
                    }`}
                >
                    <div className="flex items-start gap-2">
                        <span className="mt-0.5 text-base leading-none">
                            {feedback.type === "success" ? "✓" : "!"}
                        </span>
                        <p>{feedback.text}</p>
                    </div>
                </div>
            ) : null}
        </form>
    );
}
