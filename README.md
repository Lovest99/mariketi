# Mariketi

![Mariketi](public/mariketi-logo.png)

**A livestock marketplace frontend for Zimbabwe, designed around verification and the journey from discovery to handover.**

[Configured demo URL](https://mariketi.vercel.app) · [Source](https://github.com/Lovest99/mariketi)

> **Status: frontend prototype.** Listings, offers, notifications and zone updates use seeded data and in-memory services. Demo roles are selectable in the interface. This repository does not yet implement production authentication, payments, verification or persistent marketplace records. The demo URL is configured in repository metadata; availability is not guaranteed by this README.

## Product scope

The interface explores the workflow **discover → verify → offer → transact → handover**.

| Workspace | Interface scope |
| --- | --- |
| Public marketplace | Livestock browsing, listing details, collection centres and verification information |
| Buyer and seller | Saved items, offers, messages, selling and transaction views |
| Field agent | Verification assignments and field-work screens |
| Collection centre | Intake, animals and handover views |
| Transport | Assignment and route views |
| Administration | Listings, verification, zones, transactions, payments and analytics views |

These are interface areas, not claims that every workflow has a production backend. For example, the listing-card favourite action currently displays a toast rather than persisting a saved item.

## Engineering structure

| Path | Responsibility |
| --- | --- |
| `app/mariketi-app.tsx` | Main client application, navigation and page components |
| `app/mariketi-refinements.tsx` | Additional workspace and navigation components |
| `app/[...slug]/page.tsx` | Catch-all route entry |
| `domain/types.ts` | Typed marketplace entities and roles |
| `data/seed.ts` | Demonstration records |
| `services/mock.ts` | Asynchronous mock service boundary |
| `components/ui/` | Reusable interface primitives |
| `db/schema.ts` | Empty database schema placeholder |

**Stack:** TypeScript with strict checking, React, Next.js, Tailwind CSS, shadcn-related UI primitives, Motion and D3. Cloudflare/Vinext tooling is also retained from the original Sites setup.

The service boundary makes the intended backend integration points visible. Mock delays simulate asynchronous interactions; they do not represent network calls.

## Local setup

Prerequisites: Git, Node.js **22.13.0 or newer**, and the pnpm version declared in `package.json`.

```sh
git clone https://github.com/Lovest99/mariketi.git
cd mariketi
pnpm install --frozen-lockfile
```

For a consistent Next.js development/build/preview path:

```sh
pnpm exec next dev
pnpm run build
pnpm exec next start
```

Run the production preview only after a successful build. These commands are derived from the checked-in configuration; a clean-clone build was not executed as part of the documentation audit.

### Runtime distinction

- `pnpm run build` invokes **Next.js**.
- `pnpm run dev` uses the retained execution-profile wrapper and selects Vinext or Vite.
- `pnpm run start` expects a **Cloudflare Worker** artifact under `dist/server/`; it is not the preview command for the Next.js build.

Use one runtime consistently. [The retained Sites starter guide](docs/sites-starter-reference.md) documents the original Cloudflare workflow and requires adaptation to the current scripts.

## Validation

```sh
pnpm exec tsc --noEmit
pnpm run lint
pnpm run build
```

There is currently no checked-in automated test suite or GitHub Actions workflow. The commands above are validation entry points, not a claim of passing checks.

Useful manual scenarios include opening a listing directly by URL, using browser back/forward navigation, switching demo workspaces, publishing a mock listing, making an offer, and checking mobile navigation and keyboard access.

## Known limitations

- Mock records are held in module memory and reset when the application reloads.
- The mock auth service returns a fixed user; OTP validation only checks string length.
- The role switcher is for demonstration and provides no server-side authorization.
- Verification badges, tradeability and payment screens are demonstration data, not guarantees about animals or transactions.
- Durable offline synchronization, production payment handling and server-enforced permissions remain backend work.
- The main client application is large and should be separated into feature modules.
- No accessibility, performance or security certification is claimed.

## Next engineering milestones

1. Split marketplace, workspaces and shared navigation into focused modules.
2. Add tests for important user journeys and CI for type checking, lint and build.
3. Choose and document a single deployment runtime.
4. Implement persistent services, authenticated sessions and server-side role enforcement.
5. Integrate verification and transaction workflows against agreed backend contracts.

## Related repository

[mariketi-ui](https://github.com/Lovest99/mariketi-ui) contains an overlapping frontend implementation. Deployment ownership should be confirmed before consolidating or archiving either repository.

## Project permissions

No project license is currently included. Confirm the project owner's permission before redistributing code, branding or client material.
