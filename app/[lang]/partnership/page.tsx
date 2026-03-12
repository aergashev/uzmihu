import { notFound } from "next/navigation";
import { PartnerCard } from "@/components/partner-card/PartnerCard";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getPartners } from "@/lib/content";

export default async function PartnershipPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [dict, partners] = await Promise.all([
    getDictionary(lang),
    getPartners(lang),
  ]);

  const d = dict.partnership;
  const strategic = partners.filter((p) => p.category === "strategic");
  const members = partners.filter((p) => p.category === "member");

  return (
    <>
      {/* Header */}
      <div className="bg-[#1E4FA3] text-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <p className="text-blue-200 text-sm uppercase tracking-widest font-medium mb-2">
            ANEC
          </p>
          <h1 className="text-4xl font-bold">{d.title}</h1>
          <p className="text-blue-100 mt-3">{d.subtitle}</p>
        </div>
      </div>

      {/* Strategic Partners */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1A1A1A]">
              {d.strategicTitle}
            </h2>
            <p className="text-gray-500 mt-1 text-sm">{d.strategicDesc}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {strategic.map((partner) => (
              <PartnerCard
                key={partner.id}
                name={partner.name}
                description={partner.description}
                website={partner.website}
                visitLabel={d.visitWebsite}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="py-14 bg-[#F5F6F8]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1A1A1A]">
              {d.membersTitle}
            </h2>
            <p className="text-gray-500 mt-1 text-sm">{d.membersDesc}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {members.map((member) => (
              <PartnerCard
                key={member.id}
                name={member.name}
                description={member.description}
                website={member.website}
                visitLabel={d.visitWebsite}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
