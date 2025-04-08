// import React, { useState, useRef } from "react";
// const Video = ({src}) => {
// const videoRef = useRef(null); // Reference to the video element
// const [isPlaying, setIsPlaying] = useState(false);

// const handlePlayPause = () => {
//   if (isPlaying) {
//     videoRef.current.pause();
//   } else {
//     videoRef.current.play();
//   }
//   setIsPlaying(!isPlaying); 
// };

// return (
//   <div className="relative px-4 md:px-20 my-10 md:my-20">
//     <video
//       ref={videoRef}
//       className="w-full  rounded-lg"
//       src={src}
//       controls={false} 
//     ></video>

//     <button
//       onClick={handlePlayPause}
//       className="absolute inset-1 m-auto w-20 h-20  text-white border-4 border-white flex items-center justify-center rounded-full "
//     >
//       {isPlaying ? (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-20 h-20"
//           viewBox="0 0 24 24"
//           fill="currentColor"
//         >
//           <path d="M6 19h4V5H6v14zM14 5v14h4V5h-4z" />
//         </svg>
//       ) : (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-20 h-20"
//           viewBox="0 0 24 24"
//           fill="currentColor"
//         >
//           <path d="M8 5v14l11-7L8 5z" />
//         </svg>
//       )}
//     </button>
//   </div>
// );
// }

// export default Video

import React, { useState, useRef, useEffect } from "react";
import { Base_url } from "../ApiController/ApiController";

const Video = () => {
  const videoRef = useRef(null); // Reference to the video element
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(Base_url+"getVideo");
        const data = await response.json();
        if (data.status && data.data.length > 0) {
          setVideoSrc(data.data[0].video);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };
    fetchVideo();
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative px-4 md:px-20 my-10 md:my-20">
      {videoSrc ? (
        <>
          <video
            ref={videoRef}
            className="w-full rounded-lg"
            src={videoSrc}
            controls={false}
          ></video>
          <button
            onClick={handlePlayPause}
            className="absolute inset-0 m-auto w-20 h-20 text-white border-4 border-white flex items-center justify-center rounded-full"
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 h-20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 19h4V5H6v14zM14 5v14h4V5h-4z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 h-20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            )}
          </button>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Video;
