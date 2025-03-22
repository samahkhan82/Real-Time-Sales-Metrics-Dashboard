import React, { useState } from "react";
import { addSale } from "../services/api";

const AddSale = () => {
  const [amount, setAmount] = useState("");
  const [product, setProduct] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSale(parseFloat(amount), product);
    setAmount("");
    setProduct("");
  };

  return (
    <div>
      <h2>Add New Sale</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Sale Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Product Name"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
        />
        <button type="submit">Add Sale</button>
      </form>
    </div>
  );
};

export default AddSale;
