import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../app/features/products/productSlice";

export default function ProductContainer() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Product.products);
  const loadData = async () => {
    const res = dispatch(loadProducts());
    console.log(res);
  };
  useEffect(() => {
    loadData();
  }, [dispatch]);
  return (
    <div className="sm:p-6 lg:mx-6  flex flex-wrap gap-10 justify-center md:justify-start ">
      {products.map((product, idx) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
}
