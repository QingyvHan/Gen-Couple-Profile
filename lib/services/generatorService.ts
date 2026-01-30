import { GenerationResponse, GenerationResult } from "@/types/generator";

const MOCK_DELAY = 2000;

export const generatorService = {
  /**
   * P0: Mock generation service
   * In Phase 2, this will call the Next.js API Route /api/generate
   */
  generate: async (prompt: string, imageBase64: string): Promise<GenerationResponse> => {
    console.log("Generating with prompt:", prompt);
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

    // Mock local storage limit check (Simplified for service layer)
    // Actual logic will be in the component hook, but we return mock remaining count
    const mockRemaining = 4;

    return {
      success: true,
      data: {
        images: [
          "/images/users/1.png", // Using existing placeholder images
          "/images/users/2.png",
        ],
        remainingQuota: mockRemaining,
      },
    };
  },

  /**
   * Helper to handle local storage limits
   */
  getLimit: (): { count: number; date: string } => {
    const defaultLimit = { count: 5, date: new Date().toLocaleDateString() };
    if (typeof window === "undefined") return defaultLimit;
    
    const stored = localStorage.getItem("gen_couple_limit");
    if (!stored) return defaultLimit;

    try {
      const parsed = JSON.parse(stored);
      const today = new Date().toLocaleDateString();
      if (parsed.date !== today) {
        return defaultLimit;
      }
      return parsed;
    } catch (e) {
      return defaultLimit;
    }
  },

  updateLimit: (count: number) => {
    if (typeof window === "undefined") return;
    const today = new Date().toLocaleDateString();
    localStorage.setItem("gen_couple_limit", JSON.stringify({ count, date: today }));
  }
};
