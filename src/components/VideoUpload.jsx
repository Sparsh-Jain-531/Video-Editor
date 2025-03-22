import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Rnd } from "react-rnd";
import { Slider } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";

const VideoUpload = ({ onVideoUpload }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [crop, setCrop] = useState({
    width: 800,
    height: 430,
    x: 0,
    y: 0,
  });
  const [duration, setDuration] = useState(0);
  const [timeRange, setTimeRange] = useState([0, duration]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSections, setSelectedSections] = useState([]);
  const playerRef = useRef(null);

  const VIDEO_WIDTH = 800;
  const VIDEO_HEIGHT = 430;
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoFile(videoURL);
      if (onVideoUpload) {
        onVideoUpload(file);
      }
    }
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const setRatio = (widthRatio, heightRatio) => {
    const newWidth = Math.min(VIDEO_WIDTH, (VIDEO_HEIGHT * widthRatio) / heightRatio);
    const newHeight = Math.min(VIDEO_HEIGHT, (VIDEO_WIDTH * heightRatio) / widthRatio);

    setCrop({
      width: Math.floor(newWidth),
      height: Math.floor(newHeight),
      x: Math.floor((VIDEO_WIDTH - newWidth) / 2),
      y: Math.floor((VIDEO_HEIGHT - newHeight) / 2),
    });
  };

  const addTimeSection = () => {
    setSelectedSections([
      ...selectedSections,
      { start: timeRange[0], end: timeRange[1] },
    ]);
  };

  return (
    <div>
      {!videoFile && (
        <div className="flex flex-col justify-center items-center h-72">
          <div className="text-3xl font-bold">Upload Video</div>
          <div className="text-lg font-semibold">Easily crop video files online</div>
          <input type="file" accept="video/*" onChange={handleFileChange} id="videoInput" hidden />
          <button
            className="mt-4 bg-blue-500 py-2 px-4 text-white rounded-sm"
            onClick={() => document.getElementById("videoInput").click()}
          >
            Upload Video
          </button>
        </div>
      )}

      {videoFile && (
        <div className="flex flex-col gap-10 justify-center items-center py-10 bg-blue-900 relative">
          {/* Video Player with 16:9 aspect ratio */}
          <div className="relative" style={{ width: VIDEO_WIDTH, height: VIDEO_HEIGHT }}>
            <ReactPlayer
              ref={playerRef}
              url={videoFile}
              width="100%"
              height="100%"
              playing={isPlaying}
              onDuration={(d) => setDuration(d)}
              loop={true}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"></div>

            {/* Resizable Crop Area */}
            <Rnd
              size={{ width: crop.width, height: crop.height }}
              position={{ x: crop.x, y: crop.y }}
              enableResizing={false} // Disable resizing
              bounds="parent" // Keep movement inside the video
              onDrag={(e, d) => {
                setCrop((prev) => ({ ...prev, x: d.x, y: d.y }));
              }}
              className="absolute border backdrop-brightness-200 border-white"
            >
              <div
                className="absolute w-full h-full"
                style={{
                  boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
                  clipPath: `inset(0px round 5px)`,
                }}
              ></div>
            </Rnd>
          </div>

          {/* Video Controls & Cropping Options */}
          <div className="flex items-center w-[55%] mt-4">
            <button onClick={togglePlayPause} className="mr-4 p-2 bg-gray-700 text-white rounded-full">
              {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
            </button>
            <button onClick={() => setRatio(16, 9)} className="mx-2 p-2 bg-gray-700 text-white rounded-sm">
              16:9
            </button>
            <button onClick={() => setRatio(9, 16)} className="mx-2 p-2 bg-gray-700 text-white rounded-sm">
              9:16
            </button>
            <span className="text-white mx-4">
              {crop.width}px x {crop.height}px
            </span>
            <Slider
              value={timeRange}
              onChange={(e, newValue) => setTimeRange(newValue)}
              min={0}
              max={Math.floor(duration)}
              valueLabelDisplay="auto"
              className="flex-1"
            />
            <button onClick={addTimeSection} className="ml-4 p-2 bg-green-500 text-white rounded-sm">
              Add Section
            </button>
            <div className="mx-4 flex justify-center items-center text-white">
              <span className="p-1 rounded">
                X: {crop.x}px, Y: {crop.y}px
              </span>
            </div>
          </div>

          {/* Selected Time Sections */}
          <div>
            {selectedSections.length > 0 && <div className="text-white text-lg font-semibold">Selected Timelines - </div>}
            {selectedSections.map((section, index) => (
              <div key={index} className="p-1 text-white">
                <span className="my-1 pl-4">{`Start: ${section.start}s, End: ${Math.floor(section.end)}s`}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
