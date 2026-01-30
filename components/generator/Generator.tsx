"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@nextui-org/react"; // Using NextUI Textarea if available, or fallback to standard
import UploadZone from "./UploadZone";
import ResultDisplay from "./ResultDisplay";
import { generatorService } from "@/lib/services/generatorService";
import { toast } from "react-hot-toast";
import { Sparkles } from "lucide-react";

interface GeneratorProps {
  locale: any;
}

export default function Generator({ locale }: GeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resultImages, setResultImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(5);

  // Initialize limits
  useEffect(() => {
    const limit = generatorService.getLimit();
    setRemaining(limit.count);
  }, []);

  const handleGenerate = async () => {
    // 1. Validation
    if (!selectedImage) {
      toast.error(locale.upload_title); // Using locale as error message for simplicity or add specific error key
      return;
    }
    if (!prompt.trim()) {
      toast.error(locale.prompt_label);
      return;
    }
    if (remaining <= 0) {
      toast.error(locale.limit_reached);
      return;
    }

    // 2. Execution
    setLoading(true);
    setResultImages([]); // Clear previous results

    try {
      const response = await generatorService.generate(prompt, selectedImage);
      
      if (response.success && response.data) {
        setResultImages(response.data.images);
        
        // Update local quota
        const newCount = response.data.remainingQuota;
        setRemaining(newCount);
        generatorService.updateLimit(newCount);
        
        toast.success(locale.placeholder_text.replace("...", "!")); // Simple success message
      } else {
        toast.error(response.error?.message || "Error");
      }
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
      {/* Left Panel: Inputs */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className="bg-white dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
          
          {/* Upload */}
          <UploadZone 
            onFileSelect={setSelectedImage} 
            locale={locale} 
          />

          {/* Prompt */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {locale.prompt_label}
            </label>
            <textarea
              className="w-full min-h-[100px] p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder={locale.prompt_placeholder}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Action */}
          <div className="mt-6">
            <Button
              className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20 transition-all"
              onClick={handleGenerate}
              disabled={loading || !selectedImage || !prompt.trim()}
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span> {locale.generating_btn}
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 w-5 h-5" /> {locale.generate_btn}
                </>
              )}
            </Button>
            
            <p className="text-center text-xs text-gray-400 mt-3">
              {locale.remaining_text.replace("{count}", remaining.toString())}
            </p>
          </div>

        </div>
      </div>

      {/* Right Panel: Results */}
      <div className="lg:col-span-7">
        <ResultDisplay 
          images={resultImages} 
          locale={locale} 
          loading={loading} 
        />
      </div>
    </div>
  );
}
