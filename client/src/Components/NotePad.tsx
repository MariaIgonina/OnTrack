import { Applicant, Recruiter } from "../Interfaces"

interface trackParams {
  applicantId?: String | null,
  recruiterId?: String | null,
}

const NotePad = ({ }) => {
  return (
    <div id="NotePad-container">
      <h1>I am a NotePad</h1>
    </div>
  );
}

export default NotePad;