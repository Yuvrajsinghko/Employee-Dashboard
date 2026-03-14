import { useParams } from "react-router-dom";
import { useRef, useState } from "react";

export default function Details() {
  const { id } = useParams();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [photo, setPhoto] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.log("Camera access error", error);
    }
  };

  const capturePhoto = () => {
    const capturedUserVideo = videoRef.current;
    const canvas = canvasRef.current;

    if (!capturedUserVideo || !canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = capturedUserVideo.videoWidth;
    canvas.height = capturedUserVideo.videoHeight;

    ctx.drawImage(capturedUserVideo, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");

    setPhoto(imageData);
  };

  return (
    <div className="main-div flex w-full h-screen bg-amber-100 justify-center items-center">
      <div className="video-div flex flex-col items-center p-10  border-r-2">
        <h1 className="text-3xl uppercase font-semibold mb-4">
          Employee Details
        </h1>

        <p className="mb-4 font-medium text-2xl">Employee ID: {id}</p>

        <div className="border p-2 w-fit">
          <video
            ref={videoRef}
            autoPlay
            className="w-100 h-100 border object-cover"
          />
        </div>

        <div className="flex gap-5">
          <button
            onClick={startCamera}
            className="mt-4 p-3 text-xl rounded-2xl bg-blue-400 text-white"
          >
            Start Camera
          </button>

          <button
            onClick={capturePhoto}
            className="mt-4 p-3 rounded-2xl text-xl bg-green-400 text-white"
          >
            Capture Photo
          </button>
        </div>
      </div>
      <div className="ml-11 ">
        <canvas ref={canvasRef} className="hidden"></canvas>

        {photo && (
          <div className="mt-6 flex flex-col items-center justify-center gap-5 ">
            <h2 className="mb-2 font-semibold text-3xl uppercase">Captured Photo</h2>
            <img src={photo} alt="Captured" className="w-96 border" />
          </div>
        )}
      </div>
    </div>
  );
}
