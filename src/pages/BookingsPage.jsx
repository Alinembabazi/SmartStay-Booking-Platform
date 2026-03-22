import Navbar from "../components/layout/Navbar";
import { useBookingStore } from "../store/useBookingStore";

export default function BookingsPage() {
    const bookings = useBookingStore((state) => state.bookings);
    const cancelBooking = useBookingStore((state) => state.cancelBooking);

    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />
            <main className="mx-auto max-w-4xl space-y-3 px-4 py-4">
                <h1 className="text-2xl font-bold">Bookings dashboard</h1>
                {!bookings.length ? <p>No bookings yet.</p> : null}
                {bookings.map((booking) => (
                    <article key={booking.id} className="rounded-xl bg-white p-4 shadow">
                        <h2 className="font-semibold">{booking.title}</h2>
                        <p>{booking.city}</p>
                        <p>{booking.checkin} to {booking.checkout}</p>
                        <button
                            type="button"
                            className="mt-2 rounded-md bg-red-600 px-3 py-1 text-sm text-white"
                            onClick={() => cancelBooking(booking.id)}
                        >
                            Cancel booking
                        </button>
                    </article>
                ))}
            </main>
        </div>
    );
}
