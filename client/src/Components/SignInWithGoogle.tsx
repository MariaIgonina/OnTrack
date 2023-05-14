import { useState } from 'react';
import GoogleBtn from '../Components/GoogleBtn';

const signInWithGoogle = () => {
  const [isApplicant, setIsApplicant] = useState(false);
  const [isRecruiter, setisRecruiter] = useState(true);
  localStorage.setItem('currentUser', 'recruiter')

  const handleToggle = () => {
    setIsApplicant(!isApplicant);
    setisRecruiter(!isRecruiter);
  };

  return (
    <GoogleBtn />
  );
}

export default signInWithGoogle;