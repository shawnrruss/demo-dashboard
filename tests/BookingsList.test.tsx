// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import BookingsList from '../src/components/BookingsList';
import fixture from '../src/data/fixture.json';

afterEach(cleanup);

test('renders the member bookings', () => {
  render(<BookingsList bookings={fixture.bookings.filter(booking => booking.memberId === 'member-1')} />);
  expect(screen.getByText('Autumn planting')).toBeTruthy();
  expect(screen.getByText('Compost morning')).toBeTruthy();
  expect(screen.queryByText('Seed swap')).toBeNull();
});

test('renders an empty state', () => {
  render(<BookingsList bookings={[]} />);
  expect(screen.getByText('No bookings to show.')).toBeTruthy();
});
