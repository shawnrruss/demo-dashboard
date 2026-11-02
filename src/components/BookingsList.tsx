/** Hydrated island: filter buttons plus a date sort over one member's bookings. */
import { useState } from 'react';
import type { Booking } from '../lib/data';
import { filterBookings, sortBookings, type BookingFilter, type DateSort } from '../lib/bookings';

const FILTERS: BookingFilter[] = ['all', 'upcoming', 'past'];

export default function BookingsList({ bookings }: { bookings: Booking[] }) {
  const [filter, setFilter] = useState<BookingFilter>('all');
  const [order, setOrder] = useState<DateSort>('asc');
  const visible = sortBookings(filterBookings(bookings, filter, new Date()), order);
  return <section aria-labelledby="bookings-title">
    <h2 id="bookings-title" className="mb-5 text-2xl font-semibold">Plot bookings</h2>
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div role="group" aria-label="Filter bookings" className="flex flex-wrap gap-2">
        {FILTERS.map(value => <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}
          className={`min-h-11 rounded-full border border-green-900/25 px-4 py-2 text-sm ${filter === value ? 'bg-green-950 text-white' : 'bg-white text-green-950'}`}
        >{value.charAt(0).toUpperCase() + value.slice(1)}</button>)}
      </div>
      <label className="flex items-center gap-2 text-sm">
        Sort by date
        <select className="min-h-11 rounded-lg border border-green-900/25 bg-white px-3 py-2" value={order} onChange={event => setOrder(event.target.value as DateSort)}>
          <option value="asc">Earliest first</option>
          <option value="desc">Latest first</option>
        </select>
      </label>
    </div>
    <div aria-live="polite" aria-atomic="true">
    <p className="mb-3 text-sm text-green-950/70">{visible.length} {visible.length === 1 ? 'booking' : 'bookings'}</p>
    <ul aria-label="Bookings" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {visible.map(booking => <li key={booking.id} className="rounded-2xl border border-green-900/15 bg-white p-5">
        <h3 className="text-lg font-semibold">{booking.title}</h3>
        <p className="mt-2 text-sm text-green-950/70">{booking.plot}</p>
        <time className="mt-4 block text-sm font-medium" dateTime={booking.startsAt}>{new Date(booking.startsAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' })} UTC</time>
      </li>)}
    </ul>
    {visible.length === 0 && <p className="mt-5 text-green-950/70">No bookings to show.</p>}
    </div>
  </section>;
}
