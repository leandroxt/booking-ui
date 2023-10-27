import { create } from 'zustand';

export interface Booking {
  ID: number;
  startDate: Date;
  finalDate: Date;
}

interface BookingState {
  bookingDates: Booking[];
  createBooking: (date: Booking) => void;
  deleteBooking: (id: number) => void;
  updateBooking: (id: number, start: Date, final: Date) => void;
}

function sortBooking(a: Booking, b: Booking) {
  return a.startDate.getTime() < b.finalDate.getTime() ? -1 : 1;
}

const useBookingStore = create<BookingState>()((set, get) => ({
  bookingDates: [],
  createBooking(date: Booking) {
    set(({ bookingDates }) => ({
      bookingDates: [...bookingDates, date].sort(sortBooking),
    }));
  },
  deleteBooking(id: number) {
    const bookingDates = get().bookingDates.filter(
      (booking) => booking.ID !== id,
    );

    set(() => ({ bookingDates }));
  },
  updateBooking(id: number, startDate: Date, finalDate: Date) {
    set((state) => ({
      bookingDates: state.bookingDates
        .map((b) => (b.ID === id ? { ...b, startDate, finalDate } : b))
        .sort(sortBooking),
    }));
  },
}));

export default useBookingStore;
