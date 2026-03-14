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

  return (
    <div className="p-10 h-screen w-full flex flex-col items-center justify-center bg-amber-100">
      <h1 className="text-4xl font-bold mb-4">Employee Details</h1>

      <p className="mb-4 text-2xl border p-2 rounded-xl">Employee ID: {id}</p>

      <div className="border p-3 w-fit">
        <video
          ref={videoRef}
          autoPlay
          className="w-100 h-100 object-cover border"
        />
      </div>

      <button  onClick={startCamera}className="mt-4 px-4 py-2 rounded-2xl font-semibold bg-blue-400 text-white hover:scale-95">
        Start Camera
      </button>
    </div>
  );
}
