"use client";

import {CldUploadWidget} from "next-cloudinary";
import {useState} from "react";

interface CloudinaryUploadWidgetInfo {
  url: string;
}

interface propsCallback {
  onUploadComplete: (url: string) => void; //callback function
}

function UpLoadWiget({onUploadComplete}: propsCallback) {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  return (
    <>
      <CldUploadWidget
        uploadPreset="aueogygr"
        options={{multiple: false, maxFiles: 1}}
        onSuccess={(results) => {
          const info = results.info as CloudinaryUploadWidgetInfo;
          if (info && typeof info !== "string" && info.url) {
            onUploadComplete(info.url);
            setIsDisabled(true);
          } else {
            console.error("Upload failed or URL not available");
          }
        }}
      >
        {({open}) => {
          return (
            <div className="w-full z-0">
              <button
                type="button"
                disabled={isDisabled}
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
