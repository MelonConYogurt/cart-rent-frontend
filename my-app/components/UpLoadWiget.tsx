"use client";

import {CldUploadWidget} from "next-cloudinary";
import {useState} from "react";

function UpLoadWiget() {
  const [url, setUrl] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <>
      <CldUploadWidget
        uploadPreset="aueogygr"
        options={{multiple: false, maxFiles: 1}}
        onSuccess={(results) => {
          setUrl(results.info.url);
          setIsDisabled(true);
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
