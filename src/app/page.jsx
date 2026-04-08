"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await fetch("/api/courses", { cache: "no-store" });
        const payload = await response.json();

        if (!response.ok || !payload.success) {
          return;
        }

        setFeatured(payload.data.slice(0, 3));
      } catch {
        setFeatured([]);
      }
    }

    loadCourses();
  }, []);

  return (
    <div id="top" className="space-y-8 sm:space-y-10">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.3fr_0.7fr] lg:p-10">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700 sm:text-sm">
              Fluent learning app
            </span>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Learn practical skills with a clean course experience.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Fluent helps learners browse strong courses, compare key details
                fast, and open complete detail pages before they decide.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/courses"
                className="rounded-full bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-500"
              >
                Browse Courses
              </Link>
              <a
                href="#join"
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
              >
                Sign Up
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-500 p-6 text-white sm:p-7">
            <p className="text-sm font-medium text-teal-50">
              What makes it better
            </p>
            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl bg-white/14 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-teal-50">
                  Simple browse
                </p>
                <p className="mt-2 text-base font-semibold">
                  Card details are clear and easy to scan.
                </p>
              </div>
              <div className="rounded-2xl bg-white/14 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-teal-50">
                  Practical detail
                </p>
                <p className="mt-2 text-base font-semibold">
                  Every course has a focused full detail view.
                </p>
              </div>
              <div className="rounded-2xl bg-white/14 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-teal-50">
                  Responsive UI
                </p>
                <p className="mt-2 text-base font-semibold">
                  Works smoothly on both phone and desktop.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="featured" className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">
              Featured courses
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">
              A few strong starting points
            </h2>
          </div>
          <Link
            href="/courses"
            className="text-sm font-semibold text-slate-700 hover:text-slate-950"
          >
            View all courses
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-teal-700">
                {course.category}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-950">
                {course.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {course.description.slice(0, 110)}...
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  ${course.price}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  {course.durationHours} hours
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  {course.rating.toFixed(1)} rating
                </span>
              </div>
            </Link>
          ))}
          {featured.length === 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-500 md:col-span-3">
              Featured courses are loading. If this persists, please refresh.
            </div>
          )}
        </div>
      </section>

      <section
        id="join"
        className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">
              Join Fluent
            </p>
            <h2 className="text-2xl font-semibold text-slate-950 sm:text-3xl">
              Start browsing the courses that fit your pace.
            </h2>
            <p className="max-w-2xl text-slate-600">
              The interface is built to feel clean and human: direct navigation,
              readable cards, and course details that are easy to scan on both
              mobile and desktop.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center rounded-full bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-500"
            >
              Browse Courses
            </Link>
            <a
              href="#top"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
            >
              Back to top
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
