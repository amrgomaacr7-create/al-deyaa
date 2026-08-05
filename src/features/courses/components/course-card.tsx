import Link from "next/link";

import { Stack } from "@/shared/ui";

type CourseCardProps = {
  course: {
    id: string;
    title: string;
    description: string;
    level: string;
    category: string;
  };
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-background p-24 transition-transform duration-fast hover:-translate-y-4">
      <Stack gap={16}>
        <div className="flex h-56 w-56 items-center justify-center rounded-medium bg-primary/10">
          <span className="text-2xl font-bold text-primary">
            ع
          </span>
        </div>

        <div>
          <p className="text-sm font-medium text-primary">
            {course.category}
          </p>

          <h2 className="mt-8 text-xl font-bold text-text">
            {course.title}
          </h2>

          <p className="mt-8 text-sm leading-7 text-text-soft">
            {course.description}
          </p>
        </div>

        <p className="text-sm font-medium text-text-soft">
          {course.level}
        </p>
      </Stack>

      <Link
        href={`/courses/${course.id}`}
        className="mt-24 inline-flex h-48 items-center justify-center rounded-medium bg-primary px-20 text-sm font-semibold text-primary-foreground transition-colors duration-fast hover:bg-primary-hover"
      >
        عرض الكورس
      </Link>
    </article>
  );
}