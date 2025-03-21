import React from 'react'
import Navbar from './components/Navbar'
import VideoUpload from './components/VideoUpload'
import VideoInfo from './components/VideoInfo'

const App = () => {
  return (
    <>
      <Navbar/>
      <VideoUpload/>
      <VideoInfo/>
    </>
  )
}

export default App


// import React, { useState, useRef } from "react";
// import ReactPlayer from "react-player";
// import { Rnd } from "react-rnd";
// import { Slider } from "@mui/material";

// const App = () => {
//   const videoUrl = "your-video-url.mp4";
//   const playerRef = useRef(null);

//   const [crop, setCrop] = useState({ width: 300, height: 200, x: 50, y: 50 });
//   const [timeRange, setTimeRange] = useState([0, 10]);
//   const [duration, setDuration] = useState(0);

//   return (
//     <div className="relative w-full h-screen flex flex-col items-center">
//       {/* Video Player */}
//       <div className="relative w-[800px] h-[450px] border">
//         <ReactPlayer
//           ref={playerRef}
//           url={videoUrl}
//           width="100%"
//           height="100%"
//           controls
//           onDuration={(d) => setDuration(d)}
//         />
//         {/* Cropping Area */}
//         <Rnd
//           size={{ width: crop.width, height: crop.height }}
//           position={{ x: crop.x, y: crop.y }}
//           onDragStop={(e, d) => setCrop({ ...crop, x: d.x, y: d.y })}
//           onResizeStop={(e, direction, ref, delta, position) =>
//             setCrop({
//               width: parseInt(ref.style.width),
//               height: parseInt(ref.style.height),
//               x: position.x,
//               y: position.y,
//             })
//           }
//           bounds="parent"
//           className="border border-white absolute"
//         />
//       </div>

//       {/* Timeline Slider */}
//       <div className="w-[800px] mt-4">
//         <Slider
//           value={timeRange}
//           onChange={(e, newValue) => setTimeRange(newValue)}
//           min={0}
//           max={duration}
//           valueLabelDisplay="auto"
//         />
//       </div>
//     </div>
//   );
// };

// export default App;