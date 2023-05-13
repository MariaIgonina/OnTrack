import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../store/store'
import { deleteTrack } from "../../store/trackSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type RegisterModalProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  trackId: number
};

const DeleteTrackModal = ({ isOpen, setOpen, trackId }: RegisterModalProps) => {
  const [message, setMessage] = useState('')
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser.currentUser)
  const navigate = useNavigate();

  const stopTracking = () => {
    try {
      // dispatch(deleteTrack(trackId)).unwrap()
      setMessage('This track has been erased. You\'re being redirected to your Dashboard')
      setTimeout(() => {
        setOpen(false);
        navigate('/dashboard/' + currentUser.id)
      }, 3000)
    } catch (error: any) {
      console.log('Error deleting track', error)
      setMessage('Error deleting track. Please try again later.')
      setOpen(false);
    }
  }

  const handleClose = () => {
    if (isOpen) {
      setOpen(false);
    }
  }

  return (
    <div
      className="justify-center
      items-center
      flex
      overflow-x-hidden
      overflow-y-auto
      fixed
      inset-0
      z-50
      outline-none
      focus:outline-none
      bg-neutral-800
      bg-opacity-70">
      <div className="
          relative
          lg:w-3/6
          my-6
          mx-auto
          md:min-w-[50%]
          lg:max-w-3xl
          lg:h-auto
        ">

        <div className="
            h-full
            lg:h-auto
            border-0
            rounded-lg
            shadow-lg
            relative
            flex
            flex-col
            w-full
            bg-stone-100
            outline-none
            focus:outline-none
            p-5
            ">
          <button
            onClick={handleClose}
            className="p-1 ml-auto border-0 text-green-black hover:opacity-50 transition self-end"
          >{message.length ? '' : 'X'}</button>
          {message.length
            ?
            <p className="text-center mb-5">{message}</p>
            :
            <div>
              <p className="text-center mb-5">Are you sure you want to stop tracking your progress for this vacancy?
                <br></br>
                This action cannot be undone.
              </p>

              <Button
                sx={{
                  backgroundColor: "#ff4d4d",
                  margin: "5px",
                  "&:hover": {
                    backgroundColor: "#ff0000"
                  }
                }}
                onClick={stopTracking}
                variant="contained"
                className="btn"
                type="submit"

              >DELETE TRACK PERMANENTLY</Button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default DeleteTrackModal;