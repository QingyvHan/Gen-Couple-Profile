import Generator from "@/components/generator/Generator";
import { LineText } from "@/components/LineText";

interface GeneratorSectionProps {
  locale: any;
  langName: string;
}

const GeneratorSection = ({ locale, langName }: GeneratorSectionProps) => {
  return (
    <section
      lang={langName}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-8 md:pt-12"
    >
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          {locale.title} <br className="hidden md:block" />
          <span className="text-blue-600 dark:text-blue-400">
             Generative AI
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-xl text-slate-600 dark:text-slate-400">
          {locale.description}
        </p>
      </div>

      <Generator locale={locale} />
    </section>
  );
};

export default GeneratorSection;
