import { NextResponse } from "next/server";
import { getCourse } from "@/data/courses";

export async function GET(_, { params }) {
  const course = getCourse(params.slug);

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
