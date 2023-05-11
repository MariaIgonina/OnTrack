import { useState } from 'react';
import GoogleBtn from '../Components/GoogleBtn';

const signInWithGoogle = () => {
  const [isApplicant, setIsApplicant] = useState(false);
  const [isRecruiter, setisRecruiter] = useState(true);

  const handleToggle = () => {
    setIsApplicant(!isApplicant);
    setisRecruiter(!isRecruiter);
  };

  return (
    <div style={{ width: "600px" }}>
      <GoogleBtn />
    </div>
  );
}

export default signInWithGoogle;