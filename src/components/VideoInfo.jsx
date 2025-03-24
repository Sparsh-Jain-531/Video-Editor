import React from "react";

const VideoInfo = () => {
  return (
    <div className="flex justify-center items-center bg-slate-100 py-10">
      <div className="w-[50%]">
        <div className="font-bold text-2xl">Online Video Cropper</div>
        <p className="mt-4">
        Video Crop & Trim is a simple yet powerful online tool that allows users to effortlessly edit their videos with precision. With this platform, you can easily upload any video file and customize it to fit your needs. It provides an intuitive cropping feature that lets you adjust the visible portion of the video by resizing and repositioning the crop area. You can also choose from predefined aspect ratios like 16:9, 9:16, or keep the original dimensions to ensure your video fits perfectly on different platforms. Additionally, the tool allows you to trim your video by selecting a specific start and end time using an interactive timeline. You can save multiple cropped and trimmed sections for added flexibility. With real-time preview functionality, you can instantly see the changes before finalizing your edits. No complicated software is required—just upload, edit, and create your perfect video in minutes.
        </p>
      </div>
    </div>
  );
};

export default VideoInfo;
