/** Local fixture access. Every reader clones its result so callers cannot mutate the fixture. */
import fixture from '../data/fixture.json';

export type Member = (typeof fixture.members)[number];
export type Booking = (typeof fixture.bookings)[number];
export type VolunteerPoints = (typeof fixture.volunteerPoints)[number];

const forMember = <T extends { memberId: string }>(rows: T[], memberId: string): T[] =>
  structuredClone(rows.filter(row => row.memberId === memberId));

export async function listMembers(): Promise<Member[]> {
  return structuredClone(fixture.members);
}

export async function getMember(id: string): Promise<Member | null> {
  return structuredClone(fixture.members.find(member => member.id === id) ?? null);
}

export async function listBookings(memberId: string): Promise<Booking[]> {
  return forMember(fixture.bookings, memberId);
}

export async function listVolunteerPoints(memberId: string): Promise<VolunteerPoints[]> {
  return forMember(fixture.volunteerPoints, memberId);
}
