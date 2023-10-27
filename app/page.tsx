import BookingDates from '@/components/BookingDates';
import ListBookings from '@/components/ListBookings';

export default function Home() {
  return (
    <main className="container mx-auto px-4 md:px-0">
      <BookingDates />
      <ListBookings />
    </main>
  );
}
