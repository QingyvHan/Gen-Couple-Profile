export interface GenerationResult {
  images: string[];
  remainingQuota: number;
}

export interface GenerationResponse {
  success: boolean;
  data?: GenerationResult;
  error?: {
    code: string;
    message: string;
  };
}

export type GenerationStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';
