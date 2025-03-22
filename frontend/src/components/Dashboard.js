import React, { useEffect, useState } from "react";
import AddSale from "./AddSale";
import Charts from "./Charts";
import { fetchSales } from "../services/api"; // Import API call

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const getSalesData = async () => {
      const data = await fetchSales();
      setSalesData(data);
    };

    getSalesData();
  }, []);

  return (
    <div>
      <h1>Real-Time Sales Dashboard</h1>
      <AddSale />
      <Charts data={salesData} /> {/* Pass data to Charts */}
    </div>
  );
};

export default Dashboard;
