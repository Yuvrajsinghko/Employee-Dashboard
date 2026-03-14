import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Result() {
  const location = useLocation();
  const { finalImage } = location.state || {};
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityData = await fetch(
          "https://backend.jotish.in/backend_dev/gettabledata.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: "test",
              password: "123456",
            }),
          },
        );

        const data = await cityData.json();
        const rows = data.TABLE_DATA.data;

        const cityMap = {};

        rows.forEach((row) => {
          const city = row[2];

          const salary = parseInt(row[5].replace("$", "").replace(",", ""));

          if (!cityMap[city]) {
            cityMap[city] = 0;
          }

          cityMap[city] += salary;
        });

        const result = Object.keys(cityMap).map((city) => ({
          city: city,
          salary: cityMap[city],
        }));

        setCityData(result);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-12 w-full h-screen bg-amber-100 flex justify-around">
      <div className="flex flex-col justify-start items-center">
        <h1 className="text-3xl font-medium mb-6">Audit Result</h1>

        {finalImage && (
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-semibold text-center">
              Final Audit Image
            </h2>
            <img
              src={finalImage}
              alt="FinalAuditImage"
              className="w-96  rounded-3xl overflow-hidden border"
            />
          </div>
        )}
      </div>
      <div>
        <h2 className="text-3xl font-medium mb-4">Salary Distribution</h2>
        <svg width="600" height="320" className="border bg-white p-6">
          {cityData.map((item, index) => {
            const maxSalary = Math.max(...cityData.map((c) => c.salary));

            const barHeight = (item.salary / maxSalary) * 200;

            const x = index * 100 + 60;
            const y = 250 - barHeight;

            const colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

            return (
              <g key={index}>
                <rect
                  x={x}
                  y={y}
                  width="50"
                  height={barHeight}
                  fill={colors[index % colors.length]}
                />

                <text x={x + 25} y={270} textAnchor="middle" fontSize="14">
                  {item.city}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
