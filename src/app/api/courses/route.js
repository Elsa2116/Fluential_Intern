import { NextResponse } from "next/server";
import { courses } from "@/data/courses";

export async function GET() {
  return NextResponse.json({
    success: true,
    count: courses.length,
    data: courses,
  });
}
