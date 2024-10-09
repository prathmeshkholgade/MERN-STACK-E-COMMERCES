import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCart } from "../../app/features/cart/cartSlice";
import ProductCart from "../../components/ProductCart";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartsProduct = useSelector((state) => state.Cart?.Cart?.items);
  const loadData = async () => {
    try {
      const response = await dispatch(fetchUserCart()).unwrap();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadData();
  }, [dispatch]);
  return cartsProduct ? (
    <div className=" w-[90%] mx-auto mt-4">
      <h2>Cart</h2>
      <div className="flex flex-col md:flex-row">
        <div className="">
          <div className="sm:flex  hidden">
            <div className="lg:w-[420px] sm:w-[420px] w-[240px]">items</div>
            <div className="lg:w-[120px] sm:w-[70px] hidden sm:block">Qty</div>
            <div className="lg:w-[120px] sm:w-[70px] flex-grow text-center">
              SubTotal
            </div>
          </div>

          <div className="  ">
            {cartsProduct.map((product) => (
              <ProductCart product={product} />
            ))}
          </div>
        </div>
        <div className="bg-red-400 flex-grow">
          <h3>CheckOut</h3>
        </div>
      </div>
    </div>
  ) : (
    "No product"
  );
}
