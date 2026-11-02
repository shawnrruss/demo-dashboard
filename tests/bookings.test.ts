import { expect, test } from 'vitest';
import { filterBookings, sortBookings } from '../src/lib/bookings';
import type { Booking } from '../src/lib/data';

const now = new Date('2026-11-01T10:00:00Z');
const booking = (id: string, startsAt: string): Booking => ({ id, startsAt, memberId: 'member-1', title: id, plot: 'Basil 04' });
const past = booking('past', '2026-10-31T10:00:00Z');
const exact = booking('exact', '2026-11-01T10:00:00Z');
const future = booking('future', '2026-11-02T10:00:00Z');
const bookings = [future, past, exact];

test('upcoming includes the exact injected now boundary', () => {
  expect(filterBookings(bookings, 'upcoming', now)).toEqual([future, exact]);
});

test('past excludes the exact injected now boundary', () => {
  expect(filterBookings(bookings, 'past', now)).toEqual([past]);
});

test('All returns every booking', () => {
  expect(filterBookings(bookings, 'all', now)).toEqual(bookings);
});

test('sorts ascending without mutating its input', () => {
  expect(sortBookings(bookings, 'asc')).toEqual([past, exact, future]);
  expect(bookings).toEqual([future, past, exact]);
});

test('sorts descending', () => {
  expect(sortBookings(bookings, 'desc')).toEqual([future, exact, past]);
});

test('filters and sorts empty lists', () => {
  for (const filter of ['all', 'upcoming', 'past'] as const) {
    expect(filterBookings([], filter, now)).toEqual([]);
  }
  expect(sortBookings([], 'asc')).toEqual([]);
  expect(sortBookings([], 'desc')).toEqual([]);
});

test('compares instants with timezone offsets rather than date strings', () => {
  const offset = booking('offset', '2026-11-01T12:00:00+03:00');
  expect(filterBookings([offset], 'past', now)).toEqual([offset]);
  expect(sortBookings([exact, offset], 'asc')).toEqual([offset, exact]);
});
