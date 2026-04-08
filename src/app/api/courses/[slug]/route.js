import { NextResponse } from "next/server";
import { getCourse } from "@/data/courses";

export async function GET(_request, { params }) {
  const resolvedParams = await params;
  const slug = Array.isArray(resolvedParams.slug)
    ? resolvedParams.slug[0]
    : resolvedParams.slug;
  const course = getCourse(slug);

  if (!course) {
    return NextResponse.json(
      { success: false, message: "Course not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    data: course,
  });
}
