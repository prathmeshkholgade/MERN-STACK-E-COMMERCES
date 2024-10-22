import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCart } from "../../app/features/cart/cartSlice";
import ProductCart from "../../components/ProductCart";
import CheckOut from "../../components/CheckOut";

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
  const subTotal =
    cartsProduct &&
    cartsProduct.reduce((total, product) => {
      // console.log(total);
      // console.log(product.product);
      return total + product.product.price * product.quantity;
    }, 0);
  const total =
    cartsProduct &&
    cartsProduct.reduce((total, product) => {
      // console.log(total);
      // console.log(product.product);
      return total + product.product.sellingPrice * product.quantity;
    }, 0);
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
        <div className="flex justify-center  flex-grow">
          <CheckOut subTotal={subTotal}  total={total}/>
        </div>
      </div>
    </div>
  ) : (
    "No product"
  );
}
