/** Pure booking filters and sorts; instants are compared numerically so timezone offsets line up. */
import type { Booking } from './data';

export type BookingFilter = 'all' | 'upcoming' | 'past';
export type DateSort = 'asc' | 'desc';

export function filterBookings(bookings: readonly Booking[], filter: BookingFilter, now: Date): Booking[] {
  if (filter === 'all') return [...bookings];
  const cutoff = now.getTime();
  return bookings.filter(booking => filter === 'upcoming'
    ? Date.parse(booking.startsAt) >= cutoff
    : Date.parse(booking.startsAt) < cutoff);
}

export function sortBookings(bookings: readonly Booking[], order: DateSort): Booking[] {
  return [...bookings].sort((a, b) => (Date.parse(a.startsAt) - Date.parse(b.startsAt)) * (order === 'asc' ? 1 : -1));
}
