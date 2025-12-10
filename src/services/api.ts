// API Service for EduLink Backend Integration
import config from "@/config";

const API_URL = config.API_BASE_URL;

interface ProjectSubmissionRequest {
  project_name: string;
  project_topics: string[];
  short_description: string;
  created_by: string;
}

interface Professor {
  professor_name: string;
  author_id: string;
  topics_set: string;
  score: number;
}

interface MatchingResponse {
  success: boolean;
  data: {
    student_id: string;
    method: string;
    total_matches: number;
    matches: Professor[];
  };
}

interface ProjectSubmissionResponse {
  status: string;
  message: string;
  data: any[];
  matches: Professor[];
}

interface PDFExtractionResponse {
  success: boolean;
  data: {
    title: string;
    name: string;
    abstract: string;
    keywords: string[];
  };
}

class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: any
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.detail || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${method} ${endpoint}]:`, error);
      throw error;
    }
  }

  /**
   * Submit a project and get AI-matched professors
   */
  async submitProject(
    projectData: ProjectSubmissionRequest
  ): Promise<ProjectSubmissionResponse> {
    return this.request<ProjectSubmissionResponse>(
      "POST",
      "/student/submit",
      projectData
    );
  }

  /**
   * Get professor matches for a student
   */
  async matchProfessors(
    studentId: string,
    method: string = "tfidf",
    topk: number = 5
  ): Promise<MatchingResponse> {
    return this.request<MatchingResponse>(
      "GET",
      `/ai/match/${studentId}?method=${method}&topk=${topk}`
    );
  }

  /**
   * Extract sections from a PDF file
   */
  async extractPDF(file: File): Promise<PDFExtractionResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const url = `${this.baseURL}/pdf/extract`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("PDF Extract Error:", error);
      throw error;
    }
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const apiClient = new APIClient(API_URL);

// Export types
export type {
  ProjectSubmissionRequest,
  Professor,
  MatchingResponse,
  ProjectSubmissionResponse,
  PDFExtractionResponse,
};
