import fixture from '../data/fixture.json';

export interface Member {
  id: string;
  name: string;
  joined: string;
  plot: string;
}

export interface Booking {
  id: string;
  memberId: string;
  title: string;
  startsAt: string;
  plot: string;
}

export interface VolunteerPoints {
  memberId: string;
  activity: string;
  points: number;
}

export async function listMembers(): Promise<Member[]> {
  return structuredClone(fixture.members);
}

export async function getMember(id: string): Promise<Member | null> {
  return structuredClone(fixture.members.find(member => member.id === id) ?? null);
}

export async function listBookings(memberId: string): Promise<Booking[]> {
  return structuredClone(fixture.bookings.filter(booking => booking.memberId === memberId));
}

export async function listVolunteerPoints(memberId: string): Promise<VolunteerPoints[]> {
  return structuredClone(fixture.volunteerPoints.filter(entry => entry.memberId === memberId));
}
