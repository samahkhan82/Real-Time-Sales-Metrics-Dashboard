import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Sales Dashboard</h1>
      <Link to="/sales">View Sales Data</Link>
    </div>
  );
};

export default Home;
