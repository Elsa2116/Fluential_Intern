import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse } from "@/data/courses";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function CourseDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = Array.isArray(resolvedParams.slug)
    ? resolvedParams.slug[0]
    : resolvedParams.slug;
  const course = getCourse(slug);

  if (!course) {
    notFound();
  }

  const stats = [
    { label: "Price", value: `$${course.price}` },
    { label: "Duration", value: `${course.durationHours} hours` },
    { label: "Rating", value: course.rating.toFixed(1) },
    { label: "Enrollments", value: course.enrollments.toLocaleString() },
  ];

  const highlights = [
    "Clear, easy-to-scan course information",
    "Practical learning goals that feel realistic",
    "A neat structure for mobile and desktop viewing",
    "Designed to feel more like a real course product page",
  ];

  return (
    <div className="space-y-8">
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:text-teal-700"
      >
        <span aria-hidden="true">←</span>
        Back to courses
      </Link>

      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-8 p-6 sm:p-8 lg:p-10">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
                  {course.category}
                </span>
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  {course.level}
                </span>
              </div>

              <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                {course.title}
              </h1>

              <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                {course.description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <span className="block text-sm text-slate-500">
                    {stat.label}
                  </span>
                  <span className="mt-2 block text-lg font-semibold text-slate-950">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                  What you will learn
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  {highlights.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-teal-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                  Course details
                </p>
                <dl className="mt-4 space-y-4 text-sm">
                  <DetailRow label="Instructor" value={course.instructor} />
                  <DetailRow label="Lessons" value={`${course.lessons}`} />
                  <DetailRow label="Rating" value={course.rating.toFixed(1)} />
                  <DetailRow
                    label="Enrollments"
                    value={course.enrollments.toLocaleString()}
                  />
                </dl>
              </div>
            </div>
          </div>

          <aside className="border-t border-slate-200 bg-gradient-to-br from-teal-500 to-emerald-500 p-6 text-white lg:border-l lg:border-t-0 lg:p-10">
            <div className="space-y-6 rounded-[1.75rem] border border-white/15 bg-white/10 p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-50">
                  Course preview
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Built to feel like a real learning product.
                </h2>
              </div>

              <div className="grid gap-3">
                <div className="rounded-2xl bg-white/15 p-4">
                  <p className="text-sm text-teal-50">Duration</p>
                  <p className="mt-1 text-xl font-semibold">
                    {course.durationHours} hours
                  </p>
                </div>
                <div className="rounded-2xl bg-white/15 p-4">
                  <p className="text-sm text-teal-50">Price</p>
                  <p className="mt-1 text-xl font-semibold">${course.price}</p>
                </div>
                <div className="rounded-2xl bg-white/15 p-4">
                  <p className="text-sm text-teal-50">Enrollment count</p>
                  <p className="mt-1 text-xl font-semibold">
                    {course.enrollments.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5 text-slate-700">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">
                  Why this course stands out
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  The page presents the course clearly, with enough detail to
                  feel useful and enough visual structure to feel polished.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-right font-medium text-slate-900">{value}</dd>
    </div>
  );
}
