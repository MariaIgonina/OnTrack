import React from "react";
import YouTube from 'react-youtube';
import { Applicant } from "../../Interfaces";
import { useState } from "react";

const Video = ({applicant}:{applicant: Applicant}) => {

  const opts = {
    height: '150',
    width: '230',
    playerVars: {
      autoplay: 0,
    },
  };

  const link: any = applicant.video;

  let videoId: string = '';
  if (link !== null) {
    const eqIndex = link.indexOf('=');
    videoId = link.slice(eqIndex + 1);
  }

  return (

    <div className="flex-shrink-0 flex-grow flex-col flex r p-3  ml-2 mr-2">
      { videoId.length !== 0 
        &&
        (<div>
          <h2
          className=" text-lg font-semibold leading-6 text-[#026767] text-base mb-2"
          >My best project</h2>
          <div className="shadow-md ">
            <YouTube videoId={videoId} opts={opts} 
              className="shadow-md"
            />
          </div>
        </div> )
      }
    </div>
  )
}

export default Video;
