import React from "react";

import ProductContainer from "./products/ProductContainer";
import { useSelector } from "react-redux";

export default function Body() {
  return (
    <div className="mt-4">
      <ProductContainer />
    </div>
  );
}
