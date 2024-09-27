import React from "react";
import ProductCard from "../components/ProductCard";
import ProductContainer from "./products/ProductContainer";

export default function Body() {
  return (
    <div>
      <div>
        <h2>All Products</h2>
      </div>
      <ProductContainer />
    </div>
  );
}
