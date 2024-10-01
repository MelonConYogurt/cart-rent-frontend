"use client";

import {CldUploadWidget} from "next-cloudinary";

interface CloudinaryUploadWidgetInfo {
  url: string;
}

interface propsCallback {
  onUploadComplete: (url: string) => void; //callback function
  isDisabledProp: boolean;
}

function UpLoadWiget({onUploadComplete, isDisabledProp}: propsCallback) {
  return (
    <>
      <CldUploadWidget
        uploadPreset="aueogygr"
        options={{multiple: false, maxFiles: 1}}
        onSuccess={(results) => {
          const info = results.info as CloudinaryUploadWidgetInfo;
          if (info && typeof info !== "string" && info.url) {
            onUploadComplete(info.url);
          } else {
            console.error("Upload failed or URL not available");
          }
        }}
      >
        {({open}) => {
          return (
            <div className="w-full ">
              <button
                type="button"
                className="p-5 border-2 border-dashed border-gray-300 w-full rounded-lg hover:border-gray-400 transition-colors"
                onClick={() => open()}
                disabled={isDisabledProp}
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
