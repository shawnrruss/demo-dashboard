# Booking filters and date sorting: handover

## What changed

Members can switch between All, Upcoming and Past bookings and choose earliest
or latest date first. The default is All, earliest first; changing the filter
keeps the selected sort order. Upcoming includes bookings starting exactly now;
Past includes only bookings starting before now. Dates display in UTC.

Controls expose their pressed state and announce result changes, including an
empty result. Booking cards use one column below 640px and two columns above it.
The controls need JavaScript and work with the existing local fixture data.

## Why

Members can find their next booking or review past visits without scanning every
booking. Date ordering makes both near-term plans and recent activity easy to find.

## How tested

`npm test`: 20 tests pass across 4 files. `npm run typecheck`: 0 errors.
`npm run build`: the static production build completes.

`tests/bookings-feature.test.tsx` covers Upcoming, Past/All, default earliest-first
order, latest-first order retained while filtering, the mobile grid classes and
the filtered empty state. Five component tests fail without the feature:
Upcoming, Past/All, default ascending sort, descending sort with filtering and
filtered empty state. The mobile-class check already passed before the feature.

`tests/bookings.test.ts` has 7 pure-helper tests covering the exact current-time
boundary, All, ascending and descending order, input immutability, empty lists
and timezone offsets. The helpers use an explicit clock for deterministic tests;
the component uses the current clock when rendered or interacted with.

`tests/BookingsList.test.tsx` covers member bookings and the empty state;
`tests/data.test.ts` covers the existing fixture data boundary.
