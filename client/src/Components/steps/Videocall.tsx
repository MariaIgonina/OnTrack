import { ChangeEvent, useEffect, useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';

type Step = {
  type: string,
  id: number | string,
  title?: string,
  order?: number | string
  link?: string
}
type VideocallStepProps = {
  step: Step,
}

const Videocall = ({ step }: VideocallStepProps) => {
  const [link, setLink] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    console.log('stepId videocall =>', step)
    if (step.link) {
      setLink(step.link)
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    if (link.length) setEdit(false)
  }

  const editLink = async () => {
    console.log('save me in the DB when the time comes!', link)
    // SAVE TO THE DB
    setEdit(true)
  }

  // const redirectToLink = () => {
  //   window.location.href = link;
  // }

  return (
    <div className="text-black w-[250px] flex justify-between items-center">
      {edit && <button
        className="hover:text-yellow-100"
        onClick={() => setEdit(false)}> <EditIcon /></button>
       }
      {edit
        ? <a id='redirect-to-link' target="_blank" href={link.startsWith("http") ? link : `http://${link}`} rel="noopener noreferrer"
          className="text-sm hover:underline hover:text-yellow-100 hover:cursor-pointer">
          { link.slice(0, 25) } ...</a>
        :<input className={`rounded-xl text-sm py-1  px-3 w-[200px] ${edit && 'invisible'}`}
          id="videocall-link"
          placeholder="paste your link here"
          onChange={handleChange}
          value={link.length ? link : ''}
          onFocus={() => setEdit(false)}
        />
      }
      <button
        className={`text-yellow-100 ${!edit ? 'visible' : 'invisible'}`}
        onClick={editLink}>
        {!edit && <AddCircleIcon />}
      </button>
    </div>
  );
}

export default Videocall;