import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Rnd } from "react-rnd";
import { Slider } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";

const VideoUpload = ({ onVideoUpload }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoName, setVideoName] = useState("");
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
      setVideoName(file.name);
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
      { start: timeRange[0], end: timeRange[1], X: crop.x, Y: crop.y },
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
        <div className="flex flex-col gap-4 justify-center items-center py-10 bg-blue-900 relative">
          <div className="text-white text-sm">
            {videoName}
          </div>
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
          <div className="flex flex-col lg:flex-row items-center justify-center mt-4">
            <div className="flex justify-center items-center gap-4 lg:gap-2">
            <button onClick={togglePlayPause} className=" p-2 bg-blue-950 text-white rounded-full">
              {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
            </button>
            <button onClick={() => setRatio(VIDEO_WIDTH, VIDEO_HEIGHT)} className="mx-2 py-2 px-4 bg-blue-950 text-white rounded-lg">
              Original
            </button>
            <button onClick={() => setRatio(16, 9)} className="py-2 px-4 bg-blue-950 text-white rounded-lg">
              16:9
            </button>
            <button onClick={() => setRatio(9, 16)} className="py-2 px-4 bg-blue-950 text-white rounded-lg">
              9:16
            </button>
            <span className="text-white min-w-28">
              {crop.width}px x {crop.height}px
            </span>
            </div>
            <div className="flex justify-center items-center mx-4 min-w-72">
            <Slider
              value={timeRange}
              onChange={(e, newValue) => setTimeRange(newValue)}
              min={0}
              max={Math.floor(duration)}
              valueLabelDisplay="auto"
              className="flex-1 w-full"
            />
            </div>
            <div className="flex justify-center items-center gap-4 lg:gap-2">
            <button onClick={addTimeSection} className="p-2 bg-green-600 hover:bg-green-700 transition-all text-white rounded-lg min-w-28">
              Add Section
            </button>
            <div className="flex justify-center items-center text-white min-w-28">
              <span className="p-1 rounded">
                X: {crop.x}px, Y: {crop.y}px
              </span>
            </div>
            </div>
          </div>

          {/* Selected Time Sections */}
          <div>
            {selectedSections.length > 0 && <div className="text-white text-lg font-semibold text-center mb-2">Selected Timelines - </div>}
            {selectedSections.map((section, index) => (
              <div key={index} className="text-white">
                <div className="my-1 flex justify-start items-center gap-5">
                  <div className="w-56"><span className="font-semibold font-serif">Time: </span>{`Start: ${section.start}s, End: ${section.end}s`}</div>
                  <div><span className="font-semibold font-serif">Dimensions: </span>{`X: ${section.X}px, Y: ${section.Y}px`}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
