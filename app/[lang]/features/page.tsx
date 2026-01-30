import Feature from "@/components/home/Feature";
import { defaultLocale, getDictionary } from "@/lib/i18n";

export default async function FeaturePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const langName = lang || defaultLocale;
  const dict = await getDictionary(langName);

  return (
    <div className="pt-10">
      <Feature id="Features" locale={dict.Feature} langName={langName} />
    </div>
  );
}
