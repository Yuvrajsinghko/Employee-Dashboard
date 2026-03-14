import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Details() {
  const { id } = useParams();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const userSignatureRef = useRef(null);
  const [signature, setSignature] = useState(false);
  const [finalImage, setFinalImage] = useState(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      streamRef.current = stream;
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
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };
  console.log(finalImage);
  
  const startDrawing = (e) => {
    const canvas = userSignatureRef.current;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    setSignature(true);
  };

  const draw = (e) => {
    if (!signature) return;

    const canvas = userSignatureRef.current;
    const ctx = canvas.getContext("2d");

    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setSignature(false);
  };
  const mergeImages = () => {
    const signatureCanvas = userSignatureRef.current;

    const img = new Image();
    img.src = photo;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);
      const sigWidth = signatureCanvas.width;
      const sigHeight = signatureCanvas.height;

      const x = canvas.width - sigWidth - 20;
      const y = canvas.height - sigHeight - 20;

      ctx.drawImage(signatureCanvas, x, y);

      const merged = canvas.toDataURL("image/png");

      setFinalImage(merged);
      navigate("/results", {
        state: { finalImage: merged },
      });
    };
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
          <button
            onClick={mergeImages}
            className="mt-4 p-3 rounded-2xl text-xl bg-purple-400 text-white"
          >
            Merge Photo & Signature
          </button>
        </div>
      </div>
      <div className="ml-11 border-r-2 p-20">
        <canvas ref={canvasRef} className="hidden"></canvas>

        <h2 className="mb-2 text-2xl font-semibold text-center">Sign Below</h2>

        <div className="relative w-96">
          <img src={photo} alt="Captured" className="w-96 border" />

          <canvas
            ref={userSignatureRef}
            width={384}
            height={288}
            className="absolute top-0 left-0"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
      </div>
    </div>
  );
}
