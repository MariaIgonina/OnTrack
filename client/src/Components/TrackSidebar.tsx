import NotePad from "./NotePad";
import Button from "@mui/material/Button";

type TrackSideBarProps = {
  trackId: number
}
const TrackSideBar = ({trackId}: TrackSideBarProps) => {

  return (<>
    {/* {dark: bg-gray-800 } */}
    <div className="relative px-3 py-4 overflow-y-hidden bg-gray-100 
      flex flex-col items-center shadow-md shadow-gray w-80 h-[90%]">

      <NotePad trackId={trackId} />

      <div className="absolute px-2" style={{ bottom: '25px' }}>
        <div className="bg-green-100 mb-5 rounded-lg">THIS IS THE CALENDAR</div>
        <Button
          sx={{ backgroundColor: "#FFB17A" }}
          variant="contained"
          className="btn"
          type="submit"
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