

import { initialApplicant } from "./applicantSlice";


const initialEducation = {
  id: 0,
  place: '',
  startDate: new Date(),
  endDate: new Date(),
  degree: '',
  speciality: '',
  applicant: initialApplicant,
  applicantIdDB: 0
}


export { initialEducation }