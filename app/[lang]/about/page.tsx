import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { LeadershipCard } from "@/components/leadership-card/LeadershipCard";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getLeadership } from "@/lib/content";
export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [dict, leaders] = await Promise.all([
    getDictionary(lang),
    getLeadership(lang),
  ]);

  // Load about content dynamically
  let about: { mission: string; goals: string[]; activities: string[] };
  if (lang === "ru") {
    about = (await import("@/content/ru/about.json")).default;
  } else if (lang === "en") {
    about = (await import("@/content/en/about.json")).default;
  } else {
    about = (await import("@/content/uz/about.json")).default;
  }

  const d = dict.about;

  return (
    <>
      {/* Page Header */}
      <div className="bg-[#1E4FA3] text-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <p className="text-blue-200 text-sm uppercase tracking-widest font-medium mb-2">
            ANEC
          </p>
          <h1 className="text-4xl font-bold">{d.title}</h1>
          <p className="text-blue-100 mt-3 max-w-2xl">{d.subtitle}</p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            {d.missionTitle}
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl text-base">
            {about.mission}
          </p>
        </div>
      </section>

      {/* Goals & Activities */}
      <section className="py-16 bg-[#F5F6F8]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Goals */}
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
                {d.goalsTitle}
              </h2>
              <ul className="space-y-3">
                {about.goals.map((goal, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-[#1E4FA3] mt-0.5 shrink-0"
                    />
                    <span className="text-gray-700 text-sm leading-relaxed">
                      {goal}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Activities */}
            <div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
                {d.activitiesTitle}
              </h2>
              <ul className="space-y-3">
                {about.activities.map((activity, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded bg-[#1E4FA3] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">
                        {i + 1}
                      </span>
                    </div>
                    <span className="text-gray-700 text-sm leading-relaxed">
                      {activity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-10">
            {d.leadershipTitle}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-5">
            {leaders.map((leader) => (
              <LeadershipCard
                key={leader.id}
                name={leader.name}
                position={leader.position}
                bio={leader.bio}
                image={leader.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-[#1E4FA3]">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-center text-white text-2xl font-bold mb-10">
            {d.statsTitle}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              {
                value: dict.stats.investments,
                label: dict.stats.investmentsLabel,
              },
              { value: dict.stats.projects, label: dict.stats.projectsLabel },
              { value: dict.stats.meetings, label: dict.stats.meetingsLabel },
              {
                value: dict.stats.agreements,
                label: dict.stats.agreementsLabel,
              },
              { value: dict.stats.members, label: dict.stats.membersLabel },
              {
                value: dict.stats.volunteers,
                label: dict.stats.volunteersLabel,
              },
              { value: dict.stats.seminars, label: dict.stats.seminarsLabel },
              { value: dict.stats.countries, label: dict.stats.countriesLabel },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-blue-200 text-xs sm:text-sm leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
