This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## What I did not have time to finish and how I would improve it

If I had more time, I would improve the project in the following areas:

- Strengthen backend validation: add server-side trimming, stricter DTO rules, better normalization for optional fields, and more detailed validation messages.
- Add authentication and personalization: implement JWT-based authentication, user accounts, protected routes, and user-specific leads.
- Add authorization: introduce basic ownership checks so users can access and manage only their own leads and comments.
- Improve frontend forms: add stronger client-side validation, better field-level errors, disabled submit states, and optimistic UI updates.
- Improve API consistency: introduce more structured response formats and reusable error response DTOs.
- Add automated tests: cover backend services/controllers, frontend components, and critical user flows.
- Add E2E testing: verify create/edit/delete lead flows, comments, filters, search, and pagination.
- Improve CRM features: add lead activity history, status change timeline, tags, priority, and better lead value analytics.
- Improve UX: add toast notifications, confirmation modals, better empty states, and responsive table/card switching.
- Improve production readiness: add logging, rate limiting, health checks, CI pipeline, and deployment configuration.
