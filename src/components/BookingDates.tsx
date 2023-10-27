'use client';
import useBookingDates from './BookingDates.hook';
import FormDates from '@/components/shared/FormDates';

export default function BookingDates() {
  const { startDate, finalDate, onChange, onCreateBooking, errors } =
    useBookingDates();

  return (
    <>
      <FormDates
        label="Create"
        startDate={startDate}
        finalDate={finalDate}
        errors={errors}
        onChange={onChange}
        onCreate={onCreateBooking}
      />
    </>
  );
}
