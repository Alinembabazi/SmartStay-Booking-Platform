import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBookingStore = create(
  persist(
    (set, get) => ({
      bookings: [],
      addBooking: (booking) => {
        const newBooking = { id: crypto.randomUUID(), createdAt: Date.now(), ...booking };
        set({ bookings: [newBooking, ...get().bookings] });
        return newBooking;
      },
      cancelBooking: (id) => set({ bookings: get().bookings.filter((item) => item.id !== id) }),
    }),
    {
      name: "bookings-store",
    }
  )
);