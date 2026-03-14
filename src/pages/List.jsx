import { useEffect, useRef, useState } from "react";

export default function List() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);

  const rowHeight = 50;
  const containerHeight = 750;
  const extraRow = 5;
  const listRef = useRef(null);
  useEffect(() => {
    const list = listRef.current;

    const handleScroll = () => {
      setScrollTop(list.scrollTop);
    };

    if (list) {
      list.addEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    const getEmployeesInfo = async () => {
      try {
        const result = await fetch(
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

        const userInfo = await result.json();

        setEmployees(userInfo.TABLE_DATA.data);
      } catch (error) {
        console.log("Error fetching employees data", error);
      } finally {
        setLoading(false);
      }
    };

    getEmployeesInfo();
  }, []);

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  const visibleCount = Math.ceil(containerHeight / rowHeight);
  const startIndex = Math.floor(scrollTop / rowHeight);
  const endIndex = startIndex + visibleCount + extraRow;

  const visibleRows = employees.slice(startIndex, endIndex);

  const totalHeight = employees.length * rowHeight;

  if (loading) {
    return <div className="p-12 font-medium">Loading employees...</div>;
  }

  return (
    <div className="p-12 text-center h-screen w-full bg-amber-100 ">
      <h1 className="text-2xl mb-4 font-bold">Employee List</h1>

      <div
        ref={listRef}
        style={{ height: containerHeight }}
        className="border  overflow-y-auto font-semibold"
        onScroll={handleScroll}
      >
        <div style={{ height: totalHeight, position: "relative" }}>
          {visibleRows.map((usr, index) => {
            const actualIndex = startIndex + index;
            const top = actualIndex * rowHeight;

            return (
              <div
                key={actualIndex}
                className="flex border-b justify-between px-4"
                style={{
                  position: "absolute",
                  top: top,
                  height: rowHeight,
                  width: "100%",
                }}
              >
                <h3>{usr[0]}</h3>
                <h3>{usr[1]}</h3>
                <h3>{usr[2]}</h3>
                <h3>{usr[5]}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
