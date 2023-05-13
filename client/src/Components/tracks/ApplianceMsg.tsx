import { useState } from "react";

const ApplianceMessage = () => {
  const [accept, setAccept] = useState<Boolean | null>(null)
  return (
    <div>
      <button onClick={() => setAccept(true)}
      >Accept</button>
      <button onClick={() => setAccept(true)}>Reject</button>
      <div id='displayMsg'>
      

      </div>
    </div>
  );
}

export default ApplianceMessage;