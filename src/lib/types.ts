export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface UserProfile {
  id: string; 
  fullName: string;
  headline: string;
  bio: string;
  profilePictureUrl?: string;
  email: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
}
