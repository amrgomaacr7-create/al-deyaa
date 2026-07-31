import { Container } from "@/shared/ui";

const statistics = [
  {
    value: "+10",
    label: "سنوات من الخبرة",
  },
  {
    value: "+1000",
    label: "طالب",
  },
  {
    value: "100%",
    label: "تركيز على اللغة العربية",
  },
  {
    value: "24/7",
    label: "وصول إلى المحتوى",
  },
];

export function StatisticsSection() {
  return (
    <section className="bg-background py-48">
      <Container size="desktop">
        <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
          {statistics.map((statistic) => (
            <div
              key={statistic.label}
              className="rounded-2xl border border-border bg-surface p-24 text-center"
            >
              <p className="text-3xl font-bold text-primary sm:text-4xl">
                {statistic.value}
              </p>

              <p className="mt-8 text-sm font-medium text-text-soft">
                {statistic.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}