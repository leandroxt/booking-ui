import { Booking } from '@/store/useBookingStore';

export function formatDate(date: Date) {
  return Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
  }).format(date);
}

/**
 * Parse a date in string type to Date obj
 * @param dateStr date as string in format yyyy-mm-dd or yyyy/mm/dd
 * @returns Date object
 */
export function parseDate(dateStr: string): Date {
  const [year, month, date] = dateStr.split(/\D/);

  return new Date(
    parseInt(year, 10),
    parseInt(month, 10) - 1, // zero index based
    parseInt(date, 10),
    0,
    0,
    0,
    0,
  );
}

export function getToday(): Date {
  const now = new Date();
  const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  return parseDate(today);
}

export function dateToString(dt: Date): string {
  let day = dt.getDate();
  return `${dt.getFullYear()}-${dt.getMonth() + 1}-${
    day < 10 ? `0${day}` : day
  }`;
}

export function validateMurationBooking(
  id: number,
  sDate: string,
  fDate: string,
  bookings: Booking[],
): string[] {
  const startDate = parseDate(sDate);
  const finalDate = parseDate(fDate);
  const intStart = startDate.getTime();
  const intFinal = finalDate.getTime();
  const today = getToday().getTime();
  let errors: string[] = [];
  if (intStart < today) {
    errors = [...errors, 'Start date must be higher or equal than today'];
  }
  if (intStart > intFinal) {
    errors = [...errors, 'Final date must be higher than start date'];
  }

  const isAllowedToCreate = bookings.reduce(
    (accu: boolean, curr: Booking): boolean => {
      const { startDate: bStart, finalDate: bFinal } = curr;
      const isConflicting =
        (intStart >= bStart.getTime() && intStart <= bFinal.getTime()) ||
        (intFinal >= bStart.getTime() && intFinal <= bFinal.getTime());

      if (isConflicting) {
        if (id === curr.ID) {
          return accu && true;
        }
      }

      return accu && !isConflicting;
    },
    true,
  );

  if (!isAllowedToCreate) {
    errors = [...errors, 'Conflicting with existing booking'];
  }

  return errors;
}
