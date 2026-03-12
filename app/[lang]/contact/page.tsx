import { notFound } from "next/navigation";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact-form/ContactForm";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const d = dict.contact;

  const infoItems = [
    { icon: MapPin, label: d.addressTitle, value: d.addressValue },
    {
      icon: Phone,
      label: d.phoneTitle,
      value: d.phoneValue,
      href: `tel:${d.phoneValue.replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: d.emailTitle,
      value: d.emailValue,
      href: `mailto:${d.emailValue}`,
    },
    { icon: Clock, label: d.hoursTitle, value: d.hoursValue },
  ];

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

      {/* Content */}
      <section className="py-14 bg-[#F5F6F8]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-5">
              {infoItems.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1E4FA3]/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#1E4FA3]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-[#1A1A1A] text-sm font-medium hover:text-[#1E4FA3] transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-[#1A1A1A] text-sm font-medium">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Map */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm h-64 border border-gray-100">
                <iframe
                  title="ANEC Uzbekistan office location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.808672007852!2d69.31812089582021!3d41.30468899641235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2bb480a54b6d83b3%3A0x5dffa54331724b7f!2sNational%20Association%20of%20Economic%20Cooperation%20of%20Uzbekistan!5e0!3m2!1sen!2s!4v1773310768349!5m2!1sen!2s"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-1">
                {d.formTitle}
              </h2>
              <p className="text-gray-500 text-sm mb-6">{d.formDesc}</p>
              <ContactForm dict={d} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
