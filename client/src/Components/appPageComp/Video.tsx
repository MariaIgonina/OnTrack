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
    <h2
    className="mt-3 text-lg font-semibold leading-6 text-[#026767] sm:text-3xl"
    >Video presentation of my best project</h2>
    <YouTube videoId={videoId} opts={opts} />
    {/* <YouTubePlayer /> */}
  </>
  )
}

export default Video;
