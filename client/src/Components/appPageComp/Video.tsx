import React from "react";
import YouTube from 'react-youtube';
import { Applicant } from "../../Interfaces";

const Video = ({applicant}:{applicant: Applicant}) => {

  const opts = {
    height: '150',
    width: '230',
    playerVars: {
      autoplay: 0,
    },
  };

  const videoId = '2YJTCcjwqLg&t=4s';

  return (

    <div className="flex-shrink-0 flex-grow flex-col flex r p-3  ml-2 mr-2">
      <h2
      className=" text-lg font-semibold leading-6 text-[#026767] text-base mb-2"
      >My best project</h2>
      <div className="shadow-md ">
        <YouTube videoId={videoId} opts={opts} 
          className="shadow-md"/>
      </div>
      {/* <YouTubePlayer /> */}
    
    </div>

  )
}

export default Video;
