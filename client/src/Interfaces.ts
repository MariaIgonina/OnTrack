export interface Applicant {
  idDB?: number;
  idAuth?: string;
  email: string;
  picture: string;
  name?: string;
  familyName?: string;
  age?: string;
  phone?: string;
  location?: string;
  Track?: Track[];
  currentLocation?: string[];
  readyToMove?: boolean;
  workingHours?: string;
  workingModal?: string;
  socialMedia?: string[];
  skillsProf?: string[];
  stack?: string[];
  compLanguages?: string[];
  about?: string;
  video?: string;
  education?: Education[];
  experiences?: Experience[];
  languages?: string[];
  hobbies?: string[];
  salaryRange?: number;
  desiredLocation?: string[];
  nonDesiredLocation?: string[];
  desiredWorkingModal?: string;
}

export interface Recruiter {
  id?: number;
  email: string;
  picture: string;
  idAuth: string;
  recruiterName: string;
  name?: string;
  vacancies?: Vacancy[];
  logo?: string;
  founded?: string;
  about?: string;
  externalLinks?: string[];
  headOffice?: string;
  Track?: Track[];
}

export interface Vacancy {
  id?: number;
  recruiter?: Recruiter;
  recruiterId: number;
  about: string;
  title: string;
  jobTrack: Track[];
  workingHours?: string;
  workingModal?: string;
  skills: string[];
  stack: string[];
  requiredLanguages: string[];
  experience?: number;
  location: string;
  salaryRange?: number;
  data?: any;
}

export interface Track {
  id: number;
  steps: Step[];
  recruiterID: number;
  recruiter: Recruiter;
  applicantID: number;
  applicant?: Applicant;
  applicantNotes: string;
  recruiterNotes: string;
  vacancyId: number;
  vacancy: Vacancy;
  message: Message[];
}

export interface Step {
  id: number;
  title: string;
  type: string;
  about: string;
  durationInMs: number;
  scheduleDate: Date | string;
  order: number;
  hidden: boolean;
  active: boolean;
  questionarie: Questionary[];
  Track: Track;
  trackId: number;
}

export interface Message {
  id: number;
  trackId: number;
  track: Track;
  text: string;
  date: Date | string;
  files: string[];
}

export interface Questionary {
  id: number;
  questions: string[];
  answer: string[];
  date: Date | string;
  step?: Step;
  stepId?: number;
}

export interface Experience {
  id?: number;
  jobTitle: string;
  company: string;
  startDate: Date | string;
  endDate: Date | string;
  description?: string;
  applicantId?: number;
}

export interface Education {
  id?: number;
  place: string;
  startDate: Date | string;
  endDate: Date | string;
  degree: string;
  speciality: string;
  applicantIdDB?: number;
}

export interface ICloudImage {
  asset_id: string;
  secure_url: string;
}

export interface CurrentUserType {
  id: number;
  role: string;
}
