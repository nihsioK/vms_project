import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DataTable.css";

const DataTable = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (props.token) {
        try {
          const response = await fetch(props.link, {
            headers: {
              Authorization: `Bearer ${props.token}`,
              "Content-Type": "application/json",
            },
          });
          const result = await response.json();
          setData(result);
        } catch (error) {
          console.error("Error fetching data:", error);
          console.error("Error fetching data:", error);
          console.error("Error status:", response.status);
          console.error("Error response:", await response.text());
        }
      }
    };
    fetchData();
  }, [props.token]);

  return (
    <div className="elementContainer">
      <h1>{props.title}</h1>
      {data && (
        <div className="innerContainer">
          <Table hover className="custom-colored-table">
            <thead>
              <tr>
                {Object.keys(data[0]).map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((record, recordIndex) => (
                <tr key={recordIndex}>
                  {Object.values(record).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default DataTable;
