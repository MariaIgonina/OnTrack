import NotePad from "./NotePad";
import Button from "@mui/material/Button";


type TrackSideBarProps = {
  trackId: number,
  role: string,
  setDeleteModal: (value: boolean) => void
}
const TrackSideBar = ({ trackId, role, setDeleteModal}: TrackSideBarProps) => {
  const handleStopTrackingBtn = () => {
    setDeleteModal(true)
  }

  return (<>
    {/* {dark: bg-gray-800 } */}
    <div className="fixed px-3 py-4 overflow-y-hidden bg-gray-100 
      flex flex-col items-center shadow-md shadow-gray  max-w-[226px] h-[90%] hidden sm:flex md:flex lg:flex xl:flex ">

      <NotePad trackId={trackId} role={role} />

      <div className="absolute px-2" style={{ bottom: '25px' }}>
        <div className="bg-green-100 mb-5 rounded-lg">THIS IS THE CALENDAR</div>
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
        <Button
          sx={{ backgroundColor: "#568EA3" }}
          variant="contained"
          className="btn"
          style={{ marginTop: '5px' }}
          type="submit"
          disabled
        >
          Accept Offer
        </Button>
      </div>
    </div>
  </>
  )
}

export default TrackSideBar;