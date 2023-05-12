import React from "react";
import YouTube from 'react-youtube';


const Video = ({applicant}) => {

  const opts = {
    height: '190',
    width: '340',
    playerVars: {
      autoplay: 0,
    },
  };

  const videoId = '2YJTCcjwqLg&t=4s';

  return (
    <>
    <div className="flex-shrink-0 flex-grow flex-col flex r p-3 m-4 mt-0 ">
      <h2
      className=" text-lg font-semibold leading-6 text-[#026767] sm:text-3xl mb-2"
      >Video presentation of my best project</h2>

      <YouTube videoId={videoId} opts={opts} 
      className="shadow-md"/>
      {/* <YouTubePlayer /> */}
    
    </div>
  </>
  )
}

export default Video;
