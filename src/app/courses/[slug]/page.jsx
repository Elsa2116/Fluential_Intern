"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CourseDetailPage() {
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function loadCourse() {
      try {
        const response = await fetch(`/api/courses/${params.slug}`, {
          cache: "no-store",
        });
        const payload = await response.json();

        if (!response.ok || !payload.success) {
          setStatus("not-found");
          return;
        }

        setCourse(payload.data);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }

    if (params?.slug) {
      loadCourse();
    }
  }, [params?.slug]);

  if (status === "loading") {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Loading course details...
      </div>
    );
  }

  if (status === "not-found") {
    return (
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6">
        <p className="text-lg font-semibold text-slate-950">Course not found</p>
        <p className="text-sm text-slate-600">
          The selected course does not exist or is no longer available.
        </p>
        <Link
          href="/courses"
          className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
        >
          Back to courses
        </Link>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6">
        <p className="text-lg font-semibold text-slate-950">
          Could not load course details
        </p>
        <p className="text-sm text-slate-600">Please refresh and try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link
        href="/courses"
        className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
      >
        Back to courses
      </Link>

      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6 p-6 sm:p-8 lg:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">
                {course.category}
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
                {course.title}
              </h1>
            </div>
            <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              {course.description}
            </p>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <span className="block text-sm text-slate-500">Price</span>
                <span className="mt-2 block text-lg font-semibold text-slate-950">
                  ${course.price}
                </span>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <span className="block text-sm text-slate-500">Duration</span>
                <span className="mt-2 block text-lg font-semibold text-slate-950">
                  {course.durationHours} hours
                </span>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <span className="block text-sm text-slate-500">Rating</span>
                <span className="mt-2 block text-lg font-semibold text-slate-950">
                  {course.rating.toFixed(1)}
                </span>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <span className="block text-sm text-slate-500">
                  Enrollments
                </span>
                <span className="mt-2 block text-lg font-semibold text-slate-950">
                  {course.enrollments.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <aside className="border-t border-slate-200 bg-gradient-to-br from-teal-500 to-emerald-500 p-6 text-white lg:border-l lg:border-t-0 lg:p-10">
            <div className="rounded-[1.5rem] border border-white/15 bg-white/14 p-6">
              <p className="text-sm uppercase tracking-[0.25em] text-teal-50">
                Course summary
              </p>
              <dl className="mt-6 space-y-4 text-sm text-slate-200">
                <Row label="Instructor" value={course.instructor} />
                <Row label="Level" value={course.level} />
                <Row label="Lessons" value={`${course.lessons}`} />
                <Row
                  label="Audience"
                  value="Learners building practical skills"
                />
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function DetailStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <span className="block text-sm text-slate-500">{label}</span>
      <span className="mt-2 block text-lg font-semibold text-slate-950">
        {value}
      </span>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
      <dt className="text-slate-400">{label}</dt>
      <dd className="text-right font-medium text-white">{value}</dd>
    </div>
  );
}
