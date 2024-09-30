"use client";

import {CldUploadWidget} from "next-cloudinary";

function UpLoadWiget() {
  return (
    <>
      <CldUploadWidget
        uploadPreset="aueogygr"
        onSuccess={(results) => {
          console.log("data:", results.info?.url);
        }}
      >
        {({open}) => {
          return (
            <div className="w-full z-0">
              <button
                className="p-5 border bg-white/30 backdrop-blur-md border-white/50 w-full rounded-lg z-10 shadow-lg"
                onClick={() => open()}
              >
                Upload an Image
              </button>
            </div>
          );
        }}
      </CldUploadWidget>
    </>
  );
}

export default UpLoadWiget;
