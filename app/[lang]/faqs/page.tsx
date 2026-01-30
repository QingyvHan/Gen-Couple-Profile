import FAQ from "@/components/home/FAQ";
import { defaultLocale, getDictionary } from "@/lib/i18n";

export default async function FAQPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  return (
    <div className="pt-10">
      <FAQ id="FAQ" locale={dict.FAQ} langName={langName} />
    </div>
  );
}
