import { ChangeEvent, useEffect, useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from "react-redux";
import { updateVideocall } from "../../store/VideoCallSlice";
import { AppDispatch } from "../../store/store";

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
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    console.log('stepId videocall =>', step)
    if (step.link) {
      setLink(step.link);
      setEdit(true)
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
    if (link.length) setEdit(false)
  }

  const editLink = async () => {
    console.log('save me in the DB when the time comes!', link)
    dispatch(updateVideocall({ videocallId: +step.id, videocall: { link: link } }))
    setEdit(true)
  }

  return (
    <div className="text-black w-[250px] flex justify-between items-center">
      {edit && <button
        className="hover:text-yellow-200 hover:-translate-y-1 text-yellow-100 text-xs"
        onClick={() => setEdit(false)}> <EditIcon /></button>
      }
      {edit
        ? <a id='redirect-to-link' target="_blank" href={link.startsWith("http") ? link : `http://${link}`} rel="noopener noreferrer"
          className="text-sm hover:underline hover:text-yellow-200 hover:cursor-pointer text-white">
          {link.slice(0, 25)} ...</a>
        
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