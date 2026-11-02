// @vitest-environment jsdom
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import BookingsList from '../src/components/BookingsList';
import fixture from '../src/data/fixture.json';

beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(new Date('2026-11-01T00:00:00Z'));
});
afterEach(() => { cleanup(); vi.useRealTimers(); });

function setup() {
  render(<BookingsList bookings={fixture.bookings.filter(booking => booking.memberId === 'member-1')} />);
  return userEvent.setup();
}

test('Upcoming shows future bookings and hides past rows', async () => {
  const user = setup();
  await user.click(screen.getByRole('button', { name: 'Upcoming' }));
  expect(screen.getByText('Autumn planting')).toBeTruthy();
  expect(screen.getByText('Winter greens')).toBeTruthy();
  expect(screen.queryByText('Compost morning')).toBeNull();
  expect(screen.getByRole('button', { name: 'Upcoming' }).getAttribute('aria-pressed')).toBe('true');
});

test('Past shows past bookings; All restores every row', async () => {
  const user = setup();
  await user.click(screen.getByRole('button', { name: 'Past' }));
  expect(screen.getByText('Compost morning')).toBeTruthy();
  expect(screen.queryByText('Autumn planting')).toBeNull();
  await user.click(screen.getByRole('button', { name: 'All' }));
  expect(within(screen.getByRole('list', { name: 'Bookings' })).getAllByRole('listitem')).toHaveLength(3);
});

test('date sort defaults to earliest first', () => {
  setup();
  const rows = within(screen.getByRole('list', { name: 'Bookings' })).getAllByRole('listitem');
  expect(rows.map(row => row.querySelector('h3')?.textContent)).toEqual(['Compost morning', 'Autumn planting', 'Winter greens']);
});

test('date sort switches to latest first and persists when filtering', async () => {
  const user = setup();
  await user.selectOptions(screen.getByLabelText('Sort by date'), 'desc');
  const titles = () => within(screen.getByRole('list', { name: 'Bookings' })).getAllByRole('listitem').map(row => row.querySelector('h3')?.textContent);
  expect(titles()).toEqual(['Winter greens', 'Autumn planting', 'Compost morning']);
  await user.click(screen.getByRole('button', { name: 'Upcoming' }));
  expect(titles()).toEqual(['Winter greens', 'Autumn planting']);
});

test('bookings container is a single column below 640px', () => {
  setup();
  const classes = screen.getByRole('list', { name: 'Bookings' }).classList;
  expect(classes.contains('grid-cols-1')).toBe(true);
  expect(classes.contains('sm:grid-cols-2')).toBe(true);
});

test('an empty filtered result announces its empty state', async () => {
  render(<BookingsList bookings={[fixture.bookings[0]!]} />);
  await userEvent.setup().click(screen.getByRole('button', { name: 'Past' }));
  expect(screen.getByText('No bookings to show.')).toBeTruthy();
});
