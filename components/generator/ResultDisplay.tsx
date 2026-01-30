import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultDisplayProps {
  images: string[];
  locale: any;
  loading: boolean;
}

export default function ResultDisplay({ images, locale, loading }: ResultDisplayProps) {
  const handleDownload = (url: string, index: number) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `avatar-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-500 dark:text-gray-400 animate-pulse">
          {locale.generating_btn}
        </p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-center p-6">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl">✨</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">
          {locale.placeholder_text}
        </h3>
        <p className="mt-2 text-sm text-gray-500 max-w-sm">
          {locale.description}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-in fade-in zoom-in duration-500">
      {images.map((img, idx) => (
        <div key={idx} className="group relative aspect-square bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
          <img
            src={img}
            alt={`Generated Avatar ${idx + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleDownload(img, idx)}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              {locale.download_btn}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
