import React from "react";

interface Props {
  setOpenModal: (openModal:boolean) => void
  id: number
  handleDelete: ()=>void
}

function Popup({ setOpenModal, id, handleDelete }: Props) {
  return (
    <div>
      <div>
        <div className="text-center">
          <h1>Are You Sure You Want to Delete this?</h1>
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
                handleDelete(id);
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
