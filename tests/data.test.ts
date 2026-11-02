import { expect, test } from 'vitest';
import { getMember, listBookings, listMembers, listVolunteerPoints } from '../src/lib/data';

test('lists the made-up garden club members from the local fixture', async () => {
  expect((await listMembers()).map(member => member.name)).toEqual(['Mira Fern', 'Rowan Vale', 'Cleo Moss']);
});

test('gets one member or null for an unknown id', async () => {
  expect(await getMember('member-1')).toMatchObject({ name: 'Mira Fern' });
  expect(await getMember('unknown')).toBeNull();
});

test('lists bookings only for the requested member', async () => {
  const bookings = await listBookings('member-1');
  expect(bookings).toHaveLength(3);
  expect(bookings.every(booking => booking.memberId === 'member-1')).toBe(true);
  expect(await listBookings('unknown')).toEqual([]);
});

test('lists volunteer points and supports members without points', async () => {
  expect((await listVolunteerPoints('member-1')).reduce((sum, entry) => sum + entry.points, 0)).toBe(35);
  expect(await listVolunteerPoints('member-3')).toEqual([]);
});

test('returned data cannot mutate the fixture', async () => {
  const members = await listMembers();
  members[0]!.name = 'Changed';
  expect((await getMember('member-1'))?.name).toBe('Mira Fern');
  const bookings = await listBookings('member-1');
  bookings[0]!.title = 'Changed';
  expect((await listBookings('member-1'))[0]?.title).toBe('Autumn planting');
});
