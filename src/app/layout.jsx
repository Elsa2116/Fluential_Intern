import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Fluent",
  description:
    "Browse and explore curated courses with a clean learning experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen w-full flex-col">
          <header className="sticky top-0 z-30 w-full border-b border-amber-100 bg-white/90 backdrop-blur-md">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-between gap-3 py-4">
                <Link href="/" className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-base font-semibold text-white shadow-sm">
                    F
                  </span>
                  <span>
                    <span className="block text-base font-semibold tracking-wide text-slate-900 sm:text-lg">
                      Fluent
                    </span>
                    <span className="block text-xs text-slate-500 sm:text-sm">
                      Learning marketplace
                    </span>
                  </span>
                </Link>
                <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-600 sm:text-sm">
                  <Link
                    href="/"
                    className="rounded-full px-3 py-2 transition hover:bg-teal-50 hover:text-teal-700 sm:px-4"
                  >
                    Home
                  </Link>
                  <Link
                    href="/#featured"
                    className="rounded-full px-3 py-2 transition hover:bg-teal-50 hover:text-teal-700 sm:px-4"
                  >
                    Featured
                  </Link>
                  <Link
                    href="/#join"
                    className="rounded-full px-3 py-2 transition hover:bg-teal-50 hover:text-teal-700 sm:px-4"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/courses"
                    className="rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 px-3 py-2 text-white shadow-sm transition hover:opacity-90 sm:px-4"
                  >
                    Browse Courses
                  </Link>
                </nav>
              </div>
            </div>
          </header>

          <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <main className="py-7 sm:py-8">{children}</main>
          </div>

          <footer className="mt-auto w-full border-t border-amber-100 bg-white px-4 py-6 text-sm sm:px-6">
            <div className="mx-auto grid w-full max-w-7xl gap-6 md:grid-cols-3">
              <div className="space-y-2 md:col-span-1">
                <p className="text-base font-semibold text-slate-900">Fluent</p>
                <p className="leading-6 text-slate-500">
                  Practical course browsing with a clear and modern learning
                  interface.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-slate-900">Navigation</p>
                <div className="flex flex-col gap-1.5 text-slate-500">
                  <Link href="/" className="hover:text-slate-900">
                    Home
                  </Link>
                  <Link href="/#featured" className="hover:text-slate-900">
                    Featured Courses
                  </Link>
                  <Link href="/courses" className="hover:text-slate-900">
                    Browse Courses
                  </Link>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold text-slate-900">Get Started</p>
                <p className="text-slate-500">
                  Explore the catalog and open any course to view full details.
                </p>
                <Link
                  href="/courses"
                  className="inline-flex rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                >
                  Start Browsing
                </Link>
              </div>
            </div>
            <div className="mx-auto mt-6 w-full max-w-7xl border-t border-slate-200 pt-4 text-xs text-slate-400">
              <p>Fluent by Fluential Internship Programme · Round 1</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
