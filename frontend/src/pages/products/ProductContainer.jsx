import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { loadProducts } from "../../app/features/products/productSlice";

export default function ProductContainer() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.Product.products);
  const loadData = async () => {
    try {
      const res = await dispatch(loadProducts()).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadData();
  }, [dispatch]);

  return products ? (
    <div className="sm:p-6 lg:mx-6  flex flex-wrap gap-10 justify-center md:justify-start ">
      {products.map((product, idx) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  ) : (
    "<h1>loading</h1>"
  );
}
