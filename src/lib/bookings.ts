import type { Booking } from './data';

export type BookingFilter = 'all' | 'upcoming' | 'past';
export type DateSort = 'asc' | 'desc';

export function filterBookings(bookings: readonly Booking[], filter: BookingFilter, now: Date): Booking[] {
  return bookings.filter(booking => {
    const startsAt = Date.parse(booking.startsAt);
    return filter === 'all' || (filter === 'upcoming' ? startsAt >= now.getTime() : startsAt < now.getTime());
  });
}

export function sortBookings(bookings: readonly Booking[], order: DateSort): Booking[] {
  return [...bookings].sort((a, b) => (Date.parse(a.startsAt) - Date.parse(b.startsAt)) * (order === 'asc' ? 1 : -1));
}
