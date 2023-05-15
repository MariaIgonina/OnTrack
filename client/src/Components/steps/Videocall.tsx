import { ChangeEvent, useState } from "react";

const Videocall = () => {
  const [link, setLink] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  }

  return (
    <div className="text-black">
      <input className="rounded-xl text-sm py-1 px-3"
        id="videocall-link"
        placeholder="paste your link here"
        onChange={handleChange}
      />
    </div>
  );
}

export default Videocall;