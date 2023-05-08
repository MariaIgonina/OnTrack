export interface Applicant {
  idDB?: number,
  idAuth?: string,
  email: string,
  picture: string,
  name: string,
  familyName: string,
  age: number,
  phone: string,
  location: string,
  inProgressApplications: Track [],
  coordinateX: string,
  coordinateY: string,
  readyToMove: boolean,
  workingHours: string,
  workingModal: string,
  socialMedia: string [],
  skillsProf: string [],
  stack: string [],
  compLanguages: string [],
  about: string,
  video: string,
  education: string [],
  experiences: [],
  languages: string [],
  hobbies: string [],
  salaryRange: number,
  desiredLocation: string,
  nonDesiredLocation: string,
  desiredWorkingModal: string,
}

export interface Recruiter {
  id: number,
  name: string,
  vacancies: Vacancy[],
  logo: string,
  founded: string,
  about: string,
  externalLinks: string[],
  headOffice: string,
  track: Track[]
}

export interface Vacancy {
  id: number,
  recruiter: Recruiter,
  recruiterId: number,
  about: string,
  title: string,
  jobTrack: Track[],
  workingHours: string,
  workingModal: string,
  skills: string[],
  stack: string[],
  requiredLanguages: string[],
  experience: number,
  location: string,
  salaryRange:number,
}

export interface Track {
  id: number,
  steps: Step[],
  recruiterID: number,
  applicantID: number,
  reject: boolean,
  notes?: string,
  vacancy: Vacancy,
  vacancyId: number,
  message: Message[],
  applicant?: Applicant,
  recruiter: Recruiter
}

export interface Step {
  id: number,
  title: string,
  actions: Action[],
  durationInMs: number,
  hidden: boolean,
  statusStep: boolean,
  questionaries: Questionary[],
  Track?: Track,
  trackId: number,
}

export interface Message {
  id: number,
  trackId: number,
  track: Track,
  text: string,
  date: Date,
  files: string[],
  stepId: number,
}
export interface Action {
  id: number,
  action: Step,
  stepId: number,
  name: string,
  scheduleDate: string,
}

export interface Questionary {
  id: number,
  questions: string[],
  answer: string[],
  date: Date,
  step?: Step,
  stepId?: number,
}

export interface Experience {
  id: number,
  jobTitle: string,
  company: string,
  startDate: Date,
  endDate: Date,
  description: string,
  applicant: Applicant,
  applicantId: number,
}

export interface Education {
  id: number,
  place: string,
  startDate: Date,
  endDate: Date,
  degree: string,
  speciality: string,
  Applicant?: Applicant,
  applicantIdDB?: number,
}
