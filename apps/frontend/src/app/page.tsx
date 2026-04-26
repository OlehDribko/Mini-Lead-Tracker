import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center gap-6 px-4 py-10 text-center sm:px-6">
      <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
        Mini Lead Tracker
      </h1>
      <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
        Lightweight CRM test project with NestJS, Prisma, PostgreSQL, and Next.js.
      </p>
      <Link
        href="/leads"
        className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
      >
        Open leads
      </Link>
      <p className="text-xs text-slate-500">
        API documentation: http://localhost:3000/api/docs
      </p>
    </main>
  );
}
