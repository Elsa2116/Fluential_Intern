"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "rating", label: "Highest rating" },
  { value: "price-low", label: "Price: low to high" },
  { value: "duration-low", label: "Duration: short to long" },
];

function truncate(text, limit) {
  if (text.length <= limit) {
    return text;
  }

  return `${text.slice(0, limit).trimEnd()}...`;
}

export default function CoursesPage() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await fetch("/api/courses", { cache: "no-store" });
        const payload = await response.json();

        if (!response.ok || !payload.success) {
          setCourses([]);
          return;
        }

        setCourses(payload.data);
      } catch {
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadCourses();
  }, []);

  const visibleCourses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = courses.filter((course) => {
      return (
        course.title.toLowerCase().includes(normalizedQuery) ||
        course.description.toLowerCase().includes(normalizedQuery) ||
        course.category.toLowerCase().includes(normalizedQuery)
      );
    });

    const sorted = [...filtered];

    if (sortBy === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sortBy === "price-low") sorted.sort((a, b) => a.price - b.price);
    if (sortBy === "duration-low")
      sorted.sort((a, b) => a.durationHours - b.durationHours);

    return sorted;
  }, [courses, query, sortBy]);

  return (
    <div className="space-y-7">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">
              Courses
            </p>
            <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl">
              Browse all available courses
            </h1>
            <p className="text-slate-600">
              Compare price, duration, rating, and enrollment counts. Open any
              card to view the full course detail page.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[420px] lg:grid-cols-[1fr_180px]">
            <label className="block">
              <span className="sr-only">Search courses</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, category, or keyword"
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-400 focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="sr-only">Sort courses</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-400 focus:bg-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {isLoading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-500 md:col-span-2 xl:col-span-3">
            Loading courses...
          </div>
        )}
        {visibleCourses.map((course) => (
          <Link
            key={course.slug}
            href={`/courses/${course.slug}`}
            className="group rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-teal-700">
                  {course.category}
                </p>
                <h2 className="mt-1 text-xl font-semibold text-slate-950">
                  {course.title}
                </h2>
              </div>
              <div className="rounded-full bg-teal-600 px-3 py-1 text-sm font-semibold text-white">
                ${course.price}
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              {truncate(course.description, 132)}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-600">
              <div className="rounded-2xl bg-slate-50 p-3">
                <span className="block text-slate-400">Duration</span>
                <span className="mt-1 block font-semibold text-slate-950">
                  {course.durationHours} hours
                </span>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <span className="block text-slate-400">Rating</span>
                <span className="mt-1 block font-semibold text-slate-950">
                  {course.rating.toFixed(1)}
                </span>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <span className="block text-slate-400">Enrollments</span>
                <span className="mt-1 block font-semibold text-slate-950">
                  {course.enrollments.toLocaleString()}
                </span>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <span className="block text-slate-400">Level</span>
                <span className="mt-1 block font-semibold text-slate-950">
                  {course.level}
                </span>
              </div>
            </div>

            <div className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-700 transition group-hover:bg-teal-600 group-hover:text-white">
              View details
            </div>
          </Link>
        ))}
        {!isLoading && visibleCourses.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-500 md:col-span-2 xl:col-span-3">
            No courses match your search.
          </div>
        )}
      </section>
    </div>
  );
}
