import { useLocation } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const { finalImage } = location.state || {};

  return (
    <div className="p-12 w-full h-screen bg-amber-100 flex justify-around">
      <div className="flex flex-col justify-start items-center">
        <h1 className="text-3xl font-medium mb-6">Audit Result</h1>

        {finalImage && (
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-semibold text-center">Final Audit Image</h2>
            <img src={finalImage} alt="FinalAuditImage" className="w-96  rounded-3xl overflow-hidden border" />
          </div>
        )}
      </div>
      <div>
        <h2 className="text-3xl font-medium mb-4">Salary Distribution</h2>
      </div>
    </div>
  );
}
