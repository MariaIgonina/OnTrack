import NotePad from "./NotePad";
import Button from "@mui/material/Button";

type TrackSideBarProps = {
  trackId: number,
  role: string,
  setStopTrackingModal: (value: boolean) => void,
  setProposalModal: Function,
  offerDone: boolean
}
const TrackSideBar = ({ trackId, role, setStopTrackingModal, setProposalModal, offerDone}: TrackSideBarProps) => {
  const handleStopTrackingBtn = () => {
    setStopTrackingModal(true)
  }

  const handleProposalModal = () => {
    setProposalModal(true)
  }

  return (<>
    <div className="fixed px-3 py-4 overflow-y-hidden bg-[#345562]
      flex flex-col items-center shadow-md shadow-gray  max-w-[226px] h-[90%] hidden sm:flex md:flex lg:flex xl:flex ">

      <NotePad trackId={trackId} role={role} />
      <div className="absolute px-2" style={{ bottom: '25px' }}>
        <div className="bg-green-100 mb-5 rounded-lg"></div>
        <Button
          sx={{
            backgroundColor: "#ff6666",
            "&:hover": {
              backgroundColor: "#ff0000"
            }
          }}
          variant="contained"
          className="btn"
          type="submit"
          onClick={handleStopTrackingBtn}
        >
          Stop Tracking
        </Button>
        {role === 'applicant'
          ?
          <Button
            sx={{ backgroundColor: "#568EA3" }}
            variant="contained"
            className="btn"
            style={{ marginTop: '5px' }}
            type="submit"
            disabled={offerDone}
          >
            Accept Offer
          </Button>
          : 
          <Button
            sx={{
              backgroundColor: "#568ea3",
              "&:hover": {
                backgroundColor: "#457282"
              }
            }}
            variant="contained"
            className="btn"
            style={{ marginTop: '5px' }}
            type="submit"
            onClick={handleProposalModal}
            disabled={offerDone}
          >
            Make an Offer
          </Button>
        }
      </div>
    </div>
  </>
  )
}

export default TrackSideBar;