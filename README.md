# Fern & Field · member dashboard

Original demo, made-up data, not client work. AI-assisted implementation and tests.
Astro 5, React islands, TypeScript and Tailwind CSS. All application data lives in
`src/data/fixture.json`; the site makes no backend or external network requests.
No accounts, secrets, external fonts or real client assets are required.

## Run and verify

Use Node.js 22.12+ (verified with 24.19.0) and npm. Versions are pinned in
`package.json` and resolved in `package-lock.json`.

```sh
npm install
npm run dev
npm test
npm run typecheck
npm run build
```

Open the local URL printed by Astro. `/` lists members; each member links to
`/members/member-1/`, `/members/member-2/` or `/members/member-3/`.
The static production site is generated in `dist/`.
Set `ASTRO_TELEMETRY_DISABLED=1` to disable build-tool telemetry.

## Data boundary

`src/lib/data.ts` exports asynchronous `listMembers()`, `getMember(id)`,
`listBookings(memberId)` and `listVolunteerPoints(memberId)`. Results are typed
and cloned so consumers cannot mutate the fixture. Unknown members return null;
unknown booking/points queries return empty arrays. Replace this module to connect
a Supabase-style backend without changing the pages or components.
