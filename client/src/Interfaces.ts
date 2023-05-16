export interface Applicant {
  idDB?: number;
  idAuth?: string;
  email: string;
  picture: string;
  name?: string;
  familyName?: string;
  age?: Date | string;
  phone?: string;
  location?: string;
  track?: Track[];
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
  currentLocation?: string[];
}

export interface Track {
  id?: number
  recruiterID: number
  Recruiter?: Recruiter
  applicantID?: number
  Applicant?: Applicant
  reject?: boolean
  applicantNotes?: string
  recruiterNotes?: string
  vacancyId: number
  Vacancy?: Vacancy
  Questionaries?: Questionary[]
  Videocall?: []
  CodeSandbox?: []
  Message?: Message[]
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


export interface Videocall {
  id?: number,
  type?: string,
  date?: Date | string;
  order: number,
  link?: string,
  title: string,
  status?: boolean,
  hidden?: boolean,
  Track?: Track,
  trackId: number,
}

export interface Sandbox {
  id?: number
  type?: string
  date?: Date | string
  hidden?: boolean
  title: string
  data?: string
  Track?: Track
  trackId: number
  status?: boolean
}

export interface Questionary {
  id?: number
  type?: string
  questions?: string[]
  answer?: string[]
  date?: Date | string
  order: number
  status?: boolean
  title: string
  hidden?: boolean
  Track?: Track
  trackId: number
}

export interface Message {
  id?: number
  trackId: number
  // track: Track
  text: string
  date: Date | string
  files: string[]
  author: string
}