import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../store/store'
import { updateTrack } from "../../store/trackSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVideocall } from "../../store/VideoCallSlice";
import moment from "moment";

type RegisterModalProps = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  trackId: number,
  setOffer: Function,
};

const OfferProposalModal = ({ isOpen, setOpen, trackId, setOffer }: RegisterModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.currentUser)

  const makeOffer = () => {
    setOffer(true);
    dispatch(createVideocall({
      "hidden": false,
      "order": 999,
      "title": "We want to make you an offer!",
      "trackId": trackId,
      "type": "OFFER",
      checked: false,
    }))
    setOpen(false);
    window.location.reload();
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
          >X</button>
          <div>
            <p className="text-center mb-5">Are you sure you want to make an offer to this applicant?
              <br></br>
            </p>

            <Button
              sx={{
                backgroundColor: "#568ea3",
                margin: "5px",
                "&:hover": {
                  backgroundColor: "#457282"
                }
              }}
              onClick={makeOffer}
              variant="contained"
              className="btn"
              type="submit"

            >MAKE AN OFFER!</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OfferProposalModal;