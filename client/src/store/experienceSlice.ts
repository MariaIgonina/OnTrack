
import { initialApplicant } from "./applicantSlice";


const initialExperience = {
  id: 0,
  jobTitle: '',
  company: '',
  startDate: new Date(),
  endDate: new Date(),
  description: '',
  applicant: initialApplicant,
  applicantId: 0,
}



export { initialExperience }
