import React from "react";
import { deleteTrack } from "../store/trackSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Popup({ setOpenModal, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteTrack(id))
      .unwrap()
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error: Error) => {
        console.error("Error deleting vacancy:", error);
      });
  };

  return (
    <div>
      <div>
        <div className="text-center">
          <h1>Are You Sure You Want to Delete this track?</h1>
        </div>
        <div>
          <div className="justify-center flex flex-row space-x-2 my-4">
            <button
              className="w-auto bg-orange-100 hover:bg-orange-dark rounded-lg shadow-xl font-medium text-white px-2 py-2"
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button
              className="w-auto bg-orange-100 hover:bg-orange-dark rounded-lg shadow-xl font-medium text-white px-4 py-2"
              onClick={() => {
                console.log("delete clicked");
                handleDelete();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
